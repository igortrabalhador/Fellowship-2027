/**
 * Strict URL and embed sanitization utilities.
 * Prevents javascript:, data:, vbscript:, insecure http:, and untrusted iframe origins
 * when non-developers edit src/data/landing-content.json.
 */

const ALLOWED_EMBED_HOSTS = new Set([
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
  'www.youtube.com',
  'youtube.com',
  'youtu.be',
  'player.vimeo.com',
  'vimeo.com',
]);

const SAFE_DIRECT_VIDEO_PATTERN = /\.(mp4|webm|ogg)(\?.*)?$/i;

export function getSafeExternalUrl(rawUrl: string, fallback = 'https://www.lbcc.org.br'): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Reject malformed URLs
  }

  return fallback;
}

export function getSafeRelativeAssetPath(rawPath: string): string {
  const trimmed = rawPath.trim();
  if (!trimmed) return '#';
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return '#';
  if (trimmed.startsWith('//') || trimmed.includes('..') || trimmed.includes('\\')) return '#';
  return trimmed;
}

export function getSafeBeaconUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

export type SafeVideoSource =
  | { kind: 'video'; src: string }
  | { kind: 'iframe'; src: string }
  | null;

export function getSafeVideoSource(rawUrl: string): SafeVideoSource {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // Allow relative same-origin media files (e.g. assets/videos/institucional.mp4)
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    const safeRel = getSafeRelativeAssetPath(trimmed);
    if (safeRel !== '#' && SAFE_DIRECT_VIDEO_PATTERN.test(safeRel)) {
      return { kind: 'video', src: safeRel };
    }
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'https:') {
    return null;
  }

  if (SAFE_DIRECT_VIDEO_PATTERN.test(parsed.pathname)) {
    return { kind: 'video', src: parsed.toString() };
  }

  const host = parsed.hostname.toLowerCase();
  if (!ALLOWED_EMBED_HOSTS.has(host)) {
    return null;
  }

  // Upgrade YouTube watch/short links to privacy-enhanced no-cookie embed
  if (host === 'youtu.be') {
    const id = parsed.pathname.replace(/^\/+/, '').split('/')[0];
    if (/^[a-zA-Z0-9_-]{6,20}$/.test(id)) {
      return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}` };
    }
    return null;
  }

  if (host === 'www.youtube.com' || host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v') ?? '';
      if (/^[a-zA-Z0-9_-]{6,20}$/.test(id)) {
        return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}` };
      }
      return null;
    }
    if (parsed.pathname.startsWith('/embed/')) {
      const id = parsed.pathname.replace('/embed/', '').split('/')[0];
      if (/^[a-zA-Z0-9_-]{6,20}$/.test(id)) {
        return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}` };
      }
      return null;
    }
    return null;
  }

  if (host === 'www.youtube-nocookie.com' || host === 'youtube-nocookie.com') {
    if (parsed.pathname.startsWith('/embed/')) {
      return { kind: 'iframe', src: parsed.toString() };
    }
    return null;
  }

  if (host === 'vimeo.com') {
    const id = parsed.pathname.replace(/^\/+/, '').split('/')[0];
    if (/^\d{5,15}$/.test(id)) {
      return { kind: 'iframe', src: `https://player.vimeo.com/video/${id}?dnt=1` };
    }
    return null;
  }

  if (host === 'player.vimeo.com' && parsed.pathname.startsWith('/video/')) {
    return { kind: 'iframe', src: parsed.toString() };
  }

  return null;
}
