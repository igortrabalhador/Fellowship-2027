import content from '@/data/landing-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { ArrowRightIcon, DocumentIcon, PlayIcon } from './Icons';

interface HeroSectionProps {
  onOpenEdital: () => void;
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url.trim());
}

export function HeroSection({ onOpenEdital }: HeroSectionProps) {
  const { hero, config, footer } = content;
  const videoUrl = config.videoUrl.trim();
  const hasVideo = Boolean(videoUrl);

  return (
    <section
      id="topo"
      className="surface-grain surface-toplight relative overflow-hidden min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-24 pb-10 sm:pb-12"
    >
      {/* Hero surgical room duotone photograph (lower opacity on mobile for sharp text legibility) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <img
          src="assets/imagens/sala-cirurgica-duotone.webp"
          alt=""
          width={1300}
          height={930}
          fetchPriority="high"
          decoding="async"
          className="w-full h-[52%] sm:h-[66%] lg:w-[68%] lg:h-full lg:ml-auto object-cover object-top lg:object-right-top opacity-25 sm:opacity-50 lg:opacity-70"
          style={{
            maskImage:
              'radial-gradient(92% 88% at 78% 22%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0) 88%)',
            WebkitMaskImage:
              'radial-gradient(92% 88% at 78% 22%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0) 88%)',
          }}
        />
      </div>

      <div className="editorial-wrap flex-1 flex flex-col justify-center pt-5 sm:pt-8 lg:pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-center">
          {/* Left column: Headline, vacancies panel, and CTAs */}
          <div className="lg:col-span-7 min-w-0">
            <p className="type-eyebrow-xl hero-enter mb-4">{hero.eyebrow}</p>

            <h1 className="type-display type-display-xl text-white hero-enter hero-enter-d1">
              {hero.title}
            </h1>

            <p className="type-lead hero-enter hero-enter-d2 mt-4 sm:mt-5 max-w-[42ch]">
              {hero.subtitle}
            </p>

            {/* Signature 2 VAGAS luminous panel */}
            <div className="vagas-panel hero-enter hero-enter-d3 mt-6 max-w-[680px]">
              <p className="vagas-panel__count">{hero.vacanciesLabel}</p>
              <div className="vagas-panel__divider hidden sm:block" aria-hidden="true" />
              <div className="flex flex-col gap-1 min-w-0">
                <strong
                  className="text-[17px] sm:text-[20px] font-semibold leading-tight text-[#0B1C36]"
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
            <div className="hero-enter hero-enter-d4 mt-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5">
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
            </div>
          </div>

          {/* Right column: Dedicated Hero Video Slot (auto-switches to player once config.videoUrl is set) */}
          {/* TODO: Fill config.videoUrl in src/data/landing-content.json with the .mp4 or YouTube/Vimeo embed URL when ready */}
          <div className="lg:col-span-5 hero-enter hero-enter-d3">
            <figure className="m-0 rounded-[20px] overflow-hidden border border-[#6CB6D6]/35 bg-[#0A172D]/85 shadow-[0_24px_60px_rgba(4,12,26,0.52)]">
              <div className="relative aspect-video w-full bg-[#0A172D] overflow-hidden">
                {hasVideo ? (
                  isDirectVideoFile(videoUrl) ? (
                    <video
                      src={videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      poster="assets/imagens/sala-cirurgica-duotone.webp"
                      className="w-full h-full object-cover"
                    >
                      Seu navegador não suporta reprodução de vídeo.
                    </video>
                  ) : (
                    <iframe
                      src={videoUrl}
                      title={hero.videoSlot.title}
                      width={1280}
                      height={720}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  )
                ) : (
                  <>
                    <img
                      src="assets/imagens/sala-cirurgica-duotone.webp"
                      alt=""
                      width={1300}
                      height={930}
                      decoding="async"
                      className="w-full h-full object-cover object-center opacity-35"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(10,23,45,0.45) 0%, rgba(10,23,45,0.88) 100%)',
                      }}
                    />
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8CC4DE]">
                          {hero.videoSlot.eyebrow}
                        </span>
                        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border border-[#6CB6D6]/50 bg-[#0F2340]/80 text-[#E6E8EB]">
                          Em breve
                        </span>
                      </div>

                      <div className="flex flex-col items-center text-center my-auto py-2">
                        <span
                          aria-hidden="true"
                          className="w-14 h-14 rounded-full border border-[#6CB6D6]/75 bg-[#0F2340]/80 flex items-center justify-center text-[#6CB6D6] mb-3"
                        >
                          <PlayIcon className="w-5 h-5 translate-x-[1px]" />
                        </span>
                        <p
                          className="m-0 text-[16px] sm:text-[18px] font-medium text-white leading-snug max-w-[28ch]"
                          style={{ fontVariationSettings: "'wdth' 106, 'wght' 500" }}
                        >
                          {hero.videoSlot.title}
                        </p>
                      </div>

                      <p className="m-0 text-[12px] text-[#DEE1E5] text-center">
                        {hero.videoSlot.pendingNote}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* Institutional logo strip anchored on the deepest navy edge of the hero */}
      <div className="editorial-wrap pt-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-5 border-t border-[#6CB6D6]/45">
          <div className="flex flex-col gap-3">
            <p className="type-label">{footer.realizacaoLabel}</p>
            <div className="flex items-center">
              <img
                src="assets/logos/ham-branco.png"
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
                src="assets/logos/novva-branco.png"
                alt="NOVVA Marketing de Estratégia"
                width={646}
                height={232}
                className="h-8 sm:h-9 w-auto object-contain"
              />
              {config.showMedCall && (
                <img
                  src="assets/logos/medcall-branco.png"
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
