import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [clickScale, setClickScale] = useState(1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const auraX = useSpring(mouseX, springConfig);
  const auraY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setClickScale(0.8);
    const handleMouseUp = () => setClickScale(1);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Kinetic Core */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#795558] pointer-events-none z-[10001] hidden md:block mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : clickScale,
        }}
      />

      {/* Liquid Aura */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#795558]/30 pointer-events-none z-[10000] hidden md:block"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(121, 85, 88, 0.05)' : 'rgba(121, 85, 88, 0)',
          borderWidth: isHovering ? '0px' : '1px'
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150
        }}
      />

      {/* Hover Text Hint (Optional/Contextual) */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-0 left-0 pointer-events-none z-[10002] hidden md:flex items-center justify-center"
            style={{
              x: auraX,
              y: auraY,
              translateX: '20px',
              translateY: '20px',
            }}
          >
            <div className="w-1 h-1 bg-[#795558] rounded-full animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

