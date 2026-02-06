import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, Palette, Lightbulb } from 'lucide-react';

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#795558] mb-4">
             Muito prazer, eu sou a Anna
          </h2>
          <div className="w-24 h-1 bg-[#FFDAF0] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
           {/* Image Column */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="relative"
           >
            <div className="relative w-full max-w-md mx-auto">
               <motion.div
                 className="absolute -top-6 -right-6 w-32 h-32 bg-[#FFDAF0] rounded-full opacity-40 blur-3xl"
                 animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               />
               <motion.div
                 className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#795558] rounded-full opacity-20 blur-3xl"
                 animate={{ scale: [1.1, 1, 1.1], rotate: [0, -10, 0] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               />
               
               <div className="relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-700">
                 <ImageWithFallback
                   src={`${import.meta.env.BASE_URL}assets/profile_anna.jpg`}
                   alt="Anna - Designer Gráfica"
                   className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                 />
               </div>
            </div>
           </motion.div>

           {/* Content Column */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="space-y-8"
           >
             <div className="space-y-6 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
               <p>
                 Acredito que o design tem o poder de organizar, esclarecer e tocar. Mas, acima de tudo, ele é uma responsabilidade.
               </p>
               <p>
                 Meu trabalho não é inventar uma nova personalidade para você, mas sim revelar, com cuidado e técnica, o que já existe de mais autêntico.
                 Escolho trabalhar com calma para garantir que cada decisão visual tenha um porquê.
               </p>
             </div>

             <motion.div 
               className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={{
                 hidden: { opacity: 0 },
                 visible: {
                   opacity: 1,
                   transition: {
                     staggerChildren: 0.2
                   }
                 }
               }}
             >
               {[
                 { icon: Sparkles, title: "Escuta Atenta", desc: "Entender antes de criar", bg: "bg-[#FFDAF0]/30" },
                 { icon: Palette, title: "Olhar Consciente", desc: "Estética com função", bg: "bg-[#795558]/5" },
                 { icon: Lightbulb, title: "Construção", desc: "Processo sólido", bg: "bg-[#FCF6EF]" }
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   variants={{
                     hidden: { opacity: 0, y: 20 },
                     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                   }}
                   whileHover={{ y: -5, transition: { duration: 0.3 } }}
                   className={`${item.bg} p-6 rounded-2xl text-center group cursor-default`}
                 >
                   <item.icon className="w-8 h-8 mx-auto mb-4 text-[#795558] group-hover:scale-110 transition-transform duration-300" />
                   <h3 className="font-serif font-bold text-[#795558]">{item.title}</h3>
                   <p className="text-sm text-gray-500 mt-2 leading-snug">{item.desc}</p>
                 </motion.div>
               ))}
             </motion.div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
