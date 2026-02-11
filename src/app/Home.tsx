import { useEffect, Suspense } from 'react';
import { motion, useScroll } from 'motion/react';
import { Toaster } from 'sonner';
import { useLocation } from 'react-router-dom';

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
import { CreativeLab } from './components/sections/CreativeLab';
import { PageLoader } from './components/layout/PageLoader';

export function Home() {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  useEffect(() => {
    // Check for hash or state to scroll to section
    if (location.state && location.state.scrollTo) {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else {
         // Only scroll to top if we are not scrolling to a section
         if (!location.hash) {
            window.scrollTo(0, 0);
         }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#FCF6EF] antialiased md:cursor-none selection:bg-[#795558] selection:text-[#FCF6EF]">


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
