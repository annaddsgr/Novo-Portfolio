import { motion } from 'motion/react';
import { Sparkles, Heart, PenTool, Rocket, MessageCircle } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "A Escuta",
    subtitle: "Conectar & Sentir",
    description: "Antes de qualquer traço, preciso entender quem você é. Ouço o que não é dito e sinto a pulsação do seu sonho. É aqui que tudo nasce.",
    icon: <MessageCircle className="w-5 h-5 text-white" />,
    color: "#795558"
  },
  {
    id: "02",
    title: "A Imersão",
    subtitle: "Verdade & Essência",
    description: "Não busco apenas referências visuais, busco verdade. Mergulho no seu universo para encontrar a essência que torna sua história única.",
    icon: <Heart className="w-5 h-5 text-white" />,
    color: "#795558"
  },
  {
    id: "03",
    title: "A Tradução",
    subtitle: "Forma & Cor",
    description: "O momento em que sentimentos ganham forma. Com sensibilidade, traduzo sua essência em cores e símbolos que tocam a alma.",
    icon: <PenTool className="w-5 h-5 text-white" />,
    color: "#795558"
  },
  {
    id: "04",
    title: "O Voo",
    subtitle: "Propósito & Vida",
    description: "Refinamos cada detalhe com calma. Quando sua marca está pronta, ela não é apenas entregue; ela ganha vida e propósito no mundo.",
    icon: <Rocket className="w-5 h-5 text-white" />,
    color: "#795558"
  }
];

export function CreativeProcess() {
  return (
    <section id="processo" className="py-32 px-6 md:px-12 bg-[#FCF6EF]/50 relative overflow-hidden">
      {/* Delicate Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#795558]/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#795558]/3 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm border border-[#795558]/5 mb-8"
          >
            <Sparkles className="w-3 h-3 text-[#795558]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#795558]">Nossa Jornada</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-[#795558] mb-8 font-light"
          >
            Como construímos <span className="italic">juntos</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 font-light max-w-xl mx-auto italic"
          >
            Um caminho percorrido com calma, afeto e muita estratégia.
          </motion.p>
        </div>

        {/* The Staggered "Floating Path" */}
        <div className="relative space-y-24 md:space-y-0 md:h-[600px]">
          {/* Subtle connecting line for desktop */}
          <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 hidden lg:block pointer-events-none opacity-10" viewBox="0 0 1200 120">
            <path 
              d="M0,60 C200,10 400,110 600,60 C800,10 1000,110 1200,60" 
              fill="none" 
              stroke="#795558" 
              strokeWidth="1.5" 
              strokeDasharray="8 12"
            />
          </svg>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 h-full">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`flex flex-col items-center group
                  ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-24'}
                `}
              >
                {/* Step Circle with Icon */}
                <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                   {/* Animated Organic Background */}
                   <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(121,85,88,0.1)] group-hover:shadow-[0_40px_80px_-20px_rgba(121,85,88,0.2)] transition-all duration-700 border border-[#795558]/5 group-hover:rotate-6 rotate-[-4deg]"
                   />
                   
                   <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#795558] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-[-12deg] transition-all duration-500 mb-2">
                       {step.icon}
                    </div>
                    <span className="text-[10px] font-black text-[#795558]/20 tracking-widest">{step.id}</span>
                   </div>
                </div>

                {/* Content */}
                <div className="text-center px-4">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[#795558]/40 font-bold mb-2 block">{step.subtitle}</span>
                  <h3 className="text-2xl font-serif text-[#795558] mb-4 group-hover:italic transition-all duration-500">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Conclusion Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-40 text-center"
        >
          <div className="max-w-3xl mx-auto p-12 relative">
             <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white transition-all hover:bg-white/60 duration-700" />
             <div className="relative z-10 space-y-6">
                <Heart className="w-6 h-6 text-[#795558]/20 mx-auto" />
                <h3 className="text-3xl font-serif text-[#795558] font-light italic">
                  Um processo feito com a alma
                </h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Não acredito em fórmulas prontas. Cada marca é um jardim que precisa de um cuidado específico. 
                  Respeito o seu tempo e o das ideias, para que o resultado final floresça com verdade e autenticidade.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
