import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProgramSection } from './components/ProgramSection';
import { RoutineCurriculumSection } from './components/RoutineCurriculumSection';
import { ApplyCalendarSection } from './components/ApplyCalendarSection';
import { InvestmentFaqSection } from './components/InvestmentFaqSection';
import { ClosingFooterSection } from './components/ClosingFooterSection';
import { EditalSheet } from './components/EditalSheet';

export function App() {
  const [editalOpen, setEditalOpen] = useState(false);

  const openEdital = useCallback(() => {
    setEditalOpen(true);
    if (window.location.hash !== '#edital') {
      window.history.replaceState(null, '', '#edital');
    }
  }, []);

  const closeEdital = useCallback(() => {
    setEditalOpen(false);
    if (window.location.hash === '#edital') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Support deep linking directly to fellowham.com.br/#edital
  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === '#edital') {
        setEditalOpen(true);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A172D] text-white">
        <Header onOpenEdital={openEdital} />

        <main id="conteudo-principal">
          <HeroSection onOpenEdital={openEdital} />
          <ProgramSection />
          <RoutineCurriculumSection />
          <ApplyCalendarSection onOpenEdital={openEdital} />
          <InvestmentFaqSection />
          <ClosingFooterSection onOpenEdital={openEdital} />
        </main>

        <EditalSheet open={editalOpen} onClose={closeEdital} />
      </div>
    </MotionConfig>
  );
}

export default App;
