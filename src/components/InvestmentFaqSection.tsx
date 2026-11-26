import { useState } from 'react';
import content from '@/data/landing-content.json';
import { PlusIcon } from './Icons';

export function InvestmentFaqSection() {
  const { investment, coordination, faq, config } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* Blocks 08 & 09: Solid Brand Light Blue (#5CAACA) with Deep Navy ink (#0B1C36, 6.53:1) */}
      <section
        id={investment.id}
        className="surface-solid-blue relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        <div className="editorial-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
            {/* Block 08: Investimento */}
            <div className={config.showCoordination ? 'lg:col-span-6' : 'lg:col-span-8'}>
              <p className="type-eyebrow text-[#0B1C36] mb-4">{investment.eyebrow}</p>
              <h2 className="type-display type-display-l text-[#0B1C36]">
                {investment.title}
              </h2>

              <div className="mt-9 pt-7 border-t border-[#0B1C36]/25">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
                  <p className="type-value text-[#0B1C36] text-[44px] sm:text-[60px]">
                    {investment.amount}
                  </p>
                  <span className="text-[17px] sm:text-[19px] font-semibold text-[#0F2340]">
                    {investment.period}
                  </span>
                </div>
                <p className="m-0 max-w-[46ch] text-[16px] sm:text-[18px] leading-[1.55] font-medium text-[#0B1C36]">
                  {investment.text}
                </p>
              </div>
            </div>

            {/* Block 09: Quem coordena (toggleable via config.showCoordination) */}
            {config.showCoordination && (
              <div id={coordination.id} className="lg:col-span-6">
                <p className="type-eyebrow text-[#0B1C36] mb-4">
                  {coordination.eyebrow}
                </p>
                <h2 className="type-display type-display-l text-[#0B1C36]">
                  {coordination.title}
                </h2>

                <div className="mt-9 flex flex-col divide-y divide-[#0B1C36]/25 border-t border-b border-[#0B1C36]/25">
                  {coordination.people.map((person) => (
                    <article key={person.name} className="py-6">
                      <h3
                        className="text-[20px] sm:text-[23px] font-semibold text-[#0B1C36] m-0 mb-2"
                        style={{ fontVariationSettings: "'wdth' 110, 'wght' 650" }}
                      >
                        {person.name}
                      </h3>
                      <p className="m-0 max-w-[44ch] text-[16px] sm:text-[17px] leading-[1.5] font-medium text-[#0F2340]">
                        {person.role}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Block 10: Perguntas frequentes: Solid Institutional Navy (#0F2340) */}
      <section
        id={faq.id}
        className="surface-solid-navy relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        <div className="editorial-wrap">
          <p className="type-eyebrow mb-4">{faq.eyebrow}</p>
          <h2 className="type-display type-display-l text-white max-w-[16ch]">
            {faq.title}
          </h2>

          <div className="mt-12 sm:mt-14 max-w-[880px] border-t border-white/25 divide-y divide-white/25">
            {faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              const btnId = `faq-trigger-${idx}`;

              return (
                <div key={item.question}>
                  <h3 className="m-0">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(idx)}
                      className="w-full min-h-[64px] py-5 sm:py-6 flex items-center justify-between gap-5 text-left bg-transparent border-0 text-white hover:text-[#8CC4DE] transition-colors duration-150"
                    >
                      <span
                        className="text-[18px] sm:text-[21px] font-medium leading-snug"
                        style={{ fontVariationSettings: "'wdth' 106, 'wght' 520" }}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 w-9 h-9 rounded-full border border-[#6CB6D6]/60 flex items-center justify-center text-[#6CB6D6] transition-transform duration-200 ${
                          isOpen ? 'rotate-45 bg-[#6CB6D6]/15' : 'rotate-0'
                        }`}
                        style={{ transitionTimingFunction: 'var(--ease-out)' }}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    data-open={isOpen}
                    className="accordion-panel"
                  >
                    <div className="accordion-panel__inner">
                      <p className="type-body pb-6 sm:pb-7 pr-8 max-w-[58ch]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
