import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';
import content from '@/data/landing-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { getSafeExternalUrl } from '@/lib/security';
import { ArrowRightIcon, DocumentIcon } from './Icons';

interface ClosingFooterSectionProps {
  onOpenEdital: () => void;
}

export function ClosingFooterSection({ onOpenEdital }: ClosingFooterSectionProps) {
  const { closing, footer, hero, config } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Dealt Scroll Moment #2: robotic arms gently emerge through the mist horizon
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const armsOffset = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const armsTransform = useMotionTemplate`translate3d(0, ${armsOffset}px, 0)`;

  return (
    <section
      ref={sectionRef}
      id={closing.id}
      className="surface-grain surface-mist-top relative overflow-hidden pt-20 sm:pt-28 pb-14 sm:pb-16"
    >
      {/* Upper luminous mist band: navy ink only (contrast 6.27:1 to 13.06:1) */}
      <div className="editorial-wrap">
        <p className="type-eyebrow type-eyebrow-mist mb-4">{closing.eyebrow}</p>

        <h2 className="m-0">
          <span className="block text-[clamp(1.4rem,2.8vw,2.5rem)] font-light leading-[1.15] text-[#0F2340] mb-1">
            {closing.lead}
          </span>
          <span className="type-date-giant block">{closing.dateDisplay}</span>
        </h2>
      </div>

      {/* Horizon transition with robotic arms emerging from mist into deep navy */}
      <div className="relative z-[5] my-2 sm:my-4 pointer-events-none select-none overflow-hidden">
        <motion.div
          style={{ transform: shouldReduceMotion ? 'none' : armsTransform }}
          className="editorial-wrap flex justify-end"
        >
          <img
            src="assets/imagens/bracos-roboticos-fade.webp"
            alt=""
            width={2000}
            height={1521}
            loading="lazy"
            decoding="async"
            className="w-[340px] sm:w-[520px] lg:w-[680px] max-w-[92vw] h-auto object-contain -my-8 sm:-my-14"
          />
        </motion.div>
      </div>

      {/* Lower deep navy zone: closing summary, CTA, contacts, and official footer */}
      <div className="editorial-wrap pt-6 sm:pt-10">
        <div className="max-w-[820px]">
          <p
            className="text-[20px] sm:text-[26px] font-semibold text-white m-0 mb-1.5"
            style={{ fontVariationSettings: "'wdth' 110, 'wght' 600" }}
          >
            {closing.programName}
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#DEE1E5] m-0">
            {closing.location}
          </p>

          <div className="mt-7 pt-6 border-t border-white/25 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-baseline">
            <p className="type-value text-[30px] sm:text-[38px]">
              {hero.vacanciesLabel}
            </p>
            <p className="text-[15px] sm:text-[16px] text-[#E6E8EB] m-0">
              {hero.chips[1]}
            </p>
            <p className="text-[15px] sm:text-[16px] text-[#E6E8EB] m-0">
              {hero.chips[2]}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href={getSafeExternalUrl(config.enrollUrl)}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="strict-origin-when-cross-origin"
              onClick={() => trackEnrollClick('closing_primary')}
              className="btn-cta w-full sm:w-auto"
            >
              <span>{closing.buttonLabel}</span>
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
              <span>{closing.editalButtonLabel}</span>
            </button>
          </div>

          <p className="mt-8 text-[15px] sm:text-[16px] text-[#E6E8EB] leading-relaxed">
            <span>{closing.contactLabel} </span>
            <a href={closing.phones[0].href} className="editorial-link inline-block">
              {closing.phones[0].display}
            </a>
            <span> e </span>
            <a href={closing.phones[1].href} className="editorial-link inline-block">
              {closing.phones[1].display}
            </a>
          </p>
        </div>

        {/* Block 12: Rodapé */}
        <footer className="mt-14 sm:mt-16 pt-8 border-t border-[#6CB6D6]/45">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <p className="type-label">{footer.realizacaoLabel}</p>
              <div className="flex items-center">
                <img
                  src="assets/logos/ham-branco.png"
                  alt="Hospital Aristides Maltez · Liga Bahiana Contra o Câncer"
                  width={597}
                  height={229}
                  loading="lazy"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="type-label">{footer.patrocinioLabel}</p>
              <div className="flex flex-wrap items-center gap-7 opacity-90">
                <img
                  src="assets/logos/novva-branco.png"
                  alt="NOVVA Marketing de Estratégia"
                  width={646}
                  height={232}
                  loading="lazy"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
                {config.showMedCall && (
                  <img
                    src="assets/logos/medcall-branco.png"
                    alt="MedCall"
                    width={924}
                    height={289}
                    loading="lazy"
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] sm:text-[14px] text-[#DEE1E5]">
            <div className="flex flex-col gap-1.5">
              {config.showLegalFooter && (
                <p className="m-0 font-medium text-white">{footer.legal}</p>
              )}
              <p className="m-0 text-[#DEE1E5]">{footer.notice}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onOpenEdital}
                className="editorial-link bg-transparent border-0 p-0 text-[14px] min-h-[44px] inline-flex items-center"
              >
                Consultar edital completo
              </button>
              <a
                href="#topo"
                className="text-[#8CC4DE] hover:text-white no-underline text-[14px] font-medium min-h-[44px] inline-flex items-center transition-colors duration-150"
              >
                Voltar ao topo
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
