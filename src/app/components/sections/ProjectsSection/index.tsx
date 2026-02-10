import { useState, useEffect } from 'react';
import { ProjectsDesktop } from './ProjectsDesktop';
import { ProjectsMobile } from './ProjectsMobile';

export function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <ProjectsMobile /> : <ProjectsDesktop />;
}  
