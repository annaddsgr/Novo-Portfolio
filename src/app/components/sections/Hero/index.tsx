import { useState, useEffect } from 'react';
import { HeroDesktop } from './HeroDesktop';
import { HeroMobile } from './HeroMobile';

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Media query matching standard mobile breakpoints (e.g. 768px for tablet/mobile split)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
