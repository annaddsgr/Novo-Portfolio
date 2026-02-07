import { useState, useRef, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ImageWithFallback } from "../features/figma/ImageWithFallback";
import { getImagePath } from '@/app/utils/imagePath';

const ProjectModal = lazy(() => import('../features/ProjectModal').then(module => ({ default: module.ProjectModal })));
const ProjectFeed = lazy(() => import('../features/ProjectFeed').then(module => ({ default: module.ProjectFeed })));

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
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: index * 0.2 }}
      className={`relative w-full max-w-6xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 py-12 lg:py-20 group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Visual Side */}
      <div className="relative w-full lg:w-3/5 perspective-1000">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            boxShadow: useTransform(
              [shadowX, shadowY],
              ([sx, sy]) => `${sx}px ${sy}px 60px rgba(121, 85, 88, 0.15)`
            )
          }}
          className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-white border-[10px] md:border-[16px] border-white cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 scale-110"
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20])
            }}
          >
            <ImageWithFallback
              src={getImagePath(project.image)}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            />
          </motion.div>

          {/* Immersive Overlay */}
          <div className="absolute inset-0 bg-[#795558]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Internal Floating Sticker */}
          <motion.div
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], [60, -60]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], [60, -60]),
              rotate: 15,
              z: "80px"
            }}
            className="absolute top-1/2 left-12 -translate-y-1/2 hidden md:flex w-24 h-24 bg-[#FFDAF0] rounded-full items-center justify-center text-[#795558] text-[9px] font-black uppercase tracking-widest text-center px-4 leading-tight shadow-2xl border-4 border-white pointer-events-none"
          >
            Alto Impacto Estratégico
          </motion.div>
        </motion.div>

        {/* Outer Background Typography */}
        <div className={`absolute -top-12 sm:-top-20 ${isEven ? '-left-4 sm:-left-12' : '-right-4 sm:-right-12'} text-[10rem] sm:text-[20rem] font-serif text-[#795558]/5 leading-none select-none pointer-events-none italic`}>
          0{index + 1}
        </div>
      </div>

      {/* Narrative Side */}
      <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'} space-y-8`}>
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-[#795558]/40 flex items-center gap-4"
          >
            {isEven ? null : <div className="h-[1.5px] w-12 bg-[#795558]/20" />}
            {project.category}
            {isEven ? <div className="h-[1.5px] w-12 bg-[#795558]/20" /> : null}
          </motion.p>
          <h3 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#795558] leading-tight transition-all duration-700 group-hover:italic">
            {project.title}
          </h3>
          <p className="text-sm sm:text-lg text-[#795558]/70 font-light leading-relaxed max-w-md italic">
            "{project.description.slice(0, 120)}..."
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.typography.slice(0, 2).map((font, i) => (
            <span key={i} className="px-4 py-2 rounded-full border border-[#795558]/10 text-[9px] font-bold uppercase tracking-widest text-[#795558]/50">
              {font}
            </span>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(project)}
          whileHover={{ x: isEven ? 10 : -10 }}
          className="group flex items-center gap-4 text-[#795558] text-[10px] font-black uppercase tracking-[0.4em] pt-4"
        >
          {isEven ? (
            <>Explorar Estudo <div className="w-12 h-[1px] bg-[#795558] group-hover:w-20 transition-all" /></>
          ) : (
            <><div className="w-12 h-[1px] bg-[#795558] group-hover:w-20 transition-all" /> Explorar Estudo</>
          )}
        </motion.button>
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
    image: "assets/alegria_doce_cover_new.png",
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
      "assets/alegria_doce_1.png",
      "assets/alegria_doce_mugs_new.png",
      "assets/alegria_doce_2.png",
      "assets/alegria_doce_main.png"
    ],
    layoutType: 'grid',
    results: "A marca Alegria Doce percebeu um aumento na percepção de valor dos produtos, permitindo um reajuste de preço de 15% e maior fidelização visual dos clientes."
  },
  {
    id: 2,
    title: "Recanto do Sereno",
    category: "Logo & Identidade",
    year: "2024",
    image: "assets/recanto_logo.jpg",
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
        description: "Ajustamos o peso das lines para que a marca funcione tanto em uma placa de madeira rústica quanto em um site de reservas sofisticado."
      }
    ],
    deliverables: ["Logotipo Responsivo", "Direção de Arte", "Cartões de Visita", "Papelaria Institucional", "Assinatura de E-mail"],
    colors: ["#10433a", "#e89137", "#f5f5f5"],
    typography: ["Draculas Personal", "Poppins"],
    mockups: [
      "assets/recanto_business_card.jpg",
      "assets/recanto_tote.jpg",
      "assets/recanto_flyer.jpg",
      "assets/recanto_logo_green.png",
    ],
    layoutType: 'grid',
    results: "A nova identidade atraiu um público que busca experiências de luxo silencioso, aumentando as reservas diretas pelo site em 25% no primeiro semestre."
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFeedOpen, setIsFeedOpen] = useState(false);

  return (
    <section id="projetos" className="py-12 md:py-16 bg-[#FCF6EF]/50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#795558] translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#795558] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 lg:mb-32 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-[#795558]/5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#795558] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#795558] font-black">Portfólio Curado</span>
          </div>

          <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-serif text-[#795558] leading-[0.9] mb-8 md:mb-12">
            Projetos <br /> <span className="italic font-light opacity-60">Selecionados</span>
          </h2>

          <div className="w-20 h-[1.5px] bg-[#795558]/20" />
        </motion.div>

        {/* Cinematic List */}
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 lg:mt-40 flex flex-col items-center gap-10"
        >
          <div className="relative group cursor-pointer" onClick={() => setIsFeedOpen(true)}>
            <div className="absolute inset-0 bg-[#795558] rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <button className="relative px-12 py-6 rounded-full border border-[#795558]/20 text-[#795558] text-xs font-black uppercase tracking-[0.5em] hover:bg-[#795558] hover:text-white transition-all duration-700 shadow-2xl hover:shadow-[#795558]/30">
              Ver Todo o Acervo
            </button>
          </div>

          <p className="text-[10px] font-bold text-[#795558]/30 uppercase tracking-[0.3em]">
            Design com Alma & Estratégia &bull; Explorar Galeria
          </p>
        </motion.div>
      </div>

      <Suspense fallback={null}>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        <ProjectFeed isOpen={isFeedOpen} onClose={() => setIsFeedOpen(false)} projects={projects} onSelectProject={(p: Project) => { setSelectedProject(p); setIsFeedOpen(false); }} />
      </Suspense>
    </section>
  );
}
