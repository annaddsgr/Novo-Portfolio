import { motion } from 'motion/react';

const steps = [
  {
    number: "01",
    title: "Descoberta",
    description: "Conversamos sobre seus objetivos, valores e público. Entendo profundamente o contexto do projeto e o que você precisa comunicar."
  },
  {
    number: "02",
    title: "Estratégia",
    description: "Desenvolvimento de conceitos visuais alinhados com sua identidade. Pesquiso referências e crio um direcionamento criativo sólido."
  },
  {
    number: "03",
    title: "Criação",
    description: "Transformo ideias em design. Exploro diversas possibilidades visuais até encontrar a solução mais autêntica e eficaz."
  },
  {
    number: "04",
    title: "Refinamento",
    description: "Ajustes finais com atenção aos detalhes. Garanto que cada elemento esteja no lugar certo antes da entrega final."
  }
];

export function ProcessSection() {
  return (
    <section id="processo" className="py-24 md:py-32 px-6 md:px-12 bg-[#FCF6EF]/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-light mb-4">
            Como eu trabalho
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#795558] leading-tight mb-6">
            Meu processo criativo
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Cada projeto é único, mas sigo uma metodologia pensada para garantir 
            resultados alinhados com suas expectativas.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-4 group"
            >
              {/* Number */}
              <div className="flex items-start gap-6">
                <span className="text-5xl md:text-6xl font-light text-[#FFDAF0] group-hover:text-[#795558] transition-colors duration-500">
                  {step.number}
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-light text-[#795558] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Divider line for visual flow */}
              {index < steps.length - 1 && (
                <div className="md:hidden w-12 h-px bg-gray-300 ml-12 mt-8" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 pt-12 border-t border-gray-200 text-center"
        >
          <p className="text-base text-gray-500 font-light italic max-w-2xl mx-auto">
            "Design é sobre intenção. Cada decisão visual tem um propósito, 
            e meu trabalho é garantir que tudo faça sentido."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
