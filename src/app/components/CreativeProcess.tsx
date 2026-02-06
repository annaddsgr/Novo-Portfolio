import { motion } from 'motion/react';

const steps = [
  {
    id: "01",
    title: "A Escuta",
    description: "Antes de qualquer traço, preciso entender quem você é. Ouço o que não é dito e sinto a pulsação do seu sonho. É aqui que tudo nasce.",
    color: "#795558"
  },
  {
    id: "02",
    title: "A Imersão",
    description: "Não busco apenas referências visuais, busco verdade. Mergulho no seu universo para encontrar a essência que torna sua história única.",
    color: "#795558"
  },
  {
    id: "03",
    title: "A Tradução",
    description: "O momento em que sentimentos ganham forma. Com sensibilidade, traduzo sua essência em cores e símbolos que tocam a alma.",
    color: "#795558"
  },
  {
    id: "04",
    title: "O Voo",
    description: "Refinamos cada detalhe com calma. Quando sua marca está pronta, ela não é apenas entregue; ela ganha vida e propósito no mundo.",
    color: "#795558"
  }
];

export function CreativeProcess() {
  return (
    <section id="processo" className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
          <motion.img 
             src={`${import.meta.env.BASE_URL}assets/organic_shape_wave.png`}
             alt=""
             className="absolute top-0 right-[-10%] w-[40%] opacity-20 -rotate-12 mix-blend-multiply"
             animate={{ rotate: [-12, -10, -14, -12] }}
             transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#795558] mb-6">
            Como construímos juntos
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
             Mais que um método, um diálogo. Respeito o tempo de maturação das ideias para criar algo que tenha raízes profundas.
          </p>
        </motion.div>

        <div className="relative">


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Number Circle */}
                <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                  <motion.img 
                    src={`${import.meta.env.BASE_URL}assets/organic_shape_circle.png`} 
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-multiply"
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-3xl font-serif text-[#795558] font-bold z-10">
                    {step.id}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#795558] mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="inline-block relative p-8 md:p-12">
            <div className="absolute inset-0 bg-[#FCF6EF] rounded-[2rem] -rotate-1 transform transition-transform duration-500 hover:rotate-0" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif text-[#795558] mb-4">
                Cada projeto é único
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                Sua história não cabe em uma caixa. Por isso, adapto meu olhar para o que você realmente precisa, 
                garantindo que o resultado final seja uma extensão autêntica de quem você é.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
