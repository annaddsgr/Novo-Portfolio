import { motion } from 'motion/react';

export function Marquee() {
  const items = [
    "IDENTIDADE VISUAL", "ESTRATÉGIA", "MINIMALISMO", "DIREÇÃO DE ARTE", "NAMING", "DESIGNER",
  ];

  return (
    <div className="relative py-12 overflow-hidden bg-[#FCF6EF]">
      {/* Upper row - Bold solid */}
      <div className="flex whitespace-nowrap mb-4">
        <motion.div
          className="flex gap-4 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {Array(10).fill(items).flat().map((item, i) => (
            <span key={i} className="text-[#795558] font-serif text-5xl md:text-7xl font-bold tracking-tighter px-4">
              {item} <span className="text-[#FFDAF0]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Lower row - Outline text, opposite direction */}
      <div className="flex whitespace-nowrap translate-x-[-100px]">
        <motion.div
          className="flex gap-4 items-center"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {Array(10).fill(items).flat().map((item, i) => (
            <span key={i} className="text-transparent font-serif text-5xl md:text-7xl font-bold tracking-tighter px-4" 
                  style={{ WebkitTextStroke: '1px #795558' }}>
              {item} <span className="text-[#FFDAF0]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
