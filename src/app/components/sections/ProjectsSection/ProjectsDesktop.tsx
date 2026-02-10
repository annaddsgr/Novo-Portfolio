import { useState, useRef, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ImageWithFallback } from "@/app/components/features/figma/ImageWithFallback";
import { getImagePath } from '@/app/utils/imagePath';

const ProjectModal = lazy(() => import('@/app/components/features/ProjectModal').then(module => ({ default: module.ProjectModal })));
const ProjectFeed = lazy(() => import('@/app/components/features/ProjectFeed').then(module => ({ default: module.ProjectFeed })));

import { Project, projects } from '@/app/data/projects';

function ProjectCardDesktop({ project, index, onSelect }: { project: Project, index: number, onSelect: (p: Project) => void }) {
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
      className={`relative w-full max-w-6xl mx-auto flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-24 py-20 group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Visual Side */}
      <div className="relative w-3/5 perspective-1000">
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
          className="relative aspect-[16/9] rounded-[3.5rem] overflow-hidden bg-white border-[16px] border-white cursor-pointer"
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
            className="absolute top-1/2 left-12 -translate-y-1/2 flex w-24 h-24 bg-[#FFDAF0] rounded-full items-center justify-center text-[#795558] text-[9px] font-black uppercase tracking-widest text-center px-4 leading-tight shadow-2xl border-4 border-white pointer-events-none"
          >
            Alto Impacto Estratégico
          </motion.div>
        </motion.div>

        {/* Outer Background Typography */}
        <div className={`absolute -top-20 ${isEven ? '-left-12' : '-right-12'} text-[20rem] font-serif text-[#795558]/5 leading-none select-none pointer-events-none italic z-[-1]`}>
          0{index + 1}
        </div>
      </div>

      {/* Narrative Side */}
      <div className={`w-2/5 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'} space-y-8`}>
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-xs font-black uppercase tracking-[0.5em] text-[#795558]/40 flex items-center gap-4 ${!isEven && 'justify-end'}`}
          >
            {isEven ? null : <div className="h-[1px] w-12 bg-[#795558]/20" />}
            {project.category}
            {isEven ? <div className="h-[1px] w-12 bg-[#795558]/20" /> : null}
          </motion.p>
          <h3 className="text-7xl font-serif text-[#795558] leading-tight transition-all duration-700 group-hover:italic">
            {project.title}
          </h3>
          <p className="text-lg text-[#795558]/70 font-light leading-relaxed max-w-md italic">
            "{project.description.slice(0, 120)}..."
          </p>
        </div>

        <div className={`flex flex-wrap gap-3 ${!isEven && 'justify-end'}`}>
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


export function ProjectsDesktop() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFeedOpen, setIsFeedOpen] = useState(false);

  return (
    <section id="projetos" className="py-16 bg-[#FCF6EF]/50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#795558] translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#795558] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-sm border border-[#795558]/5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#795558] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#795558] font-black">Portfólio Curado</span>
          </div>

          <h2 className="text-[9rem] font-serif text-[#795558] leading-[0.9] mb-12">
            Projetos <br /> <span className="italic font-light opacity-60">Selecionados</span>
          </h2>

          <div className="w-20 h-[1.5px] bg-[#795558]/20" />
        </motion.div>

        {/* Cinematic List */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCardDesktop key={project.id} project={project} index={index} onSelect={setSelectedProject} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 flex flex-col items-center gap-10"
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
