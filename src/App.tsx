import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import MusicSection from './sections/MusicSection';
import ProjectsSection from './sections/ProjectsSection';
import WriterSection from './sections/WriterSection';
import BarmaEffectSection from './sections/BarmaEffectSection';
import ContactSection from './sections/ContactSection';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div key="content" className="relative min-h-screen">
            <div className="noise"></div>
            <div className="grid-pattern fixed inset-0 z-0"></div>
            <CustomCursor />
            <Header />
            <main>
              <HeroSection />
              <MusicSection />
              <ProjectsSection />
              <WriterSection />
              <BarmaEffectSection />
              <ContactSection />
            </main>
            <footer className="py-6 text-center text-xs text-white/40">
              <p>© {new Date().getFullYear()} Karthik Barma. All rights distorted.</p>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;