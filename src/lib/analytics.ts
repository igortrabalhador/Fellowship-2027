import content from '@/data/landing-content.json';

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    umami?: { track: (eventName: string, data?: Record<string, string>) => void };
  }
}

/**
 * Cookie-less enrollment click tracking (event: inscricao_click).
 * Stores no cookies, touches no localStorage, and dispatches cleanly to
 * privacy-first analytics (Plausible, Umami, optional sendBeacon endpoint,
 * or a browser CustomEvent for verification).
 */
export function trackEnrollClick(source: string): void {
  const eventName = content.config.analytics.eventName || 'inscricao_click';
  const payload = {
    source,
    destination: content.config.enrollUrl,
  };

  try {
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: payload });
    }

    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, payload);
    }

    const endpoint = content.config.analytics.beaconEndpoint;
    if (endpoint && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([JSON.stringify({ event: eventName, ...payload })], {
        type: 'application/json',
      });
      navigator.sendBeacon(endpoint, blob);
    }

    window.dispatchEvent(
      new CustomEvent('fellowham:analytics', {
        detail: { event: eventName, ...payload },
      }),
    );
  } catch {
    // Analytics must never block external navigation.
  }
}
