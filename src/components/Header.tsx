import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import content from '@/data/landing-content.json';
import { trackEnrollClick } from '@/lib/analytics';
import { CloseIcon, DocumentIcon, ExternalArrowIcon } from './Icons';

interface HeaderProps {
  onOpenEdital: () => void;
}

export function Header({ onOpenEdital }: HeaderProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = content.navigation.links.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.01 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-[#5CAACA] focus:text-[#0B1C36] focus:font-semibold no-print"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 no-print ${
          scrolled ? 'chrome-glass' : 'bg-[#0A172D]/35 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="editorial-wrap flex items-center justify-between h-16 gap-4">
          <a
            href="#topo"
            className="inline-flex items-center gap-3 min-h-[44px] text-white no-underline group"
            aria-label="Início · Fellowship em Uro-oncologia e Cirurgia Robótica HAM 2027"
          >
            <img
              src="assets/logos/ham-branco.png"
              alt="Hospital Aristides Maltez"
              width={597}
              height={229}
              className="h-6 w-auto object-contain"
            />
            <span
              className="hidden sm:inline-block h-4 w-px bg-white/25"
              aria-hidden="true"
            />
            <span
              className="hidden sm:inline-block text-[12px] font-semibold tracking-[0.18em] uppercase text-[#8CC4DE]"
              style={{ fontVariationSettings: "'wdth' 112, 'wght' 600" }}
            >
              {content.navigation.brand}
            </span>
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-1">
            {content.navigation.links.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative inline-flex items-center min-h-[44px] px-3.5 text-[14px] font-medium no-underline transition-colors duration-150 ${
                    isActive ? 'text-white' : 'text-[#DEE1E5] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3.5 right-3.5 bottom-2 h-[2px] bg-[#6CB6D6] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenEdital}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-[#6CB6D6]/70 text-[13px] font-medium text-white bg-[#0F2340]/40 hover:bg-[#469ABB]/20 active:scale-[0.97] transition-[background-color,transform] duration-150"
            >
              <DocumentIcon className="w-4 h-4 text-[#6CB6D6]" />
              <span>{content.navigation.editalLabel}</span>
            </button>

            <a
              href={content.config.enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEnrollClick('header_desktop')}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-[#5CAACA] text-[#0B1C36] text-[13px] font-semibold tracking-[0.01em] no-underline hover:bg-[#6BB4D2] active:scale-[0.97] transition-[background-color,transform] duration-150"
              style={{ fontVariationSettings: "'wdth' 110, 'wght' 600" }}
            >
              <span>{content.navigation.ctaLabel}</span>
              <ExternalArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile actions: explicit labeled Edital + Menu buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenEdital}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-full border border-[#6CB6D6]/75 text-[13px] font-medium text-white bg-[#0F2340]/50 active:scale-[0.97] transition-transform duration-150"
            >
              <DocumentIcon className="w-4 h-4 text-[#6CB6D6]" />
              <span>{content.navigation.editalLabel}</span>
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-movel"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3.5 rounded-full border border-white/25 text-[13px] font-medium text-white bg-[#0F2340]/50 active:scale-[0.97] transition-transform duration-150"
            >
              {menuOpen ? (
                <>
                  <CloseIcon className="w-4 h-4" />
                  <span>Fechar</span>
                </>
              ) : (
                <span>Menu</span>
              )}
            </button>
          </div>
        </div>

        {/* Reading progress hairline */}
        <motion.div
          aria-hidden="true"
          className="h-[2px] bg-[#6CB6D6] origin-left"
          style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
        />

        {/* Mobile navigation drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="menu-movel"
              aria-label="Menu de navegação móvel"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-8px)' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-8px)' }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden bg-[#0A172D]/95 border-t border-white/15 px-5 py-5"
            >
              <ul className="list-none m-0 p-0 flex flex-col divide-y divide-white/10">
                {content.navigation.links.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between min-h-[48px] text-[16px] font-medium text-white no-underline py-2"
                    >
                      <span>{item.label}</span>
                      <span className="text-[#6CB6D6] text-xs uppercase tracking-[0.16em]">
                        Ir
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/15 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenEdital();
                  }}
                  className="btn-pill w-full"
                >
                  <DocumentIcon className="w-4 h-4 text-[#6CB6D6]" />
                  <span>{content.hero.editalCta}</span>
                </button>
                <a
                  href={content.config.enrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEnrollClick('mobile_menu');
                    setMenuOpen(false);
                  }}
                  className="btn-cta w-full"
                >
                  <span>{content.navigation.ctaLabel}</span>
                  <ExternalArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
