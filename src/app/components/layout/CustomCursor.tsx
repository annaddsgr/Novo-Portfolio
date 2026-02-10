import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [clickScale, setClickScale] = useState(1);
  const [cursorText, setCursorText] = useState<string | null>(null);

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
      
      // Text detection logic
      const textTarget = target.closest('[data-cursor-text]');
      if (textTarget) {
          setCursorText(textTarget.getAttribute('data-cursor-text'));
          setIsHovering(true);
          return;
      } else {
          setCursorText(null);
      }

      // Standard hover detection
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
      {/* Kinetic Core - Always visible */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#795558]/80 pointer-events-none z-[10001] hidden md:block mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering && cursorText ? 0 : clickScale, // Hide core if text is overlapping
        }}
      />

      {/* Liquid Aura - Adaptive */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#795558]/30 pointer-events-none z-[20000] hidden md:flex items-center justify-center pointer-events-none backdrop-blur-[1px]"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 80 : isHovering ? 60 : 40,
          height: cursorText ? 80 : isHovering ? 60 : 40,
          backgroundColor: cursorText ? '#795558' : isHovering ? 'rgba(121, 85, 88, 0.05)' : 'rgba(121, 85, 88, 0)',
          borderWidth: cursorText ? '0px' : isHovering ? '0px' : '1px',
          scale: clickScale
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150
        }}
      >
        <AnimatePresence>
            {cursorText && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[#FCF6EF] text-[10px] font-black uppercase tracking-widest text-center leading-none"
                >
                    {cursorText}
                </motion.span>
            )}
        </AnimatePresence>
      </motion.div>

      {/* Legacy Hover Text Hint - Kept for specific non-data-attr cases if any */}
      <AnimatePresence>
        {isHovering && !cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-0 left-0 pointer-events-none z-[20002] hidden md:flex items-center justify-center"
            style={{
              x: auraX,
              y: auraY,
              translateX: '30px',
              translateY: '30px',
            }}
          >
            <div className="w-1 h-1 bg-[#795558] rounded-full animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
