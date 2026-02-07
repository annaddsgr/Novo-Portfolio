import { motion } from 'motion/react';

export function Marquee() {
  const items = [
    "IDENTIDADE VISUAL", "ESTRATÉGIA", "MINIMALISMO", "DIREÇÃO DE ARTE", "NAMING", "DESIGNER",
  ];

  return (
    <div className="relative py-16 overflow-hidden bg-white border-y border-[#795558]/5">
      {/* Upper row - Bold solid */}
      <div className="flex whitespace-nowrap mb-6">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {Array(10).fill(items).flat().map((item, i) => (
            <span key={i} className="text-[#795558]/30 font-serif text-xl md:text-2xl font-light uppercase tracking-[0.4em] px-4 italic">
              {item} <span className="text-[#FFDAF0]/60 mx-4">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Lower row - Subtle and different direction */}
      <div className="flex whitespace-nowrap opacity-20">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          {Array(10).fill(items).flat().map((item, i) => (
            <span key={i} className="text-[#795558] font-sans text-xs md:text-sm font-black uppercase tracking-[0.6em] px-4">
              {item} <span className="text-[#795558] mx-4 opacity-50">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
