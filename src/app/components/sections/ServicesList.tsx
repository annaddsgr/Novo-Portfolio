import { motion } from 'motion/react';
import { PenTool, Instagram, Monitor, Printer, Sparkles, Heart } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: "Identidade Visual",
    subtitle: "Alma & Essência",
    description: "Criação de marcas que contam histórias. Do logotipo à paleta de cores, tudo é desenhado para tocar o coração.",
  },
  {
    icon: Instagram,
    title: "Social Design",
    subtitle: "Conexão & Estética",
    description: "Design estratégico para suas redes sociais. Um feed harmônico que comunica autoridade com leveza.",
  },
  {
    icon: Monitor,
    title: "Web Experience",
    subtitle: "Fluidez & Design",
    description: "Landing pages e sites delicados, focados na experiência do usuário e na beleza dos detalhes.",
  },
  {
    icon: Printer,
    title: "Papelaria Premium",
    subtitle: "Tato & Presença",
    description: "O toque físico da sua marca: cartões, embalagens e mimos que criam uma experiência inesquecível.",
  }
];

export function ServicesList() {
  return (
    <section id="servicos" className="py-16 md:py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCF6EF] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#795558]/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Heart className="w-3 h-3 text-[#795558]/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#795558]/60 font-bold">Especialidades</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-serif text-[#795558] mb-6 font-light"
          >
            Como posso te <span className="italic">ajudar</span>?
          </motion.h2>

          <div className="w-12 h-[1.5px] bg-[#795558]/20 mx-auto" />
        </div>

        {/* Clean, Delicate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex items-start gap-8 group"
            >
              <div className="shrink-0 relative">
                <div className="w-16 h-16 bg-[#FCF6EF] rounded-2xl flex items-center justify-center text-[#795558] relative z-10 group-hover:bg-[#795558] group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="absolute inset-0 bg-[#795558]/5 rounded-2xl translate-x-2 translate-y-2 -z-0 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#795558]/40 font-bold block mb-2">{service.subtitle}</span>
                <h3 className="text-2xl font-serif text-[#795558] mb-4 group-hover:text-[#5A3D3F] transition-colors leading-none">
                  {service.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm max-w-sm">
                  {service.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  className="h-[1px] bg-[#795558]/5 mt-8"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-4 group"
          >
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#795558] opacity-60 group-hover:opacity-100 transition-all">
              Ver todos os detalhes
            </span>
            <div className="p-3 rounded-full bg-[#FCF6EF] text-[#795558] group-hover:bg-[#795558] group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
              <Sparkles className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
