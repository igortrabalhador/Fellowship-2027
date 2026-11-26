import content from '@/data/landing-content.json';

export function ProgramSection() {
  const { program } = content;
  const [surgicalRoom, roboticSurgery, outpatientWard, research] = program.cards;

  return (
    <div id={program.id}>
      {/* Part A: Solid architectural mist-white (#F2F3F5) + framed dark X-ray bay */}
      <section className="surface-solid-light relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="editorial-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <p className="type-eyebrow text-[#1A5A79] mb-4">{program.eyebrow}</p>

              <h2 className="m-0">
                <span className="type-lead block mb-2 text-[#243652]">
                  {program.lead}
                </span>
                <span className="type-display type-display-l block text-[#0F2340]">
                  {program.title}
                </span>
              </h2>

              <p className="mt-6 max-w-[48ch] text-[18px] sm:text-[20px] leading-[1.55] text-[#243652]">
                {program.text}
              </p>

              {/* Hairline-ruled surgical core */}
              <div className="mt-12 sm:mt-14 flex flex-col gap-9">
                <article className="pt-6 border-t border-[#0F2340]/20">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2.5">
                    <p className="type-eyebrow text-[#1A5A79]">{surgicalRoom.tag}</p>
                    <span className="type-value text-[#1A5A79] text-[24px] sm:text-[32px]">
                      {surgicalRoom.metric}
                    </span>
                  </div>
                  <h3
                    className="text-[22px] sm:text-[25px] font-semibold text-[#0F2340] m-0 mb-2"
                    style={{ fontVariationSettings: "'wdth' 112, 'wght' 600" }}
                  >
                    {surgicalRoom.title}
                  </h3>
                  <p className="m-0 max-w-[48ch] text-[16px] sm:text-[18px] leading-[1.55] text-[#243652]">
                    {surgicalRoom.text}
                  </p>
                </article>

                <article className="pt-6 border-t border-[#0F2340]/20">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2.5">
                    <p className="type-eyebrow text-[#1A5A79]">{roboticSurgery.tag}</p>
                    <span className="type-value text-[#1A5A79] text-[24px] sm:text-[32px]">
                      {roboticSurgery.metric}
                    </span>
                  </div>
                  <h3
                    className="text-[22px] sm:text-[25px] font-semibold text-[#0F2340] m-0 mb-2"
                    style={{ fontVariationSettings: "'wdth' 112, 'wght' 600" }}
                  >
                    {roboticSurgery.title}
                  </h3>
                  <p className="m-0 max-w-[50ch] text-[16px] sm:text-[18px] leading-[1.55] text-[#243652]">
                    {roboticSurgery.text}
                  </p>
                </article>
              </div>
            </div>

            {/* Dark optical bay showcasing the X-ray robotic arm render */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div
                aria-hidden="true"
                className="surface-grain surface-deep relative rounded-[22px] overflow-hidden min-h-[340px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-end border border-[#0F2340]/15"
              >
                <img
                  src="assets/imagens/robo-raio-x-alpha.webp"
                  alt=""
                  width={1600}
                  height={2157}
                  loading="lazy"
                  decoding="async"
                  className="w-[92%] max-w-[460px] h-auto object-contain ml-auto -mr-4 -mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part B: Signature dark gradient + grain (--bg-reference) for Clinic & NEPU Research */}
      <section className="surface-grain surface-reference relative overflow-hidden pt-20 sm:pt-28 pb-32 sm:pb-44 lg:pb-48">
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
