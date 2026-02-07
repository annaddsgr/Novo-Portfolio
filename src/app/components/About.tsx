import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, Palette, Lightbulb, MousePointer2 } from 'lucide-react';

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-40 px-6 md:px-12 bg-white overflow-hidden relative">
      {/* Background Large Typography - "Watermark" style */}
      <div className="absolute top-20 right-[-5%] text-[20rem] md:text-[40rem] font-serif text-[#795558]/5 pointer-events-none select-none leading-none">
        A
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Image - Rectangular Portait */}
          <div className="col-span-12 lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-sm mx-auto z-20 group"
            >
              <div
                className="absolute inset-0 bg-white shadow-2xl overflow-hidden rounded-[2rem] border-8 border-white group"
              >
                <img
                  src="/assets/profile_anna.jpg"
                  alt="Anna - Designer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 text-[#795558] flex flex-col gap-1 items-start z-30">
                <Sparkles className="w-4 h-4" />
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Curadoria<br />Visual</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Original Story Content */}
          <div className="col-span-12 lg:col-span-7 pt-10 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-serif text-[#795558] leading-tight">
                  Olá, muito <span className="italic font-light">prazer</span>.
                </h2>
                <div className="space-y-6 text-gray-500 font-light leading-relaxed max-w-2xl">
                  <p className="text-xl md:text-2xl">
                    Sou uma designer gráfica apaixonada por criar conexões visuais significativas.
                    Meu trabalho vai além da estética — busco entender profundamente cada projeto
                    para criar soluções que realmente façam sentido.
                  </p>
                  <p className="text-lg">
                    Com mais de 5 anos de experiência, tenho o privilégio de trabalhar com marcas
                    que valorizam autenticidade e qualidade. Acredito que bom design é aquele que
                    comunica com clareza e toca as pessoas.
                  </p>
                </div>
              </div>

              {/* Bio Highlights */}
              <div className="flex flex-wrap gap-4">
                {[
                  { text: "Minimalismo Intencional", icon: Palette },
                  { text: "Design Estratégico", icon: Lightbulb },
                  { text: "Curadoria de Alma", icon: Sparkles },
                  { text: "Processo Artesanal", icon: MousePointer2 }
                ].map((tag, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="px-6 py-3 bg-[#795558]/5 border border-[#795558]/10 rounded-full flex items-center gap-3 text-[#795558] cursor-default"
                  >
                    <tag.icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{tag.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
