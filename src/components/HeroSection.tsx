import content from '@/data/landing-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { ArrowRightIcon, DocumentIcon, PlayIcon } from './Icons';

interface HeroSectionProps {
  onOpenEdital: () => void;
}

export function HeroSection({ onOpenEdital }: HeroSectionProps) {
  const { hero, config, footer } = content;
  const showVideoAction = Boolean(config.showVideo && config.videoUrl);

  return (
    <section
      id="topo"
      className="surface-grain surface-toplight relative overflow-hidden min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-24 pb-10 sm:pb-12"
    >
      {/* Hero surgical room duotone photograph entering seamlessly with feathered edge mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <img
          src="/assets/imagens/sala-cirurgica-duotone.webp"
          alt=""
          width={1300}
          height={930}
          fetchPriority="high"
          decoding="async"
          className="w-full h-[54%] sm:h-[68%] lg:w-[68%] lg:h-full lg:ml-auto object-cover object-top lg:object-right-top opacity-65 sm:opacity-75"
          style={{
            maskImage:
              'radial-gradient(92% 88% at 78% 22%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0) 88%)',
            WebkitMaskImage:
              'radial-gradient(92% 88% at 78% 22%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0) 88%)',
          }}
        />
      </div>

      <div className="editorial-wrap flex-1 flex flex-col justify-center pt-6 sm:pt-10 lg:pt-8 pb-6">
        <div className="max-w-[920px]">
          <p className="type-eyebrow-xl hero-enter mb-4 sm:mb-5">{hero.eyebrow}</p>

          <h1 className="type-display type-display-xl text-white hero-enter hero-enter-d1">
            {hero.title}
          </h1>

          <p className="type-lead hero-enter hero-enter-d2 mt-4 sm:mt-5 max-w-[44ch]">
            {hero.subtitle}
          </p>

          {/* Signature 2 VAGAS luminous panel */}
          <div className="vagas-panel hero-enter hero-enter-d3 mt-6 sm:mt-7 max-w-[720px]">
            <p className="vagas-panel__count">{hero.vacanciesLabel}</p>
            <div className="vagas-panel__divider hidden sm:block" aria-hidden="true" />
            <div className="flex flex-col gap-1 min-w-0">
              <strong
                className="text-[17px] sm:text-[21px] font-semibold leading-tight text-[#0B1C36]"
                style={{ fontVariationSettings: "'wdth' 108, 'wght' 600" }}
              >
                {hero.chips[0]}
              </strong>
              <span className="text-[14px] sm:text-[15px] font-medium leading-snug text-[#0F2340]">
                {hero.chips[1]} · {hero.chips[2]}
              </span>
            </div>
          </div>

          {/* Primary & secondary actions */}
          <div className="hero-enter hero-enter-d4 mt-6 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href={config.enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEnrollClick('hero_primary')}
              className="btn-cta w-full sm:w-auto"
            >
              <span>{hero.primaryCta}</span>
              <span className="btn-arrow">
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenEdital}
              className="btn-pill w-full sm:w-auto"
            >
              <DocumentIcon className="w-4 h-4 text-[#6CB6D6]" />
              <span>{hero.editalCta}</span>
            </button>

            {showVideoAction && (
              <a href="#video-institucional" className="btn-pill w-full sm:w-auto">
                <PlayIcon className="w-4 h-4 text-[#6CB6D6]" />
                <span>{hero.videoCta}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Institutional logo strip anchored on the deepest navy edge of the hero */}
      <div className="editorial-wrap pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-[#6CB6D6]/45">
          <div className="flex flex-col gap-3">
            <p className="type-label">{footer.realizacaoLabel}</p>
            <div className="flex items-center">
              <img
                src="/assets/logos/ham-branco.png"
                alt="Hospital Aristides Maltez · Liga Bahiana Contra o Câncer"
                width={597}
                height={229}
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="type-label">{footer.patrocinioLabel}</p>
            <div className="flex flex-wrap items-center gap-6 sm:gap-7 opacity-90">
              <img
                src="/assets/logos/novva-branco.png"
                alt="NOVVA Marketing de Estratégia"
                width={646}
                height={232}
                className="h-8 sm:h-9 w-auto object-contain"
              />
              {config.showMedCall && (
                <img
                  src="/assets/logos/medcall-branco.png"
                  alt="MedCall"
                  width={924}
                  height={289}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
