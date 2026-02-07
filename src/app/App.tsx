import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll } from 'motion/react';
import { Toaster } from 'sonner';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CreativeProcess } from './components/sections/CreativeProcess';
import { ServicesList } from './components/sections/ServicesList';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { AccessibilityMenu } from './components/layout/AccessibilityMenu';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { Marquee } from './components/sections/Marquee';
import { CookieConsent } from './components/layout/CookieConsent';
import { NotFound } from './components/layout/NotFound';
import { CreativeLab } from './components/sections/CreativeLab';

// Lazy loading for heavy features/pages
const BriefingPage = lazy(() => import('./components/features/BriefingPage').then(module => ({ default: module.BriefingPage })));

// Sophisticated Loading Screen
const PageLoader = () => (
  <div className="fixed inset-0 bg-[#FCF6EF] z-[10000] flex items-center justify-center">
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-[#795558]/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-[#795558]/20 rounded-full border-t-[#795558]"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40">
          Anna
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-[9px] font-black uppercase tracking-[0.5em] text-[#795558]/30"
      >
        Inspirando Arte
      </motion.p>
    </div>
  </div>
);


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
    currentPath.endsWith('Novo-Portfolio') ||
    currentPath.endsWith('Novo-Portfolio/');

  const isBriefing = currentPath.includes('/briefing');

  if (isBriefing) {
    return (
      <div className="min-h-screen bg-[#FCF6EF] antialiased md:cursor-none selection:bg-[#795558] selection:text-[#FCF6EF]">
        <CustomCursor />
        <Toaster position="top-center" />
        <Suspense fallback={<PageLoader />}>
          <BriefingPage />
        </Suspense>
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
      {/* Grain Overlay - Subtle Tactile Texture */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Global Ambient Glow - Subtle Interactive Layer */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#795558]/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#FFDAF0]/10 rounded-full blur-[150px]"
        />
      </div>

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

      <Suspense fallback={<PageLoader />}>
        {/* 1. The Hook (Hero) */}
        <Hero />

        {/* 2. Human Connection & Vision */}
        <About />

        {/* 3. Subtle Credibility Keywords */}
        <Marquee />

        {/* 4. Concrete Proof (Portfolio) */}
        <ProjectsSection />

        {/* 5. Interactive Differentiator (Creative Lab) */}
        <CreativeLab />

        {/* 6. Clear Value Proposal (Services) */}
        <ServicesList />

        {/* 7. Methodology & Transparency (Process) */}
        <CreativeProcess />

        {/* 8. Conversion Call (Contact) */}
        <Contact />

        <Footer />
      </Suspense>
    </div>
  );
}
