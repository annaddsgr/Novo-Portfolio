import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Palette, PenTool, Type, Sparkles } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Efeito Parallax suave para elementos flutuantes
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center justify-start overflow-hidden bg-[#FCF6EF] py-20"
    >
      {/* Background Decorative Shapes - "Never done before" style */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Organic Blob */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[10%] -right-[5%] w-[60%] h-[80%] bg-[#795558]/5 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 left-[-10%] w-[50%] h-[60%] bg-[#FFDAF0]/30 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Text Content - Asymmetric left alignment */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#795558] text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-8 shadow-lg">
              <Sparkles className="w-3 h-3" /> Designer & Estrategista
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-[#795558] leading-[1] md:leading-[0.9] mb-8 relative">
              <span className="block italic">Design</span>
              <span className="block relative">
                com alma
                <motion.div
                  className="absolute -right-8 -top-2 md:-right-12 lg:-right-20 md:-top-4 lg:-top-8 hidden xs:block"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <PenTool className="w-8 h-8 md:w-12 lg:w-20 md:h-12 lg:h-20 opacity-20" />
                </motion.div>
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-600 font-light max-w-xl leading-relaxed mb-12">
              Transformo o invisível em <span className="font-medium text-[#795558]">identidade</span>.
              Aqui, a estética não é apenas beleza, é uma conversa silenciosa entre sua marca e o mundo.
            </p>

            <div className="flex flex-wrap gap-6">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-10 py-5 bg-[#795558] text-white rounded-2xl overflow-hidden shadow-2xl transition-all"
              >
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-bold tracking-wide">Explorar Universo</span>
              </motion.button>

              <button
                onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-5 text-[#795558] font-medium border-b-2 border-[#795558]/20 hover:border-[#795558] transition-all"
              >
                Iniciar um diálogo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating "Moodboard" Elements - Refined composition */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative w-full h-[650px]">
            {/* Typography Asset - Moved to Top Left */}
            <motion.div
              style={{ y: y2, rotate: rotate }}
              className="absolute top-0 left-0 bg-white p-6 shadow-2xl rounded-full border border-gray-100 w-32 h-32 flex items-center justify-center z-10"
            >
              <Type className="w-12 h-12 text-[#795558]" />
              <div className="absolute -bottom-2 -right-2 bg-[#795558] text-white p-2 rounded-lg text-[8px] font-bold">
                Aa
              </div>
            </motion.div>

            {/* Graphic/Pen Sticker */}
            <motion.div
              style={{ y: y1, rotate: -10 }}
              className="absolute top-1/2 -left-12 bg-white p-5 shadow-2xl rounded-3xl border border-gray-100 w-24 h-24 flex items-center justify-center z-20"
            >
              <PenTool className="w-10 h-10 text-[#795558]" />
              <div className="absolute -top-2 -left-2 bg-[#FFDAF0] text-[#795558] p-1.5 rounded-full">
                <Sparkles className="w-3 h-3" />
              </div>
            </motion.div>

            {/* Color Palette Sticker - Normal / Static */}
            <div className="absolute top-0 -right-20 bg-white p-4 shadow-2xl rounded-3xl border border-gray-100 w-48 z-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Palette</span>
                <Palette className="w-3 h-3 text-gray-300" />
              </div>
              <div className="flex gap-2">
                <div className="w-full h-12 bg-[#795558] rounded-xl shadow-sm" />
                <div className="w-full h-12 bg-[#FCF6EF] rounded-xl border border-gray-100 shadow-sm" />
                <div className="w-full h-12 bg-[#FFDAF0] rounded-xl shadow-sm" />
              </div>
            </div>

            {/* Editorial "Identity" Composition - Sophisticated & Minimalist */}
            <motion.div
              initial={{ rotate: -2, opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="absolute bottom-0 right-0 w-80 h-[480px] z-0 flex items-center justify-center p-4"
            >
              {/* Main Editorial Card */}
              <div className="relative w-full h-full bg-[#FCF6EF] rounded-2xl shadow-[40px_40px_80px_rgba(121,85,88,0.12)] border border-white/50 overflow-hidden flex flex-col p-10 justify-between">
                {/* Silk Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#795558]/40 italic">Edition 2026</span>
                  <Sparkles className="w-5 h-5 text-[#795558]/20" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-[12rem] font-serif italic text-[#795558]/5 absolute -top-24 -left-10 select-none">A</h2>
                  <p className="text-4xl font-serif text-[#795558] leading-tight relative">
                    Anna <br /> <span className="italic font-light">Design</span>
                  </p>
                  <div className="w-12 h-[1px] bg-[#795558]/30 my-6" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] leading-relaxed">
                    Transformando visões em <br /> legados visuais potentes.
                  </p>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#795558]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFDAF0]" />
                    <div className="w-2 h-2 rounded-full bg-white border border-gray-100" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-300 uppercase">#VisualStrategy</span>
                </div>
              </div>

              {/* Floating "Authenticity" Seal */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-12 -right-12 w-32 h-32 flex items-center justify-center z-20"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#795558]/10 fill-current animate-spin-slow">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[8px] uppercase tracking-[0.2em] font-bold">
                    <textPath xlinkHref="#circlePath">
                      Curadoria Visual • Estratégia de Marca • Design com Alma •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#795558] rounded-full" />
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Squiggle (SVG simulation) */}
            <svg className="absolute top-1/2 left-1/4 w-32 h-32 text-[#795558]/10 -z-10" viewBox="0 0 100 100">
              <path d="M10 50 Q 25 25, 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#795558] cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Scroll</span>
          <ChevronDown size={24} className="opacity-40" />
        </div>
      </motion.button>
    </section>
  );
}
