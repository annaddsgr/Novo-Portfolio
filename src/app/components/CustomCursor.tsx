import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#795558] pointer-events-none z-[9999] hidden md:block" // Increased z-index to ensure visibility
      animate={{
        x: mousePosition.x - 6, // center the 12px (w-3) dot
        y: mousePosition.y - 6,
        scale: isHovering ? 1.5 : 1, // Subtle scale only
      }}
      transition={{
        type: "spring",
        stiffness: 500, // Stiffer for less "lag"/wobbly feel (buggy feel)
        damping: 28,
        mass: 0.5
      }}
    />
  );
}
