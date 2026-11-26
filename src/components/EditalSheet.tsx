import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from 'motion/react';
import content from '@/data/landing-content.json';
import edital from '@/data/edital-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { getSafeExternalUrl, getSafeRelativeAssetPath } from '@/lib/security';
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  ExternalArrowIcon,
  PrintIcon,
} from './Icons';

interface EditalSheetProps {
  open: boolean;
  onClose: () => void;
}

export function EditalSheet({ open, onClose }: EditalSheetProps) {
  const shouldReduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const [copiedKey, setCopiedKey] = useState<'bank' | 'email' | null>(null);
  const [activeSection, setActiveSection] = useState<string>(edital.sections[0].id);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap inside modal sheet (antislop R-32)
      if (e.key === 'Tab' && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  const handleCopy = async (key: 'bank' | 'email', text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2200);
    } catch {
      // Clipboard API may be restricted in non-secure contexts
    }
  };

  const jumpToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = scrollBodyRef.current?.querySelector<HTMLElement>(`#${sectionId}`);
    if (target) {
      target.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  // Apple Motion §5 & §6: velocity-aware swipe-to-dismiss on mobile grabber
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 480) {
      onClose();
    }
  };

  const sheetTransition = shouldReduceMotion
    ? { duration: 0.16 }
    : { type: 'spring' as const, bounce: 0, duration: 0.42 };

  const initialVariant = shouldReduceMotion
    ? { opacity: 0 }
    : isMobile
      ? { y: '100%' }
      : { x: '100%' };

  const animateVariant = shouldReduceMotion
    ? { opacity: 1 }
    : isMobile
      ? { y: 0 }
      : { x: 0 };

  const exitVariant = shouldReduceMotion
    ? { opacity: 0 }
    : isMobile
      ? { y: '100%' }
      : { x: '100%' };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end md:items-stretch md:justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edital-sheet-title"
        >
          {/* Dimming scrim (Apple HIG: dim to focus) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050D1A]/75 backdrop-blur-[4px] no-print"
          />

          {/* Presentation Sheet */}
          <motion.div
            ref={sheetRef}
            initial={initialVariant}
            animate={animateVariant}
            exit={exitVariant}
            transition={sheetTransition}
            drag={isMobile && !shouldReduceMotion ? 'y' : false}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.45 }}
            onDragEnd={handleDragEnd}
            className="edital-print-surface relative z-10 w-full md:w-[min(820px,92vw)] h-[92dvh] md:h-full rounded-t-[24px] md:rounded-none bg-[#0D1E38] border-t md:border-t-0 md:border-l border-[#6CB6D6]/35 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Mobile drag grabber (Apple HIG sheets.md: dedicated drag handle so inner scroll never conflicts) */}
            <div
              onPointerDown={(e) => {
                if (isMobile && !shouldReduceMotion) {
                  dragControls.start(e);
                }
              }}
              className="md:hidden pt-3 pb-2 flex justify-center touch-none cursor-grab active:cursor-grabbing no-print"
            >
              <span
                aria-hidden="true"
                className="w-10 h-1.5 rounded-full bg-white/30"
              />
            </div>

            {/* Sticky sheet header */}
            <div className="px-5 sm:px-8 pt-4 pb-4 border-b border-white/15 bg-[#0A172D]/90 shrink-0 no-print">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="type-eyebrow text-[12px] mb-1">
                    EDITAL OFICIAL · {content.config.editalDate}
                  </p>
                  <h2
                    id="edital-sheet-title"
                    className="m-0 text-[18px] sm:text-[22px] font-semibold text-white leading-tight"
                    style={{ fontVariationSettings: "'wdth' 112, 'wght' 600" }}
                  >
                    {edital.title}
                  </h2>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar edital"
                  className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/25 bg-[#0F2340] text-white hover:border-[#6CB6D6] active:scale-[0.95] transition-[border-color,transform] duration-150"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Action controls */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <a
                  href={getSafeExternalUrl(content.config.enrollUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onClick={() => trackEnrollClick('edital_sheet_enroll')}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-[#5CAACA] text-[#0B1C36] text-[13px] font-semibold no-underline hover:bg-[#6BB4D2] active:scale-[0.97] transition-[background-color,transform] duration-150"
                >
                  <span>Ir para inscrição (lbcc.org.br)</span>
                  <ExternalArrowIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={getSafeRelativeAssetPath(content.config.editalDownloadUrl)}
                  download="Edital_Fellowship_Uro_Oncologia_HAM_2027.doc"
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-[#6CB6D6]/70 bg-[#0F2340]/60 text-white text-[13px] font-medium no-underline hover:bg-[#469ABB]/20 active:scale-[0.97] transition-[background-color,transform] duration-150"
                >
                  <DownloadIcon className="w-4 h-4 text-[#6CB6D6]" />
                  <span>Baixar edital (.doc)</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-white/25 bg-transparent text-[#E6E8EB] text-[13px] font-medium hover:border-white/50 active:scale-[0.97] transition-[border-color,transform] duration-150"
                >
                  <PrintIcon className="w-4 h-4 text-[#8CC4DE]" />
                  <span>Imprimir / PDF</span>
                </button>
              </div>

              {/* Section jump pills */}
              <nav
                aria-label="Seções do edital"
                className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1"
              >
                {edital.sections.map((section) => {
                  const isSelected = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => jumpToSection(section.id)}
                      className={`shrink-0 min-h-[38px] px-3.5 rounded-full text-[12px] font-medium border transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#6CB6D6]/20 border-[#6CB6D6] text-white'
                          : 'bg-transparent border-white/15 text-[#DEE1E5] hover:border-white/35 hover:text-white'
                      }`}
                    >
                      {section.navLabel}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Scrollable verbatim Edital body */}
            <div
              ref={scrollBodyRef}
              className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 space-y-8 text-[#E6E8EB]"
            >
              {/* Official institutional header */}
              <div className="pb-6 border-b border-white/20">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#8CC4DE] leading-relaxed">
                    {edital.institution.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  <img
                    src="assets/logos/ham-branco.png"
                    alt="Hospital Aristides Maltez"
                    width={597}
                    height={229}
                    className="h-9 w-auto object-contain shrink-0 no-print"
                  />
                </div>

                <h3
                  className="text-[20px] sm:text-[24px] font-semibold text-white m-0 mb-1"
                  style={{ fontVariationSettings: "'wdth' 115, 'wght' 600" }}
                >
                  {edital.title}
                </h3>
                <p className="text-[14px] font-semibold tracking-[0.14em] uppercase text-[#6CB6D6] m-0 mb-4">
                  {edital.subtitle}
                </p>
                <p className="text-[15px] sm:text-[16px] leading-relaxed m-0 text-[#E6E8EB]">
                  {edital.preamble}
                </p>
              </div>

              {/* Practical one-tap copy utilities for LBCC deposit & CV email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 no-print">
                <div className="rounded-[14px] p-4 bg-[#0A172D]/80 border border-[#6CB6D6]/35 flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8CC4DE] m-0 mb-1.5">
                      {edital.quickFacts.bankLabel}
                    </p>
                    <p className="text-[13px] leading-relaxed text-white m-0">
                      {edital.quickFacts.bankValue}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('bank', edital.quickFacts.bankValue)}
                    className="self-start inline-flex items-center gap-2 min-h-[38px] px-3.5 rounded-full border border-[#6CB6D6]/60 text-[12px] font-medium text-white bg-[#0F2340] hover:bg-[#469ABB]/20 active:scale-[0.97] transition-[background-color,transform] duration-150"
                  >
                    {copiedKey === 'bank' ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5 text-[#6CB6D6]" />
                        <span>Dados copiados</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-3.5 h-3.5 text-[#6CB6D6]" />
                        <span>Copiar dados bancários</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-[14px] p-4 bg-[#0A172D]/80 border border-[#6CB6D6]/35 flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8CC4DE] m-0 mb-1.5">
                      {edital.quickFacts.emailLabel}
                    </p>
                    <p className="text-[14px] font-medium text-white m-0 break-all">
                      {edital.quickFacts.emailValue}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', edital.quickFacts.emailValue)}
                    className="self-start inline-flex items-center gap-2 min-h-[38px] px-3.5 rounded-full border border-[#6CB6D6]/60 text-[12px] font-medium text-white bg-[#0F2340] hover:bg-[#469ABB]/20 active:scale-[0.97] transition-[background-color,transform] duration-150"
                  >
                    {copiedKey === 'email' ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5 text-[#6CB6D6]" />
                        <span>E-mail copiado</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-3.5 h-3.5 text-[#6CB6D6]" />
                        <span>Copiar e-mail</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Verbatim Edital sections */}
              {edital.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-4 pt-6 border-t border-white/15"
                >
                  <h4
                    className="text-[16px] sm:text-[18px] font-semibold uppercase tracking-[0.06em] text-[#6CB6D6] m-0 mb-4"
                    style={{ fontVariationSettings: "'wdth' 114, 'wght' 600" }}
                  >
                    {section.heading}
                  </h4>

                  {'summarySpecs' in section && section.summarySpecs && (
                    <dl className="m-0 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.summarySpecs.map((spec) => (
                        <div
                          key={spec.label}
                          className="rounded-[10px] px-4 py-3 bg-[#0A172D]/60 border border-white/10"
                        >
                          <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8CC4DE] mb-1">
                            {spec.label}
                          </dt>
                          <dd className="m-0 text-[14px] sm:text-[15px] text-white">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {'workloadTable' in section && section.workloadTable && (
                    <div className="mb-5 overflow-x-auto rounded-[12px] border border-white/20">
                      <table className="w-full border-collapse text-left text-[14px]">
                        <thead>
                          <tr className="bg-[#0A172D] text-[#8CC4DE] border-b border-white/20">
                            <th className="py-3 px-4 font-semibold uppercase tracking-[0.1em] text-[12px]">
                              Atividade
                            </th>
                            <th className="py-3 px-4 font-semibold uppercase tracking-[0.1em] text-[12px]">
                              Turnos
                            </th>
                            <th className="py-3 px-4 font-semibold uppercase tracking-[0.1em] text-[12px]">
                              Carga Horária
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/15">
                          {section.workloadTable.map((row) => {
                            const isTotal = row.activity === 'TOTAL';
                            return (
                              <tr
                                key={row.activity}
                                className={
                                  isTotal
                                    ? 'bg-[#469ABB]/20 font-semibold text-white'
                                    : 'text-[#E6E8EB]'
                                }
                              >
                                <td className="py-3 px-4">{row.activity}</td>
                                <td className="py-3 px-4 tabular-nums">{row.shifts}</td>
                                <td className="py-3 px-4 tabular-nums font-semibold text-[#6CB6D6]">
                                  {row.hours}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {'clauses' in section && section.clauses && (
                    <div className="space-y-4">
                      {section.clauses.map((clause) => (
                        <div key={clause.number} className="text-[15px] leading-relaxed">
                          <p className="m-0">
                            <strong className="text-white font-semibold mr-2">
                              {clause.number}
                            </strong>
                            <span>{clause.text}</span>
                          </p>
                          {'note' in clause && clause.note && (
                            <p className="mt-3 mb-0 pl-4 border-l-2 border-[#6CB6D6] text-[14px] text-[#DEE1E5]">
                              {clause.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {'topics' in section && section.topics && (
                    <ol className="m-0 pl-5 space-y-2 text-[15px] leading-relaxed text-[#E6E8EB]">
                      {section.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ol>
                  )}
                </section>
              ))}

              {/* Signatures & official date */}
              <div className="pt-6 border-t border-white/20 space-y-5 pb-6">
                {edital.signatures.map((sig) => (
                  <div key={sig.name}>
                    <p className="m-0 text-[15px] font-semibold text-white">{sig.name}</p>
                    {sig.lines.map((line) => (
                      <p key={line} className="m-0 text-[13px] text-[#DEE1E5] mt-0.5">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
                <p className="m-0 pt-2 text-[13px] font-medium text-[#8CC4DE]">
                  {edital.dateLocation}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
