import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectModal } from "./ProjectModal";
import { ArrowUpRight, FolderOpen, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectFeed } from "./ProjectFeed";

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  challenge: string;
  personalPhrase: string;
  process: { step: string; description: string }[];
  colors: string[];
  typography: string[];
  mockups: string[];
  layoutType?: 'grid' | 'carousel';
  deliverables?: string[];
  virtualSlideCount?: number;
  results?: string;
}

function ProjectCard({ project, index, onSelect }: { project: Project, index: number, onSelect: (p: Project) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="flex-shrink-0 w-[75vw] md:w-[50vw] lg:w-[35vw] group relative z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{ perspective: 1000 }}
    >
      <div className="absolute -top-12 -left-3 z-10 text-9xl font-serif text-[#795558]/5 pointer-events-none select-none italic group-hover:text-[#795558]/10 transition-colors">
         0{index + 1}
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-video rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(121,85,88,0.15)] bg-white border-[8px] md:border-[12px] border-white group-hover:shadow-[0_50px_120px_rgba(121,85,88,0.25)] transition-all duration-700"
      >
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          style={{ transform: "translateZ(30px)" }}
        />
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
           <div 
             className="absolute bottom-0 left-0 right-0 p-8 md:p-12 translate-y-20 group-hover:translate-y-0 transition-transform duration-700"
             style={{ transform: "translateZ(60px)" }}
           >
              <div className="flex justify-between items-end">
                 <div className="text-white">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">{project.category}</p>
                   <h3 className="text-3xl md:text-4xl font-serif italic mb-4">{project.title}</h3>
                 </div>
              </div>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1, rotate: 15 }}
          className="absolute bottom-1/4 left-10 z-20 pointer-events-none bg-[#FFDAF0] text-[#795558] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white"
          style={{ transform: "translateZ(100px)" }}
        >
           Visual Strategy
        </motion.div>

        <div className="absolute top-8 right-8 z-10" style={{ transform: "translateZ(50px)" }}>
           <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FCF6EF]/90 backdrop-blur-md rounded-full flex flex-col items-center justify-center border border-white/50 shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <span className="text-[10px] font-black text-[#795558] mb-0.5">{project.year}</span>
              <div className="w-4 h-[1px] bg-[#795558]/30" />
              <span className="text-[8px] font-bold text-[#795558]/40 uppercase tracking-tighter">Edition</span>
           </div>
        </div>
      </motion.div>

      <div className="mt-8 flex justify-between items-start px-2 md:px-3 group-hover:translate-y-[-4px] transition-transform duration-500">
         <div className="space-y-1">
            <h4 className="text-xl md:text-2xl font-serif text-[#795558] group-hover:italic transition-all">{project.title}</h4>
            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">{project.category}</p>
         </div>
         <button className="text-[10px] font-black uppercase tracking-widest text-[#795558] pb-1 border-b-2 border-[#795558]/10 hover:border-[#795558] transition-all">
            Projeto Completo
         </button>
      </div>
    </motion.div>
  );
}

