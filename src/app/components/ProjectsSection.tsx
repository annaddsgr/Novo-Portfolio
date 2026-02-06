import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectModal } from "./ProjectModal";
import { ArrowUpRight, FolderOpen } from "lucide-react";

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
    layoutType: 'grid'
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
    layoutType: 'grid'
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
    layoutType: 'carousel'
  },

];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projetos"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#FCF6EF]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#795558]/5 mb-6">
              <FolderOpen className="w-4 h-4 text-[#795558]" />
              <span className="text-sm uppercase tracking-widest text-[#795558] font-medium">
                Portfolio Selecionado
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#795558] leading-tight mb-6">
              Histórias que ajudei a criar
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Cada projeto é uma jornada única. Aqui, compartilho não apenas o resultado, 
              mas o sentimento e o aprendizado de cada caminho percorrido.
            </p>
          </motion.div>

        {/* Behance-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col gap-4"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.virtualSlideCount ? 'object-left' : 'object-center'}`}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    Ver Projeto
                  </span>
                  <div className="bg-white p-2 rounded-full text-[#795558]">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text Content Below */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-serif text-[#795558] font-medium group-hover:text-[#5A3D3F] transition-colors leading-tight">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium tracking-wide">
                  <span className="uppercase text-xs">{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-xs">{project.year}</span>
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
