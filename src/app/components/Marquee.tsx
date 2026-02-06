import { motion } from 'motion/react';

export function Marquee() {
  const words = [
    "IDENTIDADE VISUAL", "POSICIONAMENTO", "WEB DESIGN", "DIREÇÃO DE ARTE", "NAMING",
    "IDENTIDADE VISUAL", "POSICIONAMENTO", "WEB DESIGN", "DIREÇÃO DE ARTE", "NAMING"
  ];

  return (
    <div className="bg-[#795558] py-6 overflow-hidden relative z-20 border-y border-[#FCF6EF]/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {/* Repetir várias vezes para garantir o loop infinito suave */}
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-[#FCF6EF] font-serif text-lg md:text-xl tracking-[0.2em] font-light opacity-90 whitespace-nowrap">
                {word}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8DCCA] opacity-50 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
