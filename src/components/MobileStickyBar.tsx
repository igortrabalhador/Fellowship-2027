import content from '@/data/landing-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { ArrowRightIcon, DocumentIcon } from './Icons';

interface MobileStickyBarProps {
  onOpenEdital: () => void;
}

/**
 * Fixed mobile bottom action bar (< 768px).
 * Keeps "Edital e inscrição" reachable by one thumb tap at all times,
 * respects safe-area insets, and never covers footer content.
 */
export function MobileStickyBar({ onOpenEdital }: MobileStickyBarProps) {
  const { config, hero, navigation } = content;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden chrome-glass-bottom no-print"
      style={{
        paddingTop: '10px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center gap-2.5 max-w-[540px] mx-auto">
        <button
          type="button"
          onClick={onOpenEdital}
          aria-label="Abrir edital completo"
          className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-4 rounded-full border border-[#6CB6D6]/80 bg-[#0F2340]/70 text-white text-[14px] font-medium shrink-0 active:scale-[0.97] transition-transform duration-150"
        >
          <DocumentIcon className="w-4 h-4 text-[#6CB6D6]" />
          <span>{navigation.editalLabel}</span>
        </button>

        <a
          href={config.enrollUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEnrollClick('mobile_sticky_bar')}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full bg-[#5CAACA] text-[#0B1C36] text-[15px] font-semibold no-underline active:scale-[0.97] transition-transform duration-150"
          style={{ fontVariationSettings: "'wdth' 110, 'wght' 600" }}
        >
          <span>{hero.primaryCta}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
