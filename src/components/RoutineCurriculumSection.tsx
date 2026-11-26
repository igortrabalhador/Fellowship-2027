import { useState } from 'react';
import content from '@/data/landing-content.json';

type CurriculumCategory = 'todos' | 'prostata-bexiga' | 'outros-tumores' | 'tecnicas';

const CATEGORY_TABS: { id: CurriculumCategory; label: string; indices: number[] }[] = [
  {
    id: 'todos',
    label: 'Todos (15)',
    indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
  {
    id: 'prostata-bexiga',
    label: 'Próstata e Bexiga',
    indices: [0, 1, 2, 3, 7, 8, 9],
  },
  {
    id: 'outros-tumores',
    label: 'Rim, Pênis e Trato',
    indices: [5, 6, 10, 11, 13],
  },
  {
    id: 'tecnicas',
    label: 'Robótica e Modalidades',
    indices: [4, 12, 14],
  },
];

export function RoutineCurriculumSection() {
  const { routine, curriculum } = content;
  const [activeTab, setActiveTab] = useState<CurriculumCategory>('todos');

  const activeCategory =
    CATEGORY_TABS.find((t) => t.id === activeTab) ?? CATEGORY_TABS[0];

  const visibleItems = curriculum.items
    .map((text, index) => ({ text, number: index + 1, index }))
    .filter((item) => activeCategory.indices.includes(item.index));

  return (
    <>
      {/* Block 04: Como é a semana (--bg-reference-left, matching Carrossel-06) */}
      <section
        id={routine.id}
        className="surface-grain surface-reference-left relative overflow-hidden pt-20 sm:pt-28 pb-36 sm:pb-48 lg:pb-56"
      >
        <div className="editorial-wrap">
          <p className="type-eyebrow mb-4">{routine.eyebrow}</p>
          <h2 className="type-display type-display-l text-white max-w-[16ch]">
            {routine.title}
          </h2>

          {/* Weekly ruled table */}
          <div className="mt-12 sm:mt-16 max-w-[960px] divide-y divide-white/25 border-t border-b border-white/25">
            {routine.rows.map((row) => (
              <div
                key={row.area}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <div className="md:col-span-4 flex items-baseline gap-3">
                  <p className="type-value">{row.value}</p>
                  <span className="text-[13px] font-medium tracking-[0.12em] uppercase text-[#8CC4DE]">
                    {row.hours}
                  </span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-[19px] sm:text-[21px] font-semibold text-white m-0 mb-1">
                    {row.area}
                  </h3>
                  <p className="type-body">{row.description}</p>
                </div>
              </div>
            ))}

            {routine.meetings.map((meeting) => (
              <div
                key={meeting.value}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <div className="md:col-span-4">
                  <p className="type-value text-[24px] sm:text-[32px]">
                    {meeting.value}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p className="type-body">{meeting.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-7 text-[16px] sm:text-[18px] font-medium text-[#E6E8EB]">
            {routine.note}
          </p>
        </div>
      </section>

      {/* Block 05: Programa teórico (--bg-deep, 15 official numbered modules) */}
      <section
        id={curriculum.id}
        className="surface-grain surface-deep relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        <div className="editorial-wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="type-eyebrow mb-4">{curriculum.eyebrow}</p>
              <h2 className="type-display type-display-l text-white">
                {curriculum.title}
              </h2>
            </div>

            {/* Functional topic filter tabs (zero form inputs, pure reading utility) */}
            <div
              role="tablist"
              aria-label="Filtrar temas do programa teórico"
              className="flex flex-wrap gap-2"
            >
              {CATEGORY_TABS.map((tab) => {
                const selected = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[44px] px-4 rounded-full text-[13px] font-medium tracking-[0.02em] border transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                      selected
                        ? 'bg-[#5CAACA] text-[#0B1C36] border-[#5CAACA] font-semibold'
                        : 'bg-[#0F2340]/40 text-[#E6E8EB] border-white/25 hover:border-[#6CB6D6]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <ol
            aria-live="polite"
            className="list-none m-0 p-0 mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12"
          >
            {visibleItems.map((item) => (
              <li
                key={item.number}
                className="flex items-baseline gap-5 py-5 border-t border-white/20 transition-colors duration-150 hover:border-[#6CB6D6]/70"
              >
                <span
                  className="text-[14px] font-semibold text-[#6CB6D6] tabular-nums shrink-0"
                  style={{ fontVariationSettings: "'wdth' 115, 'wght' 600" }}
                >
                  {String(item.number).padStart(2, '0')}
                </span>
                <span className="text-[17px] sm:text-[19px] font-normal leading-snug text-[#F0F2F5]">
                  {item.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
