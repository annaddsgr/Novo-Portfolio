import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/features/figma/ImageWithFallback';
import { Sparkles, Palette, Lightbulb } from 'lucide-react';
import { getImagePath } from '@/app/utils/imagePath';

export function AboutDesktop() {
  return (
    <section id="sobre" className="py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden relative">
      {/* Editorial Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#795558]" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-[#795558]" />
      </div>

      <div className="absolute top-10 md:top-20 right-[-15%] md:right-[-5%] text-[20rem] md:text-[45rem] font-serif text-[#795558]/5 pointer-events-none select-none leading-none italic font-light">
        A
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Left Column: Image with Offset Frame */}
          <div className="col-span-12 lg:col-span-5 relative order-1 lg:order-1 pt-8 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative aspect-[4/5] w-full max-w-[260px] sm:max-w-sm mx-auto group"
            >
              {/* Outer Frame Art */}
              <div className="absolute -inset-3 sm:-inset-6 border border-[#795558]/10 rounded-3xl translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />

              <div className="absolute inset-0 bg-white shadow-[0_30px_60px_-10px_rgba(121,85,88,0.2)] overflow-hidden rounded-2xl border-4 border-white z-20">
                <ImageWithFallback
                  src={getImagePath('assets/profile_anna.jpg')}
                  alt="Anna - Designer Gráfico"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              {/* Signature Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-6 sm:-bottom-12 -right-4 sm:-right-8 lg:-left-8 lg:right-auto bg-[#FCF6EF] p-4 sm:p-8 rounded-full shadow-2xl z-30 flex items-center justify-center border border-[#795558]/10 group"
              >
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#795558] flex items-center justify-center text-white mb-1 sm:mb-2 group-hover:rotate-12 transition-transform duration-500">
                    <Sparkles className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#795558] text-center">Essência</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="col-span-12 lg:col-span-7 space-y-10 lg:space-y-16 order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8 md:space-y-10"
            >
              <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="h-[1px] md:h-[1.5px] w-8 md:w-12 bg-[#795558]/20" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#795558]/40 italic">Since 2019</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-[#795558] leading-[1.1]">
                  Olá, muito <br /> <span className="italic font-light opacity-80">prazer</span>.
                </h2>
              </div>

              <div className="space-y-6 md:space-y-8 text-[#795558]/70 font-light leading-relaxed text-balance text-left">
                <p className="text-2xl font-serif italic border-l-2 border-[#795558]/10 pl-8">
                  Sou uma designer gráfica apaixonada por criar conexões visuais significativas.
                  Trabalho além da estética — busco a alma de cada projeto.
                </p>
                <div className="space-y-6 text-lg">
                  <p>
                    Com anos de imersão no universo visual, aprendi que o design excepcional nasce do equilíbrio entre intuição e estratégia. Não entrego apenas imagens; construo pontes entre propósitos e resultados.
                  </p>
                  <p>
                    Meu compromisso é com a autenticidade. Em um mundo saturado de ruídos, a clareza visual e a elegância são os maiores diferenciais que uma marca pode ter.
                  </p>
                </div>
              </div>

              {/* Strategic Framework */}
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-[#795558]/10">
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#795558]/5 flex items-center justify-center text-[#795558]">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#795558]">Missão</h4>
                  </div>
                  <p className="text-[13px] text-[#795558]/60 font-light leading-relaxed">
                    Transformar essências em identidades potentes, unindo criatividade e estratégia.
                  </p>
                </div>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#795558]/5 flex items-center justify-center text-[#795558]">
                      <Palette className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#795558]">Visão</h4>
                  </div>
                  <p className="text-[13px] text-[#795558]/60 font-light leading-relaxed">
                    Ser a referência em design que conecta marcas a corações de forma autêntica.
                  </p>
                </div>
              </div>

              {/* Creative Tags - Soft & Elegant */}
              <div className="flex flex-wrap gap-3 pt-6 justify-start">
                {["Minimalismo", "Estratégia", "Curadoria", "Propósito"].map((tag, i) => (
                  <span key={i} className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#795558]/40 border border-[#795558]/10 px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
