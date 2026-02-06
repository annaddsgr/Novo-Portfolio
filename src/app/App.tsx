import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/ProjectsSection';
import { CreativeProcess } from './components/CreativeProcess';
import { ServicesList } from './components/ServicesList';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Marquee } from './components/Marquee';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased cursor-none">
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
      <CreativeProcess />
      <ServicesList />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
