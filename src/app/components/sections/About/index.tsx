import { useState, useEffect } from 'react';
import { AboutDesktop } from './AboutDesktop';
import { AboutMobile } from './AboutMobile';

export function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <AboutMobile /> : <AboutDesktop />;
}
