import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Palette, PenTool, Type, Sparkles, ArrowRight } from "lucide-react";
import { Magnetic } from '@/app/components/layout/Magnetic';

export function HeroDesktop() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Advanced Parallax & Kinetic Transforms
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -250]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateSlower = useTransform(scrollY, [0, 500], [0, 15]);

  const scrollToContent = () => {
    document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#FCF6EF]"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[5%] -right-[5%] w-[70%] h-[90%] bg-[#795558]/5 rounded-full blur-[140px] mix-blend-multiply"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[70%] bg-[#FFDAF0]/20 rounded-full blur-[120px]"
        />

        {/* Editorial Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/3 w-[1px] h-full bg-[#795558]" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#795558]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 w-full grid grid-cols-12 gap-12 items-center relative z-10">

        {/* Text Content: The Manifesto */}
        <div className="col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#795558]/10 bg-white shadow-sm mb-10 origin-left">
              <Sparkles className="w-3.5 h-3.5 text-[#795558] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#795558]">Visual Strategist & Designer</span>
            </div>

            <h1 className="text-8xl lg:text-9xl font-serif text-[#795558] leading-[0.85] mb-12 tracking-tight">
              <span className="block italic opacity-40">Design</span>
              <span className="block relative">
                com alma
                <motion.div
                  animate={{
                    rotate: [15, 20, 15],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 -top-8 block"
                >
                  <PenTool className="w-24 h-24 text-[#795558]/10" />
                </motion.div>
              </span>
            </h1>

            <div className="max-w-xl space-y-12">
              <p className="text-3xl text-[#795558]/60 font-serif italic leading-tight text-balance">
                "Transformo essências invisíveis em realidades visuais potentes e intencionais."
              </p>

              <div className="flex flex-row items-center gap-8">
                <Magnetic>
                  <button
                    onClick={scrollToContent}
                    className="group relative px-10 py-5 bg-[#795558] text-white rounded-full overflow-hidden shadow-2xl transition-all"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 relative z-10">
                      <span className="font-black uppercase tracking-[0.2em] text-[10px]">Ver Portfólio</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Magnetic>

                <div className="flex items-center gap-4 text-[#795558]/40">
                  <div className="w-8 h-[1px] bg-current" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Criação sob Medida</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The Artistic Composition */}
        <div className="col-span-5 relative h-[700px]">
          {/* Kinetic Stickers Layer */}
          <motion.div
            style={{ y: y1, rotate: rotateSlower }}
            className="absolute top-20 right-0 z-20 scale-100"
          >
            <div className="bg-white p-6 rounded-[2.2rem] shadow-2xl border border-[#795558]/5 flex flex-col gap-4 w-40">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black uppercase text-gray-300 tracking-widest">Type</span>
                <Type className="w-3 h-3 text-[#795558]/20" />
              </div>
              <div className="text-4xl font-serif text-[#795558] italic">Aa</div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2, rotate: -5 }}
            className="absolute bottom-40 -left-10 z-20 scale-100"
          >
            <div className="bg-[#FFDAF0] p-6 rounded-full shadow-2xl border-4 border-white flex items-center justify-center w-32 h-32 rotate-12">
              <Palette className="w-12 h-12 text-[#795558]" />
            </div>
          </motion.div>

          {/* Central Editorial Piece */}
          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] aspect-[4/5] z-10"
          >
            <div className="w-full h-full bg-[#FCF6EF] rounded-[3rem] shadow-[40px_80px_120px_-20px_rgba(121,85,88,0.25)] border-[1.5rem] border-white overflow-hidden flex flex-col p-12 relative group cursor-none">
              {/* Internal Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              <div className="relative z-10 flex justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#795558]/40 italic">Vol. 01</span>
                <Sparkles className="w-4 h-4 text-[#795558]/20" />
              </div>

              <div className="mt-auto relative z-10 space-y-6">
                <h2 className="text-7xl font-serif text-[#795558] italic leading-tight">A.</h2>
                <div className="w-16 h-[2px] bg-[#795558]/10" />
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#795558]/40 leading-relaxed">
                  Curadoria Visual <br /> & Estratégia
                </p>
              </div>

              {/* Liquid Interaction Layer inside card */}
              <div className="absolute inset-0 bg-[#795558]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Decorative Circle Script */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#795558]/5 fill-current">
                <path id="heroPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="text-[7.5px] uppercase tracking-[0.3em] font-black">
                  <textPath xlinkHref="#heroPath">
                    • Identidade Visual • Design com Alma • Estratégia de Marca •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#795558]/30 rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#795558]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
