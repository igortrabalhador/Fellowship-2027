import content from '@/data/landing-content.json';

/**
 * Block 02: Institutional video section.
 * Strictly hidden (returns null, zero placeholder) while config.showVideo is false
 * or config.videoUrl is empty, per project specification.
 */
export function VideoSection() {
  const { config, video } = content;

  if (!config.showVideo || !config.videoUrl) {
    return null;
  }

  return (
    <section
      id="video-institucional"
      className="surface-grain surface-deep py-20 sm:py-28"
    >
      <div className="editorial-wrap">
        <p className="type-eyebrow mb-4">{video.eyebrow}</p>
        <h2 className="type-display type-display-l text-white max-w-[20ch]">
          {video.title}
        </h2>

        <div className="mt-10 aspect-video w-full max-w-[960px] rounded-[18px] overflow-hidden border border-white/20 bg-[#0A172D]">
          <iframe
            src={config.videoUrl}
            title={video.title}
            width={1280}
            height={720}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
