import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto text-center py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Small intro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 font-light"
          >
            Designer Gráfica
          </motion.p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#795558] leading-tight">
            Transformando ideias em
            <br />
            <span className="italic font-normal">experiências visuais</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Criando identidades visuais que contam histórias autênticas e conectam marcas com pessoas.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <button
              onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-[#795558] text-white text-sm uppercase tracking-widest hover:bg-[#8A6B6D] transition-all duration-300"
            >
              Ver Projetos
            </button>
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border border-[#795558] text-[#795558] text-sm uppercase tracking-widest hover:bg-[#795558] hover:text-white transition-all duration-300"
            >
              Vamos Conversar
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-[#795558] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
