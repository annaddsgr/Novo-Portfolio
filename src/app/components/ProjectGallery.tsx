import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ProjectModal } from './ProjectModal';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  colors: string[];
  typography: string[];
  mockups: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Identidade Visual Moderna",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1694350892418-19cc4b56aca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYnJhbmRpbmclMjBtb2NrdXB8ZW58MXx8fHwxNzY5NDM4MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Desenvolvimento completo de identidade visual para startup de tecnologia, incluindo logo, paleta de cores, tipografia e aplicações em diversos materiais. O projeto buscou transmitir modernidade e inovação através de formas geométricas e cores vibrantes.",
    colors: ["#FF6B9D", "#C06BFF", "#6B9DFF", "#FFD93D", "#6BCF7F"],
    typography: ["Montserrat Bold", "Poppins Regular"],
    mockups: [
      "https://images.unsplash.com/photo-1694350892418-19cc4b56aca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYnJhbmRpbmclMjBtb2NrdXB8ZW58MXx8fHwxNzY5NDM4MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1761167899925-33ee9a55f9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dvJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTQzODM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    id: 2,
    title: "Packaging Criativo",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1691430597165-4ac5e9d375e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjkzNDA0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Design de embalagem sustentável para linha de produtos orgânicos. O projeto utilizou formas orgânicas e uma paleta de cores naturais para transmitir os valores da marca e criar conexão emocional com o consumidor consciente.",
    colors: ["#2D5F3F", "#8BC34A", "#FFF8E1", "#FF9800", "#795548"],
    typography: ["Playfair Display", "Lato Light"],
    mockups: [
      "https://images.unsplash.com/photo-1691430597165-4ac5e9d375e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjkzNDA0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1653053151840-a35f2002a2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjkzNTg1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    id: 3,
    title: "Branding Corporativo",
    category: "Identidade Visual",
    image: "https://images.unsplash.com/photo-1761167899925-33ee9a55f9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dvJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTQzODM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Redesign completo de marca corporativa, incluindo manual de identidade visual, aplicações digitais e impressas. Focado em profissionalismo e modernidade, mantendo a tradição da empresa.",
    colors: ["#1A237E", "#3F51B5", "#E3F2FD", "#FFB300", "#37474F"],
    typography: ["Inter Bold", "Inter Regular"],
    mockups: [
      "https://images.unsplash.com/photo-1761167899925-33ee9a55f9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dvJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTQzODM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1694350892418-19cc4b56aca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYnJhbmRpbmclMjBtb2NrdXB8ZW58MXx8fHwxNzY5NDM4MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    id: 4,
    title: "Design Editorial",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1653053151840-a35f2002a2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjkzNTg1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Projeto editorial para revista de design e arquitetura. Layout moderno com forte hierarquia visual, uso equilibrado de espaços brancos e fotografia de alta qualidade.",
    colors: ["#000000", "#FFFFFF", "#E74C3C", "#95A5A6", "#ECF0F1"],
    typography: ["Bodoni MT", "Helvetica Neue"],
    mockups: [
      "https://images.unsplash.com/photo-1653053151840-a35f2002a2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjkzNTg1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1723283126735-f24688fcfcc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwcGF0dGVybnxlbnwxfHx8fDE3Njk0Mjc2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    id: 5,
    title: "Identidade Artística",
    category: "Arte & Cultura",
    image: "https://images.unsplash.com/photo-1723283126735-f24688fcfcc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwcGF0dGVybnxlbnwxfHx8fDE3Njk0Mjc2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Identidade visual para festival de arte contemporânea. Design ousado e experimental que celebra a diversidade e criatividade através de padrões abstratos e cores vibrantes.",
    colors: ["#E91E63", "#9C27B0", "#00BCD4", "#FFEB3B", "#FF5722"],
    typography: ["Bebas Neue", "Open Sans"],
    mockups: [
      "https://images.unsplash.com/photo-1723283126735-f24688fcfcc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwcGF0dGVybnxlbnwxfHx8fDE3Njk0Mjc2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1691430597165-4ac5e9d375e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjkzNDA0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    id: 6,
    title: "Branding Minimalista",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1626784579980-db39c1a13aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBvcnRyYWl0JTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY5MzU4MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Identidade visual minimalista para marca de luxo. Design sofisticado focado em elegância e simplicidade, utilizando tipografia refinada e paleta monocromática.",
    colors: ["#212121", "#757575", "#BDBDBD", "#F5F5F5", "#FFFFFF"],
    typography: ["Futura PT", "Cormorant Garamond"],
    mockups: [
      "https://images.unsplash.com/photo-1626784579980-db39c1a13aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBvcnRyYWl0JTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY5MzU4MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1761167899925-33ee9a55f9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dvJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTQzODM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  }
];

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("Todos");

  const categories = ["Todos", "Branding", "Packaging", "Identidade Visual", "Editorial", "Arte & Cultura"];

  const filteredProjects = filter === "Todos" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projetos" className="py-20 md:py-32 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#795558] to-[#FFDAF0] bg-clip-text text-transparent">
            Meus Projetos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#795558] to-[#FFDAF0] mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes em branding, identidade visual e design gráfico
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-[#795558] to-[#FFDAF0] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white font-semibold flex items-center gap-2">
                      Ver Detalhes <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-[#795558] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
