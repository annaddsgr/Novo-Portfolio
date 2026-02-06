import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFDAF0] via-[#FCF6EF] to-[#795558]">
      {/* Organic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img 
          src={`${import.meta.env.BASE_URL}assets/organic_shape_wave.png`}
          alt=""
          className="absolute bottom-[10%] right-[-5%] w-[35%] opacity-15 mix-blend-multiply"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>



      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#795558] mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Design com intenção,<br /> estética com significado.
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl lg:text-3xl text-[#5A4547] mb-8 md:mb-10 font-light max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crio marcas que respiram e conectam, respeitando a verdade de cada história. 
            Não é apenas visual, é uma escolha consciente.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("projetos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-[#795558] text-white rounded-full hover:bg-[#5A3D3F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Conheça meu trabalho
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contato")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-transparent border-2 border-[#795558] text-[#795558] rounded-full hover:bg-[#795558] hover:text-white transition-all duration-300"
            >
              Vamos conversar?
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}
