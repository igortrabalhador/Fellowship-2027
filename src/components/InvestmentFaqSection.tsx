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
      {/* Blocks 08 & 09: Investimento e Quem coordena (--bg-deep) */}
      <section
        id={investment.id}
        className="surface-grain surface-deep relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        {/* Subtle robotic arm entering upper-right corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 -right-10 w-[300px] sm:w-[440px] lg:w-[540px] max-w-[55vw] z-[2] opacity-25 sm:opacity-45"
        >
          <img
            src="assets/imagens/bracos-roboticos-alpha.webp"
            alt=""
            width={2000}
            height={1521}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="editorial-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
            {/* Block 08: Investimento */}
            <div className={config.showCoordination ? 'lg:col-span-6' : 'lg:col-span-8'}>
              <p className="type-eyebrow mb-4">{investment.eyebrow}</p>
              <h2 className="type-display type-display-l text-white">
                {investment.title}
              </h2>

              <div className="mt-9 pt-7 border-t border-white/25">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
                  <p className="type-value text-[42px] sm:text-[56px]">
                    {investment.amount}
                  </p>
                  <span className="text-[17px] sm:text-[19px] text-[#DEE1E5]">
                    {investment.period}
                  </span>
                </div>
                <p className="type-body max-w-[46ch]">{investment.text}</p>
              </div>
            </div>

            {/* Block 09: Quem coordena (toggleable via config.showCoordination) */}
            {config.showCoordination && (
              <div id={coordination.id} className="lg:col-span-6">
                <p className="type-eyebrow mb-4">{coordination.eyebrow}</p>
                <h2 className="type-display type-display-l text-white">
                  {coordination.title}
                </h2>

                <div className="mt-9 flex flex-col divide-y divide-white/25 border-t border-b border-white/25">
                  {coordination.people.map((person) => (
                    <article key={person.name} className="py-6">
                      <h3
                        className="text-[20px] sm:text-[23px] font-semibold text-white m-0 mb-2"
                        style={{ fontVariationSettings: "'wdth' 110, 'wght' 600" }}
                      >
                        {person.name}
                      </h3>
                      <p className="type-body max-w-[44ch]">{person.role}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Block 10: Perguntas frequentes (--bg-reference) */}
      <section
        id={faq.id}
        className="surface-grain surface-reference relative overflow-hidden pt-20 sm:pt-28 pb-36 sm:pb-48 lg:pb-56"
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
