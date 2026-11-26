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
      {/* Block 04: Como é a semana: Solid pure white (#FFFFFF) Swiss editorial schedule */}
      <section
        id={routine.id}
        className="surface-solid-white relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        <div className="editorial-wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="type-eyebrow text-[#1A5A79] mb-4">{routine.eyebrow}</p>
              <h2 className="type-display type-display-l text-[#0F2340] max-w-[16ch]">
                {routine.title}
              </h2>
            </div>

            <div className="inline-flex items-baseline gap-3 self-start md:self-auto px-5 py-3 rounded-[14px] bg-[#0F2340] text-white">
              <span
                className="text-[22px] sm:text-[26px] font-semibold text-[#6CB6D6] tabular-nums"
                style={{ fontVariationSettings: "'wdth' 120, 'wght' 600" }}
              >
                40h
              </span>
              <span className="text-[13px] uppercase tracking-[0.14em] text-[#E6E8EB]">
                Carga semanal
              </span>
            </div>
          </div>

          {/* Weekly ruled table */}
          <div className="mt-12 sm:mt-16 max-w-[980px] divide-y divide-[#0F2340]/15 border-t border-b border-[#0F2340]/20">
            {routine.rows.map((row) => (
              <div
                key={row.area}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <div className="md:col-span-4 flex items-baseline gap-3">
                  <p className="type-value text-[#1A5A79]">{row.value}</p>
                  <span className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#243652]">
                    {row.hours}
                  </span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-[19px] sm:text-[21px] font-semibold text-[#0F2340] m-0 mb-1">
                    {row.area}
                  </h3>
                  <p className="m-0 text-[16px] sm:text-[18px] leading-[1.5] text-[#243652]">
                    {row.description}
                  </p>
                </div>
              </div>
            ))}

            {routine.meetings.map((meeting) => (
              <div
                key={meeting.value}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <div className="md:col-span-4">
                  <p className="type-value text-[#1A5A79] text-[24px] sm:text-[32px]">
                    {meeting.value}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p className="m-0 text-[16px] sm:text-[18px] leading-[1.5] text-[#243652]">
                    {meeting.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-7 text-[16px] sm:text-[18px] font-semibold text-[#0F2340]">
            {routine.note}
          </p>
        </div>
      </section>

      {/* Block 05: Programa teórico: Solid deep matte navy (#0A172D) */}
      <section
        id={curriculum.id}
        className="surface-solid-deep relative overflow-hidden py-20 sm:py-28 lg:py-32"
      >
        <div className="editorial-wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="type-eyebrow mb-4">{curriculum.eyebrow}</p>
              <h2 className="type-display type-display-l text-white">
                {curriculum.title}
              </h2>
            </div>

            {/* Functional topic filter tabs */}
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
                        : 'bg-[#0F2340] text-[#E6E8EB] border-white/25 hover:border-[#6CB6D6]'
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
