import { useState } from "react";
import { motion } from "motion/react";
import { Lightbulb, ArrowUpRight, Sparkles, Target, Zap, Clock, MessageSquare } from "lucide-react";
import { InsightModal, Insight } from "./InsightModal";

const insights: Insight[] = [
  {
    title: "A Psicologia das Cores no Varejo",
    description: "Por que o azul transmite confiança e o laranja desperta urgência? Entenda como usar cores para vender mais.",
    image: "assets/recanto_colors.png",
    icon: <Target className="w-5 h-5" />,
    tag: "Estratégia",
    date: "15 Jan 2024",
    author: "Anna",
    readingTime: "4 min",
    content: `
      <p>As cores não são apenas estéticas; elas são gatilhos biológicos. No varejo, cada tonalidade tem um papel fundamental na jornada de decisão do cliente.</p>
      <div class="my-8 rounded-2xl overflow-hidden border border-[#795558]/10 shadow-lg bg-white">
        <img src="assets/recanto_colors.png" alt="Paleta de Cores" class="w-full h-auto object-cover" />
        <p class="text-[10px] uppercase tracking-widest p-4 bg-gray-50 text-gray-400 text-center">Exemplo de aplicação: Recanto do Sabor</p>
      </div>
      <p><strong>Azul:</strong> Transmite autoridade, confiança e estabilidade. É ideal para marcas que desejam fidelizar a longo prazo.</p>
      <p><strong>Laranja:</strong> Cria um senso de pressa e valor acessível. É a cor perfeita para promoções rápidas e varejo de massa.</p>
      <p>O segredo não está apenas em escolher a cor, mas em calibrar o <strong>contraste</strong> para guiar o olhar do cliente para o botão de compra.</p>
    `
  },
  {
    title: "Design Minimalista ≠ Design Simples",
    description: "O minimalismo é sobre remover o excesso para destacar o essencial. Menos ruído, mais clareza de mensagem.",
    image: "assets/hero_abstract.png",
    icon: <Sparkles className="w-5 h-5" />,
    tag: "Conceito",
    date: "28 Jan 2024",
    author: "Anna",
    readingTime: "3 min",
    content: `
      <p>Muitas pessoas confundem minimalismo com falta de elementos. Na verdade, ser minimalista é ser <strong>intencional</strong>.</p>
      <div class="my-8 rounded-2xl overflow-hidden border border-[#795558]/10 shadow-lg bg-white">
        <img src="assets/hero_abstract.png" alt="Minimalismo Conceitual" class="w-full h-auto object-cover" />
      </div>
      <p>Em um mundo saturado de informação, a marca que consegue ser clara e direta ganha a atenção. O 'espaço em branco' (white space) não é vazio; é ferramenta de respiro e luxo.</p>
      <p>Quando removemos o ruído gráfico, o que sobra é a essência da mensagem. Isso gera elegância e facilita a compreensão do seu serviço pelo cliente.</p>
    `
  },
  {
    title: "O Impacto do Primeiro Segundo",
    description: "Sua marca tem menos de 1 segundo para causar uma boa impressão digital. O design é sua linha de frente.",
    image: "assets/organic_shape_circle.png",
    icon: <Zap className="w-5 h-5" />,
    tag: "Performance",
    date: "02 Fev 2024",
    author: "Anna",
    readingTime: "5 min",
    content: `
      <p>O julgamento de valor na internet acontece em frações de segundo. Se o seu site ou feed parece amador, o cliente presume que seu serviço também é.</p>
      <div class="my-8 rounded-2xl overflow-hidden border border-[#795558]/10 shadow-lg bg-white">
        <img src="assets/organic_shape_circle.png" alt="Formas Orgânicas e Foco" class="w-full h-auto object-cover" />
      </div>
      <p>O design profissional funciona como uma <strong>prévia da qualidade</strong>. Ele resolve a objeção de confiança antes mesmo do cliente ler o seu primeiro parágrafo.</p>
      <p>Invista em consistência visual. Isso reduz o 'esforço cognitivo' do cliente e aumenta as chances de conversão imediata.</p>
    `
  }
];

export function InsightsSection() {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  // Helper function to resolve image paths based on BASE_URL
  const getImagePath = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${base}${cleanPath}`;
  };

  return (
    <section id="insights" className="py-32 px-6 md:px-12 bg-white overflow-hidden relative">
      {/* Soft Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#795558]/3 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#795558]/2 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#795558]/30"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#795558] font-bold">Conteúdo Curado</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#795558] leading-tight font-light">
              Insights & <span className="italic">Reflexões</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="flex items-center gap-4 text-[#795558]/40 border-l border-[#795558]/10 pl-8 h-20">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-serif italic">Atualizado semanalmente</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Staggered Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.23, 1, 0.32, 1]
              }}
              onClick={() => setSelectedInsight(insight)}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}
            >
              <div className="bg-[#FAF9F6] rounded-[3rem] p-0 flex flex-col border border-transparent hover:border-[#795558]/10 hover:bg-white transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(121,85,88,0.15)] relative overflow-hidden h-full">
                
                {/* Image Cover Preview */}
                <div className="w-full h-48 relative overflow-hidden">
                   <img 
                    src={getImagePath(insight.image || '')} 
                    alt={insight.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] to-transparent" />
                </div>
                
                <div className="p-10 pt-4 flex flex-col flex-1">
                  {/* Category & Icons */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="bg-white w-12 h-12 rounded-2xl shadow-lg border border-gray-50 flex items-center justify-center text-[#795558] transition-all duration-500 group-hover:bg-[#795558] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 -mt-10 relative z-20">
                      {insight.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#795558] block mb-1">{insight.tag}</span>
                      <div className="flex items-center gap-1 justify-end text-gray-400 text-[9px] font-bold">
                        <Clock className="w-3 h-3" /> {insight.readingTime}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-[#795558] mb-6 leading-snug transition-colors group-hover:text-[#5A3D3F]">
                    {insight.title}
                  </h3>
                  
                  <p className="text-gray-500 font-light leading-relaxed text-sm mb-12 line-clamp-2 transition-colors group-hover:text-gray-600">
                    {insight.description}
                  </p>

                  {/* Card Action Link */}
                  <div className="mt-auto pt-6 border-t border-[#795558]/5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{insight.date}</span>
                    <div className="flex items-center gap-2 text-[#795558] text-[10px] font-black uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        Explorar <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delicate Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 md:mt-48 flex flex-col items-center gap-10"
        >
          <div className="w-16 h-[1px] bg-[#795558]/20" />
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="flex items-center gap-2 text-[#795558] mb-2">
                <MessageSquare className="w-4 h-4 opacity-40 " />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Mantenha-se atualizado</span>
             </div>
             <p className="text-gray-400 text-sm font-light max-w-sm">
                Novos insights sobre design e estratégia toda semana para ajudar sua marca a brilhar.
             </p>
          </div>
        </motion.div>
      </div>

      <InsightModal 
        insight={selectedInsight} 
        onClose={() => setSelectedInsight(null)} 
      />
    </section>
  );
}
