import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a forma de pagamento?",
    answer: "Trabalho com 30% de entrada para reserva de data e início do projeto, e o restante pode ser parcelado no cartão de crédito ou pago via PIX na entrega final. Tudo documentado em contrato para segurança de ambos."
  },
  {
    question: "Qual é o prazo médio de entrega?",
    answer: "Para identidades visuais completas, o prazo médio é de 20 a 30 dias úteis após a resposta do briefing. Projetos menores ou pontuais podem variar entre 7 a 15 dias. Prezamos pela qualidade e cada etapa tem seu tempo de maturação."
  },
  {
    question: "Como funcionam as alterações?",
    answer: "O orçamento contempla até 3 rodadas de alterações (refações) por etapa. Para otimizar o processo e garantir o prazo, peço sempre que compile todas as suas observações de uma única vez. Solicitações extras ou enviadas de forma fracionada após a aprovação da etapa estarão sujeitas a taxa adicional."
  },
  {
    question: "O que preciso ter para começar?",
    answer: "Apenas responder ao nosso briefing (aquele formulário detalhado) com atenção. Se você já tiver fotos profissionais ou textos para o site/posts, ajuda muito, mas não é obrigatório para iniciar a criação da marca."
  },
  {
    question: "Você entrega os arquivos editáveis?",
    answer: "Sim! Ao final do projeto você recebe uma pasta completa com os logotipos em diversos formatos (PNG, JPG, PDF, EPS/AI), paleta de cores, tipografias e o manual da marca. Tudo o que você precisa para aplicar sua marca em qualquer lugar."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Abstract Background Ornaments */}
      <div className="absolute top-20 right-[-5%] w-80 h-80 bg-[#FCF6EF] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[-5%] w-64 h-64 bg-[#795558]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#795558]/5 border border-[#795558]/10 mb-8"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#795558]/60" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#795558]/60">Tire suas dúvidas</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-serif text-[#795558] mb-6 font-light"
          >
            Perguntas <span className="italic">Frequentes</span>
          </motion.h2>
          
          <div className="w-12 h-[1.5px] bg-[#795558]/20 mx-auto" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className={`transition-all duration-500 rounded-[2.5rem] border ${
                  openIndex === index 
                    ? 'border-[#795558]/20 bg-[#FCF6EF]/30 shadow-lg' 
                    : 'border-[#795558]/5 bg-white hover:border-[#795558]/20 hover:bg-[#FAF9F6]'
                } overflow-hidden`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-serif transition-colors duration-500 ${
                    openIndex === index ? 'text-[#795558]' : 'text-[#795558]/80'
                  }`}>
                    {index + 1}. {faq.question}
                  </span>
                  
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    openIndex === index 
                      ? 'bg-[#795558] text-white border-transparent' 
                      : 'bg-white text-[#795558] border-[#795558]/10 group-hover:bg-[#795558] group-hover:text-white'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 transition-transform duration-500 rotate-180" />
                    ) : (
                      <Plus className="w-5 h-5 transition-transform duration-500" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-gray-500 font-light leading-relaxed text-base border-t border-[#795558]/5 pt-6 max-w-2xl italic">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-10 bg-[#FCF6EF]/40 backdrop-blur-sm rounded-[3rem] border border-white shadow-sm">
             <MessageCircle className="w-6 h-6 text-[#795558]/30 mx-auto mb-6" />
             <p className="text-[#795558]/70 font-light mb-8 italic">Ainda tem alguma dúvida específica?</p>
             <button 
                onClick={() => window.open('https://wa.me/5531992781019', '_blank')}
                className="text-xs font-black uppercase tracking-[0.4em] text-[#795558] hover:bg-[#795558] hover:text-white px-8 py-4 border border-[#795558]/20 rounded-full transition-all duration-500"
             >
                Me chama no WhatsApp
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
