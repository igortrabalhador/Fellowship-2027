import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import content from '@/data/landing-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { getSafeExternalUrl } from '@/lib/security';
import { ArrowRightIcon, CheckIcon, DocumentIcon } from './Icons';

interface ApplyCalendarSectionProps {
  onOpenEdital: () => void;
}

export function ApplyCalendarSection({ onOpenEdital }: ApplyCalendarSectionProps) {
  const { howToApply, calendar, config } = content;
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 72%', 'end 68%'],
  });
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = howToApply.documents.length;
  const progressPct = Math.round((checkedCount / totalDocs) * 100);

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      {/* Block 06: Como se inscrever: Solid cool grey-mist (#E5E9EE) */}
      <section
        id={howToApply.id}
        className="surface-solid-slate relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        <div className="editorial-wrap">
          <p className="type-eyebrow text-[#1A5A79] mb-4">{howToApply.eyebrow}</p>
          <h2 className="type-display type-display-l text-[#0F2340] max-w-[16ch]">
            {howToApply.title}
          </h2>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left column: eligibility, fee, channels */}
            <div className="lg:col-span-6 flex flex-col gap-9">
              <div className="pt-6 border-t border-[#0F2340]/20">
                <h3 className="type-eyebrow text-[#1A5A79] mb-3">
                  {howToApply.eligibilityLabel}
                </h3>
                <p className="m-0 max-w-[48ch] text-[16px] sm:text-[18px] leading-[1.55] text-[#243652]">
                  {howToApply.eligibility}
                </p>
              </div>

              <div className="pt-6 border-t border-[#0F2340]/20">
                <h3 className="type-eyebrow text-[#1A5A79] mb-3">
                  {howToApply.feeLabel}
                </h3>
                <p className="m-0 max-w-[46ch] text-[16px] sm:text-[18px] leading-[1.55] text-[#243652]">
                  {howToApply.fee}
                </p>
              </div>

              <div className="pt-6 border-t border-[#0F2340]/20">
                <h3 className="type-eyebrow text-[#1A5A79] mb-3">
                  {howToApply.whereLabel}
                </h3>
                <p className="m-0 max-w-[48ch] text-[16px] sm:text-[18px] leading-[1.55] text-[#243652]">
                  {howToApply.where}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                  <a
                    href={getSafeExternalUrl(config.enrollUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onClick={() => trackEnrollClick('how_to_apply_site_link')}
                    className="editorial-link-light inline-flex items-center min-h-[44px]"
                  >
                    {howToApply.siteDisplay}
                  </a>
                  <a
                    href={howToApply.phoneHref}
                    className="editorial-link-light inline-flex items-center min-h-[44px]"
                  >
                    {howToApply.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: crisp white document checklist panel */}
            <div className="lg:col-span-6 rounded-[22px] bg-white p-6 sm:p-8 border border-[#0F2340]/12">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="type-eyebrow text-[#1A5A79]">
                  {howToApply.documentsLabel}
                </h3>
                <span
                  className="text-[13px] font-semibold tracking-[0.06em] text-[#1A5A79] tabular-nums"
                  aria-live="polite"
                >
                  {checkedCount} de {totalDocs} separados
                </span>
              </div>

              <p className="text-[14px] text-[#243652] m-0 mb-4">
                {howToApply.documentsHelper}
              </p>

              {/* Progress hairline */}
              <div
                aria-hidden="true"
                className="h-[3px] w-full bg-[#0F2340]/12 rounded-full overflow-hidden mb-5"
              >
                <div
                  className="h-full bg-[#1A5A79] origin-left transition-transform duration-200"
                  style={{
                    transform: `scaleX(${progressPct / 100})`,
                    transitionTimingFunction: 'var(--ease-out)',
                  }}
                />
              </div>

              <ul className="list-none m-0 p-0 flex flex-col divide-y divide-[#0F2340]/12 border-t border-b border-[#0F2340]/12">
                {howToApply.documents.map((doc, idx) => {
                  const isChecked = Boolean(checkedDocs[idx]);
                  return (
                    <li key={doc}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggleDoc(idx)}
                        className="w-full min-h-[52px] py-3.5 px-1 flex items-center gap-4 text-left bg-transparent border-0 text-[#0F2340] active:scale-[0.99] transition-transform duration-100"
                      >
                        <span
                          aria-hidden="true"
                          className={`w-6 h-6 rounded-[6px] border flex items-center justify-center shrink-0 transition-[background-color,border-color,transform] duration-150 ${
                            isChecked
                              ? 'bg-[#0F2340] border-[#0F2340] text-white'
                              : 'border-[#1A5A79]/65 bg-[#F2F3F5] text-transparent'
                          }`}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </span>
                        <span
                          className={`text-[16px] sm:text-[17px] leading-snug transition-colors duration-150 ${
                            isChecked
                              ? 'text-[#1A5A79] line-through'
                              : 'text-[#0F2340] font-medium'
                          }`}
                        >
                          {doc}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <a
                  href={getSafeExternalUrl(config.enrollUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onClick={() => trackEnrollClick('how_to_apply_cta')}
                  className="btn-cta-dark w-full sm:w-auto"
                >
                  <span>{howToApply.buttonLabel}</span>
                  <span className="btn-arrow">
                    <ArrowRightIcon className="w-5 h-5" />
                  </span>
                </a>

                <button
                  type="button"
                  onClick={onOpenEdital}
                  className="btn-pill-light w-full sm:w-auto"
                >
                  <DocumentIcon className="w-4 h-4 text-[#1A5A79]" />
                  <span>{howToApply.editalButtonLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 07: Calendário: Signature dark gradient + grain (--bg-reference-left, Dealt Scroll Moment #1) */}
      <section
        id={calendar.id}
        className="surface-grain surface-reference-left relative overflow-hidden pt-20 sm:pt-28 pb-32 sm:pb-44 lg:pb-48"
      >
        <div className="editorial-wrap">
          <p className="type-eyebrow mb-4">{calendar.eyebrow}</p>
          <h2 className="type-display type-display-l text-white">
            {calendar.title}
          </h2>

          <div
            ref={timelineRef}
            className="relative mt-12 sm:mt-16 max-w-[780px] pl-12 sm:pl-16"
          >
            {/* Base track line */}
            <div
              aria-hidden="true"
              className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#6CB6D6]/25"
            />
            {/* Dealt Scroll Moment #1: scrubbed progressive beam (GPU scaleY) */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#6CB6D6] origin-top"
              style={{ scaleY: shouldReduceMotion ? 1 : railScaleY }}
            />

            <ol className="list-none m-0 p-0 flex flex-col gap-9 sm:gap-11">
              {calendar.steps.map((step, index) => {
                const isFirst = index === 0;
                const isDeadline = index === 1;
                return (
                  <li key={step.date} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-12 sm:-left-16 top-1 w-6 h-6 rounded-full border-[1.5px] border-[#6CB6D6] flex items-center justify-center ${
                        isFirst ? 'bg-[#6CB6D6]' : 'bg-[#0F2340]'
                      }`}
                    >
                      {isDeadline && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#6CB6D6]" />
                      )}
                    </span>

                    <p className="text-[15px] sm:text-[17px] font-normal text-[#DEE1E5] m-0 mb-1">
                      {step.label}
                    </p>
                    <p
                      className="m-0 text-[24px] sm:text-[34px] font-medium leading-[1.08] tracking-[-0.015em] text-white"
                      style={{ fontVariationSettings: "'wdth' 125, 'wght' 550" }}
                    >
                      {step.date}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Selection criteria & proportional weight bar */}
          <div className="mt-14 pt-7 border-t border-white/25 max-w-[780px]">
            <p className="text-[17px] sm:text-[19px] font-medium text-white m-0 mb-5">
              {calendar.note}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-10 gap-3">
              {calendar.weights.map((item, idx) => (
                <div
                  key={item.label}
                  className={`rounded-[12px] px-4 py-3.5 border ${
                    idx === 0
                      ? 'sm:col-span-4 bg-[#0F2340]/55 border-[#6CB6D6]/45'
                      : 'sm:col-span-6 bg-[#469ABB]/25 border-[#6CB6D6]/75'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[14px] text-[#E6E8EB]">{item.label}</span>
                    <span
                      className="text-[15px] font-semibold text-[#6CB6D6] uppercase"
                      style={{ fontVariationSettings: "'wdth' 115, 'wght' 600" }}
                    >
                      {item.weight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
