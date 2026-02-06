import { motion } from 'motion/react';
import { PenTool, Layout, Monitor, Printer, Package, Instagram, Code, Database } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: "Identidade Visual",
    description: "Criação de marcas com alma. Logotipo, paleta de cores, tipografia e manuais que traduzem a essência do seu negócio.",
    tags: ["Logo", "Manual da Marca", "Branding"]
  },
  {
    icon: Instagram,
    title: "Social Media",
    description: "Design estratégico para redes sociais. Posts, carrosséis e templates editáveis que organizam seu feed e atraem clientes.",
    tags: ["Feed", "Stories", "Templates Canva"]
  },
  {
    icon: Monitor,
    title: "Web Design",
    description: "Sua vitrine digital. Landing Pages de alta conversão e sites institucionais com foco total em estética e experiência do usuário.",
    tags: ["Landing Page", "Sites Institucionais", "UI Design"]
  },
  {
    icon: Code,
    title: "Software & Apps",
    description: "Tecnologia para escalar. Desenvolvimento de aplicativos mobile, sistemas web sob medida e automações inteligentes.",
    tags: ["Apps iOS/Android", "Sistemas Web", "SaaS"]
  },
  {
    icon: Printer,
    title: "Material Gráfico",
    description: "O toque físico da sua marca. Papelaria completa, cartões de visita, tags, adesivos e fechamento de arquivos para gráfica.",
    tags: ["Cartões", "Embalagens", "Arte Final"]
  }
];

export function ServicesList() {
  return (
    <section id="servicos" className="py-24 md:py-32 px-6 md:px-12 bg-[#FCF6EF] relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#795558]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-[#795558]/60 mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#795558] mb-6">
            O que posso fazer por você
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
             Do design encantador à tecnologia robusta. Soluções completas para elevar o nível da sua marca.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-[#E8DCCA]/50 hover:border-[#FFDAF0] hover:shadow-md transition-all duration-300 group w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] xl:w-[calc(20%-20px)] flex flex-col min-w-[220px]"
            >
              <div className="w-12 h-12 bg-[#FCF6EF] rounded-full flex items-center justify-center mb-5 group-hover:bg-[#FFDAF0] transition-colors duration-300">
                <service.icon className="w-6 h-6 text-[#795558]" />
              </div>
              
              <h3 className="text-lg font-serif text-[#795558] mb-3 group-hover:text-[#5A3D3F] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 font-light text-sm leading-relaxed mb-5 flex-grow">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-[9px] uppercase tracking-wider font-medium px-2 py-1 bg-[#FCF6EF] text-[#795558]/80 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Extra Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
           <p className="text-gray-500 font-light italic">
             Tem uma demanda específica? <a href="#contato" className="text-[#795558] underline decoration-1 underline-offset-4 hover:bg-[#FFDAF0]">Me chame e a gente conversa.</a>
           </p>
        </motion.div>

      </div>
    </section>
  );
}
