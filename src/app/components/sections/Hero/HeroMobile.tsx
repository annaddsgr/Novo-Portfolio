import { motion } from "motion/react";
import { Sparkles, ArrowRight, PenTool } from "lucide-react";
import { Magnetic } from '@/app/components/layout/Magnetic';

export function HeroMobile() {
  const scrollToContent = () => {
    document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#FCF6EF] py-12 px-6">
      {/* Reduced Background Atmosphere for Mobile Performance - Optimized */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Using CSS Radial Gradients instead of large blurs for better mobile performance */}
        <div className="absolute -top-[10%] -right-[10%] w-[70%] h-[40%] rounded-full bg-[#795558]/5 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[30%] rounded-full bg-[#FFDAF0]/20 blur-2xl opacity-50" />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#795558]/10 bg-white shadow-sm mb-8 mx-auto">
            <Sparkles className="w-3 h-3 text-[#795558] animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#795558]">Visual Strategist</span>
          </div>

          {/* Main Title - Vertical Layout */}
          <h1 className="font-serif text-[#795558] mb-8 relative">
            <span className="block text-5xl italic opacity-40 mb-[-10px]">Design</span>
            <span className="block text-6xl relative z-10 leading-tight">
              com alma
              <motion.div
                animate={{ rotate: [10, 15, 10], y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-6 opacity-20"
              >
                <PenTool className="w-12 h-12 text-[#795558]" />
              </motion.div>
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-lg text-[#795558]/60 font-serif italic leading-snug text-balance mb-10 px-4">
            "Transformo essências invisíveis em realidades visuais potentes."
          </p>

          {/* CTAs Stacked */}
          <div className="flex flex-col items-center gap-6">
            <Magnetic>
              <button
                onClick={scrollToContent}
                className="group relative px-8 py-4 bg-[#795558] text-white rounded-full overflow-hidden shadow-xl w-full max-w-[200px]"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <span className="font-black uppercase tracking-[0.2em] text-[9px]">Ver Portfólio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </Magnetic>

            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#795558]/40">
              Criação sob Medida
            </span>
          </div>
        </motion.div>
      </div>

      {/* Simple Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#795558]/30 to-transparent" />
      </motion.div>
    </section>
  );
}
