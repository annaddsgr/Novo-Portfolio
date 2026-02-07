import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/ProjectsSection';
import { CreativeProcess } from './components/CreativeProcess';
import { ServicesList } from './components/ServicesList';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ColorInspiration } from './components/ColorInspiration';
import { CustomCursor } from './components/CustomCursor';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Marquee } from './components/Marquee';
import { CookieConsent } from './components/CookieConsent';
import { NotFound } from './components/NotFound';
import { BriefingPage } from './components/BriefingPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Simple routing logic: show 404 if path is not root (/) or if it's explicitly wrong
  // This is a simple fallback since we're using a single page layout (SPA)
  const isHome = currentPath === '/' ||
    currentPath.endsWith('/') ||
    currentPath.includes('index.html') ||
    currentPath.endsWith('portifolio-anna') ||
    currentPath.endsWith('portifolio-anna/');

  const isBriefing = currentPath.includes('/briefing');

  if (isBriefing) {
    return (
      <div className="min-h-screen bg-[#FCF6EF] antialiased md:cursor-none selection:bg-[#795558] selection:text-[#FCF6EF]">
        <CustomCursor />
        <Toaster position="top-center" />
        <BriefingPage />
      </div>
    );
  }

  if (!isHome && !isBriefing && currentPath.length > 1) {
    return (
      <div className="min-h-screen bg-white antialiased cursor-none">
        <CustomCursor />
        <NotFound onBack={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF6EF] antialiased md:cursor-none selection:bg-[#795558] selection:text-[#FCF6EF]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#795558] origin-left z-[1001]"
        style={{ scaleX: scrollYProgress }}
      />

      <CustomCursor />
      <AccessibilityMenu />
      <WhatsAppButton />
      <CookieConsent />
      <Toaster position="top-center" />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <ProjectsSection />
      <ColorInspiration />
      <CreativeProcess />
      <ServicesList />
      <Contact />
      <Footer />
    </div>
  );
}
