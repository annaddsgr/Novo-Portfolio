import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

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
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <span className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#795558]/60 mb-2">
            <HelpCircle className="w-4 h-4" /> Dúvidas Comuns
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#795558]">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-[#E8DCCA] rounded-2xl overflow-hidden hover:border-[#795558]/30 transition-colors bg-[#FCF6EF]/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-[#795558] pr-8">
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-colors duration-300 ${openIndex === index ? 'bg-[#795558] text-white' : 'bg-[#E8DCCA]/50 text-[#795558]'}`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed border-t border-[#E8DCCA]/30 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
