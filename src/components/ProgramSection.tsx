import content from '@/data/landing-content.json';

export function ProgramSection() {
  const { program } = content;
  const [surgicalRoom, roboticSurgery, outpatientWard, research] = program.cards;

  return (
    <div id={program.id}>
      {/* Part A: Surgical core + X-ray robotic arm edge bleed (--bg-deep) */}
      <section className="surface-grain surface-deep relative overflow-hidden py-20 sm:py-28 lg:py-32">
        {/* X-ray robotic arm emerging seamlessly from right edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-12 sm:right-0 lg:right-4 w-[280px] sm:w-[400px] lg:w-[540px] max-w-[54vw] z-[2] opacity-40 sm:opacity-65 lg:opacity-85"
        >
          <img
            src="/assets/imagens/robo-raio-x-alpha.webp"
            alt=""
            width={1600}
            height={2157}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="editorial-wrap">
          <div className="max-w-[700px]">
            <p className="type-eyebrow mb-5">{program.eyebrow}</p>

            <h2 className="m-0">
              <span className="type-lead block mb-2 text-[#E6E8EB]">
                {program.lead}
              </span>
              <span className="type-display type-display-l block text-white">
                {program.title}
              </span>
            </h2>

            <p className="type-body mt-7 max-w-[48ch] text-[18px] sm:text-[20px]">
              {program.text}
            </p>
          </div>

          {/* Hairline-ruled surgical core (matching Carrossel-04 editorial rhythm) */}
          <div className="mt-14 sm:mt-16 max-w-[680px] flex flex-col gap-10">
            <article className="pt-6 border-t border-white/25">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <p className="type-eyebrow">{surgicalRoom.tag}</p>
                <span className="type-value text-[24px] sm:text-[32px]">
                  {surgicalRoom.metric}
                </span>
              </div>
              <h3
                className="text-[22px] sm:text-[26px] font-medium text-white m-0 mb-2.5"
                style={{ fontVariationSettings: "'wdth' 112, 'wght' 550" }}
              >
                {surgicalRoom.title}
              </h3>
              <p className="type-body max-w-[46ch]">{surgicalRoom.text}</p>
            </article>

            <article className="pt-6 border-t border-white/25">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <p className="type-eyebrow">{roboticSurgery.tag}</p>
                <span className="type-value text-[24px] sm:text-[32px]">
                  {roboticSurgery.metric}
                </span>
              </div>
              <h3
                className="text-[22px] sm:text-[26px] font-medium text-white m-0 mb-2.5"
                style={{ fontVariationSettings: "'wdth' 112, 'wght' 550" }}
              >
                {roboticSurgery.title}
              </h3>
              <p className="type-body max-w-[48ch]">{roboticSurgery.text}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Part B: Outpatient, Ward & NEPU Research (--bg-reference with bottom mist breathing space) */}
      <section className="surface-grain surface-reference relative overflow-hidden pt-20 sm:pt-28 pb-36 sm:pb-48 lg:pb-56">
        <div className="editorial-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Ambulatório e enfermaria */}
            <article className="lg:col-span-5 pt-6 border-t border-white/25">
              <p className="type-eyebrow mb-4">{outpatientWard.tag}</p>
              <h3 className="type-display text-[28px] sm:text-[36px] text-white mb-5">
                {outpatientWard.title}
              </h3>
              <p className="type-body max-w-[40ch]">{outpatientWard.text}</p>
            </article>

            {/* Pesquisa: NEPU highlighted in light blue matching Carrossel-05 */}
            <article className="lg:col-span-7 pt-6 border-t border-white/25">
              <p className="type-eyebrow mb-4">{research.tag}</p>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-5">
                <h3 className="type-display text-[28px] sm:text-[36px] text-white">
                  {research.title}
                </h3>
                <span className="type-value">{research.metric}</span>
              </div>
              <p className="type-body max-w-[54ch] text-[18px] sm:text-[20px]">
                {research.text}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
