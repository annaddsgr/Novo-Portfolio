import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Project } from '@/app/data/projects';
import { getImagePath } from '@/app/utils/imagePath';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);


  const galleryImages = project ? [project.image, ...project.mockups] : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#795558]/20 backdrop-blur-xl z-[10050] flex items-center justify-center p-0 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="bg-[#FCF6EF] md:rounded-[2.5rem] w-full max-w-7xl h-full md:h-[90vh] shadow-[0_50px_100px_-20px_rgba(121,85,88,0.3)] relative overflow-hidden flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >


          {/* LEFT: Cinematic Gallery (Sticky Scroll) */}
          <div className="md:w-[55%] h-[40vh] md:h-full bg-white relative overflow-y-auto no-scrollbar scroll-smooth">
            <div className="flex flex-col gap-1 p-1">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative group cursor-zoom-in overflow-hidden rounded-xl md:rounded-2xl"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <ImageWithFallback
                    src={getImagePath(img)}
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                  <div className="absolute inset-0 bg-[#795558]/0 group-hover:bg-[#795558]/5 transition-colors duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur shadow-2xl rounded-full flex items-center justify-center text-[#795558]">
                      <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sophisticated Content Shell */}
          <div className="md:w-[45%] h-[60vh] md:h-full overflow-y-auto custom-scrollbar bg-[#FCF6EF] relative">
            <div className="p-6 md:p-12 lg:p-16 space-y-10 md:space-y-12">
              {/* Header Info */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-[#795558]/5 text-[#795558] text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-[#795558]/10 text-nowrap">
                    {project.category}
                  </span>
                  <div className="w-6 md:w-8 h-[1px] bg-[#795558]/20" />
                  <span className="text-[9px] md:text-[10px] font-bold text-[#795558]/40 uppercase tracking-widest flex items-center gap-2 text-nowrap">
                    <Calendar className="w-3 h-3" /> {project.year}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#795558] leading-[1.2] md:leading-[1.1]">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? 'italic font-light' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Core Narrative Loop */}
              <div className="grid gap-8 md:gap-10">
                <section className="space-y-3">
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40">Contexto & Proposta</h3>
                  <p className="text-base md:text-lg text-[#795558]/80 leading-relaxed font-light font-serif italic text-balance">
                    {project.description}
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-[#795558]/10">
                  <div className="space-y-3">
                    <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40">Tipografia</h3>
                    <div className="space-y-1">
                      {project.typography.map((font, idx) => (
                        <p key={idx} className="text-base md:text-xl font-serif text-[#795558] opacity-80">{font}</p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40">Cores</h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {project.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Process Dots - Compact */}
                <section className="space-y-6">
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40 pt-4">Etapas da Criação</h3>
                  <div className="space-y-4">
                    {project.process.map((step, idx) => (
                      <div key={idx} className="group flex gap-4">
                        <span className="text-sm font-serif italic text-[#795558]/30 group-hover:text-[#795558] transition-colors">0{idx + 1}</span>
                        <div>
                          <h4 className="text-base font-bold text-[#795558] mb-1">{step.step}</h4>
                          <p className="text-sm text-[#795558]/60 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Deliverables Chip Set */}
                {project.deliverables && (
                  <section className="space-y-4 pt-4">
                    <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40">Entregáveis</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-white border border-[#795558]/10 text-[8px] md:text-[10px] font-bold text-[#795558]/70 uppercase tracking-widest whitespace-nowrap">
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Results Quote */}
                {project.results && (
                  <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#795558]/5 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-[#795558]" />
                    </div>
                    <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#795558]/40 mb-3 md:mb-4">Resultado</h3>
                    <p className="text-sm md:text-base text-[#795558] leading-relaxed relative z-10">
                      {project.results}
                    </p>
                  </div>
                )}

                {/* Final CTA */}
                <div className="pt-8 md:pt-12 flex flex-col items-center gap-6 md:gap-8">
                  <div className="w-12 h-[1px] bg-[#795558]/20" />
                  <a
                    href={`https://wa.me/5531992781019?text=Olá Anna! Amei o projeto ${project.title}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#795558] text-[#FCF6EF] py-5 md:py-6 rounded-xl md:rounded-2xl text-center font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-[#5A3D3F] transition-all duration-500 shadow-2xl hover:shadow-[#795558]/40 group"
                  >
                    Iniciar meu projeto
                    <ArrowRight className="inline-block ml-3 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button - Moved for Z-Index Safety */}
          <div
            className="absolute top-6 right-6 z-[60] flex items-center gap-3 pointer-events-auto"
            onClick={onClose}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#795558] bg-white shadow-sm md:hidden pointer-events-none px-3 py-1.5 rounded-full">
                Voltar
            </span>
            <button
                aria-label="Fechar"
                className="bg-white hover:bg-[#795558] text-[#795558] hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-[#795558]/10 group"
            >
                <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox Immersive */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#FCF6EF] flex items-center justify-center backdrop-blur-3xl"
          onClick={() => setLightboxIndex(null)}
        >
          <button className="absolute top-8 right-8 text-[#795558] p-4 transition-transform hover:rotate-90">
            <X className="w-8 h-8" />
          </button>

          <div className="w-full h-full flex items-center justify-center p-6 md:p-20">
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={getImagePath(galleryImages[lightboxIndex])}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length) }} className="w-14 h-14 rounded-full border border-[#795558]/20 flex items-center justify-center text-[#795558] hover:bg-[#795558] hover:text-white transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xs font-black text-[#795558]/40 tracking-[0.5em]">{lightboxIndex + 1} / {galleryImages.length}</span>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % galleryImages.length) }} className="w-14 h-14 rounded-full border border-[#795558]/20 flex items-center justify-center text-[#795558] hover:bg-[#795558] hover:text-white transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