const projects: Project[] = [
  {
    id: 1,
    title: "Alegria Doce Ateliê",
    category: "Identidade Visual",
    year: "2024",
    image: `${import.meta.env.BASE_URL}assets/alegria_doce_cover_new.png`,
    description: "Uma jornada para traduzir o sabor de memórias afetivas em uma marca visual. O objetivo não era apenas vender doces, mas vender o sentimento de um abraço apertado e de uma tarde de domingo.",
    challenge:
      "O maior desafio foi equilibrar a doçura (que poderia ficar infantil) com o profissionalismo de um ateliê gourmet. A marca precisava ser fofa, mas confiável; caseira, mas premium.",
    personalPhrase:
      "Foi delicioso ver essa marca nascer. Cada cor foi escolhida como se eu estivesse selecionando os melhores ingredientes para uma receita especial.",
    process: [
      {
        step: "Imersão no Aroma",
        description: "Começamos investigando os valores da confeiteira: amor, paciência e ingredientes naturais. Entendi que a marca não vende açúcar, vende afeto."
      },
      {
        step: "Cores e Texturas",
        description: "A paleta nasceu da mistura de menta suave com tons de chocolate e creme. Buscamos cores que despertem o paladar sem serem agressivas."
      },
      {
        step: "Tipografia Manual",
        description: "Escolhi fontes que remetem à escrita manual e livros de receitas antigos, trazendo aquela sensação de 'feito pela vovó' mas com acabamento moderno."
      }
    ],
    deliverables: ["Logo Principal & Variações", "Paleta de Cores", "Tipografia Exclusiva", "Pattern & Elementos", "Design de Embalagens"],
    colors: ["#9fc8a6", "#7b4b33", "#fef3ee", "#628e6b"],
    typography: ["Poly", "ITC New Baskerville"],
    mockups: [
      `${import.meta.env.BASE_URL}assets/alegria_doce_1.png`,
      `${import.meta.env.BASE_URL}assets/alegria_doce_mugs_new.png`,
      `${import.meta.env.BASE_URL}assets/alegria_doce_2.png`,
      `${import.meta.env.BASE_URL}assets/alegria_doce_main.png`
    ],
    layoutType: 'grid',
    results: "A marca Alegria Doce percebeu um aumento na percepção de valor dos produtos, permitindo um reajuste de preço de 15% e maior fidelização visual dos clientes."
  },
  {
    id: 2,
    title: "Recanto do Sereno",
    category: "Logo & Identidade",
    year: "2024",
    image: `${import.meta.env.BASE_URL}assets/recanto_logo.jpg`,
    description:
      "Mais que uma pousada, um convite ao silêncio. A identidade visual foi construída para desacelerar quem a vê, usando o minimalismo como ferramenta de paz.",
    challenge:
      "Fugir dos clichês de pousadas rurais (como casinhas literais) e capturar a essência abstrata da neblina da manhã e do cheiro de terra molhada de Minas Gerais.",
    personalPhrase:
      "O verde profundo e o laranja terroso contam a história do lugar antes mesmo de você chegar lá. É uma marca que respira.",
    process: [
      {
        step: "Estudo do Terroir",
        description: "Analisei a geografia do local. As curvas da logo nasceram inspiradas na silhueta exata das montanhas que cercam a propriedade."
      },
      {
        step: "Minimalismo Rústico",
        description: "Eliminei excessos. Mantivemos apenas traços essenciais, usando texturas que lembram papel reciclado e madeira crua."
      },
      {
        step: "Refinamento Elegante",
        description: "Ajustamos o peso das linhas para que a marca funcione tanto em uma placa de madeira rústica quanto em um site de reservas sofisticado."
      }
    ],
    deliverables: ["Logotipo Responsivo", "Direção de Arte", "Cartões de Visita", "Papelaria Institucional", "Assinatura de E-mail"],
    colors: ["#10433a", "#e89137", "#f5f5f5"],
    typography: ["Draculas Personal", "Poppins"],
    mockups: [
      `${import.meta.env.BASE_URL}assets/recanto_business_card.jpg`,
      `${import.meta.env.BASE_URL}assets/recanto_tote.jpg`,
      `${import.meta.env.BASE_URL}assets/recanto_flyer.jpg`,
      `${import.meta.env.BASE_URL}assets/recanto_logo_green.png`,
    ],
    layoutType: 'grid',
    results: "A nova identidade atraiu um público que busca experiências de luxo silencioso, aumentando as reservas diretas pelo site em 25% no primeiro semestre."
  },
  {
    id: 3,
    title: "Social Media Supermercado",
    category: "Social Media",
    year: "2024",
    image: `${import.meta.env.BASE_URL}assets/supermercado_pao.png`,
    description:
      "Transformando ofertas diárias em desejo de consumo. Aqui, design é estratégia pura: clareza, rapidez de leitura e apetite visual transformados em pixels.",
    challenge:
      "O varejo exige velocidade e volume. O desafio foi criar um sistema visual (templates) que mantivesse a qualidade estética sem perder a agilidade necessária para postar ofertas relâmpago.",
    personalPhrase:
      "No varejo, o design não pode atrapalhar a venda; ele é o vendedor silencioso. Cada post é um convite irresistível para entrar na loja.",
    process: [
      {
        step: "Psicologia das Cores",
        description: "Utilizamos azul para confiança e laranja para fome/urgência. O contraste foi calibrado para destacar preços sem cansar a vista."
      },
      {
        step: "Hierarquia da Informação",
        description: "Definimos regras claras: Produto é rei, Preço é rainha. Logo e detalhes vêm depois. O olho do cliente escaneia a imagem em segundos."
      },
      {
        step: "Sistematização",
        description: "Criei templates modulares no Canva e Photoshop para que a equipe interna pudesse replicar a identidade com rapidez e autonomia."
      }
    ],
    deliverables: ["Estratégia de Conteúdo", "Templates Editáveis", "Pack de Ícones", "Destaques para Instagram", "Guia de Estilo para Feed"],
    colors: ["#0057B7", "#FF8C00", "#F5F5F5"],
    typography: ["Montserrat", "Poppins"],
    mockups: [
      `${import.meta.env.BASE_URL}assets/supermercado_zap.png`,
      `${import.meta.env.BASE_URL}assets/supermercado_pao.png`,
      `${import.meta.env.BASE_URL}assets/supermercado_macarrao.png`,
      `${import.meta.env.BASE_URL}assets/supermercado_entrega.png`,
    ],
    layoutType: 'carousel',
    results: "Agilidade total: Redução de 40% no tempo de criação de posts diários e aumento de 30% no engajamento por conta da clareza visual das ofertas."
  },

];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isFeedOpen, setIsFeedOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const scrollX = useMotionValue(0);
  
  const progress = useTransform(scrollX, [dragConstraints.left, 0], [1, 0]);
  const progressSpring = useSpring(progress, { stiffness: 100, damping: 30 });

  const categories = ["Todos", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const updateConstraints = () => {
      if (sliderRef.current && containerRef.current) {
        const sliderWidth = sliderRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const minScroll = Math.min(0, -(sliderWidth - containerWidth + 48));
        setDragConstraints({ left: minScroll, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [filteredProjects, activeCategory]);

  const slide = (direction: 'next' | 'prev') => {
    if (!sliderRef.current) return;
    const cardWidth = window.innerWidth * 0.3;
    const currentX = scrollX.get();
    const targetX = direction === 'next' ? currentX - cardWidth : currentX + cardWidth;
    const clampedX = Math.min(0, Math.max(dragConstraints.left, targetX));
    scrollX.set(clampedX);
  };

  return (
    <section id="projetos" className="py-24 md:py-40 bg-[#FCF6EF] overflow-hidden flex flex-col items-center">
      {/* Header Container - Always Centered */}
      <div className="w-full max-w-7xl px-6 md:px-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#795558]/5 mb-6">
              <FolderOpen className="w-4 h-4 text-[#795558]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#795558] font-bold">Portfolio Selecionado</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-[#795558] leading-tight mb-10">
              Meus <span className="italic font-light">Destaques</span>
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                        setActiveCategory(category);
                        scrollX.set(0);
                    }}
                    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                      activeCategory === category ? "bg-[#795558] text-white shadow-xl scale-105" : "bg-white text-[#795558] border border-[#795558]/10 hover:border-[#795558]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsFeedOpen(true)}
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-white text-[#795558] text-[10px] font-black uppercase tracking-widest shadow-md hover:shadow-xl transition-all border border-[#795558]/5"
              >
                <FolderOpen className="w-4 h-4" /> Ver Galeria Completa
              </button>
            </div>
          </motion.div>
      </div>

      {/* Gallery Container - Full Width Center */}
      <div ref={containerRef} className="w-full relative group/gallery flex flex-col items-center">
        <motion.div 
          ref={sliderRef}
          drag={dragConstraints.left < 0 ? "x" : false}
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{ x: scrollX }}
          className={`flex gap-8 md:gap-14 pb-16 px-6 ${dragConstraints.left >= 0 ? 'justify-center' : 'cursor-grab active:cursor-grabbing'}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 2).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Enhanced Progress Bar - Only if needed */}
        {dragConstraints.left < 0 && (
          <div className="mt-4 max-w-2xl w-full px-12 flex items-center gap-8 justify-center">
             <span className="text-[10px] font-black text-[#795558]/40 uppercase tracking-widest">01</span>
             <div className="flex-1 max-w-xs h-[2px] bg-[#795558]/10 relative rounded-full overflow-hidden">
                <motion.div 
                   className="absolute left-0 top-0 bottom-0 bg-[#795558] origin-left w-full"
                   style={{ scaleX: progressSpring }}
                />
             </div>
             <span className="text-[10px] font-black text-[#795558]/40 uppercase tracking-widest">02</span>
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ProjectFeed isOpen={isFeedOpen} onClose={() => setIsFeedOpen(false)} projects={projects} onSelectProject={(p) => { setSelectedProject(p); setIsFeedOpen(false); }} />
    </section>
  );
}
