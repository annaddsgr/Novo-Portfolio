import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Share2 } from 'lucide-react';

export interface Insight {
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
  tag: string;
  date: string;
  author: string;
  readingTime: string;
  image?: string;
}

interface InsightModalProps {
  insight: Insight | null;
  onClose: () => void;
}

export function InsightModal({ insight, onClose }: InsightModalProps) {
  if (!insight) return null;

  // Helper function to resolve image paths based on BASE_URL
  const getImagePath = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${base}${cleanPath}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#795558]/20 backdrop-blur-xl z-[60] flex items-center justify-center p-0 md:p-6 lg:p-12"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white md:rounded-[3rem] w-full max-w-6xl h-full md:h-[85vh] shadow-[0_40px_100px_-20px_rgba(121,85,88,0.2)] relative overflow-hidden flex flex-col lg:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Premium Floating */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 bg-white/80 backdrop-blur-md hover:bg-[#795558] text-[#795558] hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border border-white/50 z-[70] group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          {/* LEFT: Visual Vibe (Sticky Header/Sidebar) */}
          <div className="lg:w-[40%] h-[35vh] lg:h-full relative overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-[#795558]/5">
                {insight.image ? (
                   <img 
                      src={getImagePath(insight.image)} 
                      alt={insight.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                   />
                ) : (
                   <div className="w-full h-full flex items-center justify-center opacity-10">
                      {insight.icon}
                   </div>
                )}
             </div>
             
             {/* Gradient Overlay for Text Visibility */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent hidden lg:block" />
             
             {/* Floating Info inside Image (Desktop) */}
             <div className="absolute bottom-12 left-12 right-12 text-white hidden lg:block z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Artigo Selecionado</span>
                <div className="w-12 h-[1px] bg-white/30" />
             </div>
          </div>

          {/* RIGHT: Editorial Content Chamber */}
          <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-white relative">
            {/* Reading Progress Bar */}
            <div className="sticky top-0 left-0 w-full h-1 bg-gray-50 z-50">
               <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-[#795558] origin-left"
               />
            </div>

            <div className="p-8 md:p-14 lg:p-20 space-y-12">
              {/* Meta Flow */}
              <div className="flex flex-wrap items-center gap-6">
                <span className="px-4 py-1.5 rounded-full bg-[#795558]/5 text-[#795558] text-[9px] font-black uppercase tracking-widest border border-[#795558]/10">
                  {insight.tag}
                </span>
                <div className="flex items-center gap-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {insight.date}</span>
                  <span className="flex items-center gap-2 decoration-dotted"><User className="w-3.5 h-3.5" /> {insight.readingTime} ler</span>
                </div>
              </div>

              {/* Title with Articulation */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#795558] leading-[1.1] font-light">
                {insight.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 1 ? 'italic mr-3' : 'mr-3'}>{word}</span>
                ))}
              </h2>

              {/* Narrative Content */}
              <div className="prose prose-stone max-w-none">
                <div className="relative mb-14">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#795558]/10 rounded-full" />
                  <p className="text-xl md:text-2xl text-[#795558]/70 font-serif italic pl-10 leading-relaxed font-light">
                    "{insight.description}"
                  </p>
                </div>
                
                <div className="space-y-8 text-gray-600 font-light leading-relaxed text-lg pb-10 content-styled" 
                     dangerouslySetInnerHTML={{ __html: insight.content.replace(/src="([^"]+)"/g, (match, p1) => `src="${getImagePath(p1)}"`) }} 
                />
              </div>

              {/* Curated Footer */}
              <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#FCF6EF] flex items-center justify-center text-[#795558] font-serif text-2xl font-bold shadow-sm">
                      A
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#795558] uppercase tracking-[0.3em] mb-1">{insight.author}</p>
                      <p className="text-xs text-gray-400 font-medium italic">Sua guia estratégica de design</p>
                    </div>
                 </div>
                 
                 <button 
                  onClick={() => window.open(`https://wa.me/5531992781019?text=Oi Anna! Acabei de ler seu artigo "${insight.title}" e amei.`, '_blank')}
                  className="group flex items-center gap-4 px-8 py-4 rounded-2xl bg-[#795558] text-white hover:bg-[#5A3D3F] transition-all duration-500 shadow-2xl hover:shadow-[#795558]/40"
                 >
                    <span className="text-xs font-bold uppercase tracking-widest">Conversar sobre isso</span>
                    <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                 </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
