import { motion, AnimatePresence } from 'motion/react';
import { X, Grid, Heart, MessageCircle, Bookmark, Compass, Layout, User } from 'lucide-react';
import { Project } from './ProjectsSection';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectFeedProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ProjectFeed({ isOpen, onClose, projects, onSelectProject }: ProjectFeedProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[100] overflow-y-auto custom-scrollbar"
        >
          {/* Header Bar */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-6 py-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#795558]" />
                <h2 className="font-serif text-xl text-[#795558] font-bold">Explorar Projetos</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Info (Simulating Instagram Header) */}
            <div className="flex items-center gap-8 mb-12 px-4">
               <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-[#795558]/20 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={`${import.meta.env.BASE_URL}assets/profile_anna.jpg`}
                      alt="Anna"
                      className="w-full h-full object-cover"
                    />
                  </div>
               </div>
               <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">annadsgr</h3>
                    <button className="bg-[#795558] text-white px-4 py-1.5 rounded-lg text-sm font-bold">Seguir</button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-lg text-sm font-bold">Mensagem</button>
                  </div>
                  <div className="flex gap-6 mb-4 text-sm">
                    <span><strong>{projects.length}</strong> publicações</span>
                    <span><strong>19</strong> seguidores</span>
                    <span><strong>17</strong> seguindo</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">Designer Gráfico | Identidade Visual</p>
                    <p className="text-gray-600 font-light leading-snug whitespace-pre-line">
                      Design que comunica com alma
                      Minimalista • Criativo • Estratégico
                      📩 Orçamentos no direct
                    </p>
                  </div>
               </div>
            </div>

            {/* Grid vs Feed Icons */}
            <div className="border-t border-gray-100 flex justify-center gap-12 mb-0">
               <button className="flex items-center gap-2 py-4 border-t-2 border-black -mt-[2px] transition-all">
                  <Grid className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">POSTS</span>
               </button>
               <button className="flex items-center gap-2 py-4 text-gray-400 hover:text-gray-500 transition-colors">
                  <Layout className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">REELS</span>
               </button>
               <button className="flex items-center gap-2 py-4 text-gray-400 hover:text-gray-500 transition-colors">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">SALVOS</span>
               </button>
               <button className="flex items-center gap-2 py-4 text-gray-400 hover:text-gray-500 transition-colors md:flex hidden">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">MARCADOS</span>
               </button>
            </div>

            {/* Instagram Style Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square cursor-pointer group overflow-hidden"
                  onClick={() => onSelectProject(project)}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 md:gap-8 text-white">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-5 h-5 fill-white" />
                      <span className="font-bold">128</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span className="font-bold">14</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
