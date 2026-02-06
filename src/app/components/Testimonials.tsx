import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sinara",
    role: "Alegria Doce Ateliê",
    content: "Eu tinha medo de fazer o rebranding e perder a essência da minha loja, mas a Anna conseguiu captar exatamente o que eu queria transmitir. Ficou sofisticado, mas sem perder o acolhimento que minhas clientes amam.",
    initials: "S"
  },
  {
    name: "Dra. Juliana Costa",
    role: "Harmmonize Clínica",
    content: "Profissionalismo impecável. O manual de marca que ela entregou facilitou muito a vida da minha equipe. Agora temos consistência em todos os posts e materiais impressos. Recomendo de olhos fechados.",
    initials: "JC"
  },
//   {
//     name: "Thaise Andrade",
//     role: "Lash Designer",
//     content: "O carrossel que ela criou não foi só bonito, foi estratégico. Aumentou muito minha percepção de valor com as clientes novas. A Anna tem um olhar que vai além do design, ela entende de posicionamento.",
//     initials: "TA"
//   }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#FCF6EF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#795558]/60 mb-2 block">
            O que dizem por aí
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#795558]">
            Marcas que transformamos
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8DCCA]/50 hover:shadow-md transition-all duration-300 relative group flex-1 max-w-md"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-[#E8DCCA]/50 group-hover:text-[#FFDAF0] transition-colors duration-300">
                <Quote className="w-10 h-10 rotate-180" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-[#795558]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 font-light leading-relaxed mb-8 relative z-10 italic">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#795558]/5">
                <div className="w-12 h-12 rounded-full bg-[#E8DCCA] text-[#795558] flex items-center justify-center font-serif text-lg font-bold">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-[#795558] font-bold text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
