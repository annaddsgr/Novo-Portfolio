import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Palette, RefreshCcw, Copy, Check, Type, Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import { toast } from 'sonner';

type ColorPalette = {
  id: string;
  name: string;
  description: string;
  vibe: string;
  mainColor: string;
  colors: { code: string; name: string }[];
  typography: { serif: string; sans: string };
  image: string;
  keywords: string[];
};

const palettes: ColorPalette[] = [
  {
    id: 'rose',
    name: 'Romance Moderno',
    description: 'Uma combinação delicada que transmite acolhimento, feminilidade e sofisticação sem esforço.',
    vibe: 'Delicada & Nostálgica',
    mainColor: '#E8A0BF',
    colors: [
      { code: '#E8A0BF', name: 'Rose' },
      { code: '#F6E6DA', name: 'Cream' },
      { code: '#795558', name: 'Cocoa' },
      { code: '#B08490', name: 'Mauve' }
    ],
    typography: { serif: 'Playfair Display', sans: 'Lato' },
    image: 'https://images.unsplash.com/photo-1541943130081-36dc45113945?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Feminino', 'Acolhedor', 'Elegante']
  },
  {
    id: 'earth',
    name: 'Raízes Naturais',
    description: 'Tons terrosos que conectam sua marca à natureza, estabilidade e calor humano.',
    vibe: 'Orgânica & Acolhedora',
    mainColor: '#Ccaea1',
    colors: [
      { code: '#Ccaea1', name: 'Clay' },
      { code: '#8C6A5D', name: 'Earth' },
      { code: '#EFEBE7', name: 'Sand' },
      { code: '#5C4842', name: 'Bark' }
    ],
    typography: { serif: 'Merriweather', sans: 'Montserrat' },
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Natural', 'Sustentável', 'Estável']
  },
  {
    id: 'sage',
    name: 'Fresh Balance',
    description: 'O equilíbrio perfeito entre frescor e calma. Ideal para marcas de bem-estar e saúde.',
    vibe: 'Leve & Renovadora',
    mainColor: '#9CAF88',
    colors: [
      { code: '#9CAF88', name: 'Sage' },
      { code: '#D9E3D3', name: 'Mint' },
      { code: '#5F7053', name: 'Forest' },
      { code: '#F5F7F2', name: 'Cloud' }
    ],
    typography: { serif: 'Lora', sans: 'Open Sans' },
    image: 'https://images.unsplash.com/photo-1627916607164-7b52244ea9eb?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Saúde', 'Frescor', 'Calma']
  },
  {
    id: 'ocean',
    name: 'Serenidade Profunda',
    description: 'Confiança e clareza. Tons de azul que comunicam profissionalismo com um toque de modernidade.',
    vibe: 'Elegante & Confiável',
    mainColor: '#8899AF',
    colors: [
      { code: '#8899AF', name: 'Steel' },
      { code: '#E6EAEE', name: 'Ice' },
      { code: '#3E5066', name: 'Navy' },
      { code: '#B4C0D0', name: 'Sky' }
    ],
    typography: { serif: 'Cormorant Garamond', sans: 'Inter' },
    image: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Profissional', 'Tecnológico', 'Clean']
  },
  {
    id: 'gold',
    name: 'Luz Dourada',
    description: 'Energia solar com elegância. Para marcas que querem brilhar e transmitir otimismo.',
    vibe: 'Radiante & Premium',
    mainColor: '#D4B889',
    colors: [
      { code: '#D4B889', name: 'Gold' },
      { code: '#FFF9F0', name: 'Milk' },
      { code: '#8C7550', name: 'Bronze' },
      { code: '#E6DCCF', name: 'Pearl' }
    ],
    typography: { serif: 'Cinzel', sans: 'Raleway' },
    image: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Luxo', 'Solar', 'Otimista']
  }
];

export function ColorInspiration() {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(palettes[0]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedColor(code);
    toast.success(`Cor ${code} copiada!`);
    setTimeout(() => setCopiedColor(null), 2000);
  };


  return (
    <section id="inspiracao" className="py-32 px-6 md:px-12 bg-[#FCF6EF] relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              background: `radial-gradient(circle at 50% 50%, ${selectedPalette.mainColor}20 0%, transparent 70%)` 
            }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-60"
          />
       </div>

       <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Palette className="w-4 h-4 text-[#795558]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#795558] font-bold">Laboratório Criativo</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-serif text-[#795558] mb-6 font-light">
               Descubra seu <span className="italic">Estilo Visual</span>
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto mb-12">
               Explore combinações de cores, tipografia e imagens. Um verdadeiro moodboard interativo para inspirar sua nova fase.
            </p>

            {/* Color Picker */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16">
               {palettes.map((palette) => (
                 <motion.button
                   key={palette.id}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setSelectedPalette(palette)}
                   className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-sm transition-all duration-300 border ${selectedPalette.id === palette.id ? 'bg-white border-[#795558]/20 ring-1 ring-[#795558]/20' : 'bg-white/50 border-transparent hover:bg-white'}`}
                 >
                    <div 
                      className="w-4 h-4 rounded-full border border-black/5" 
                      style={{ backgroundColor: palette.mainColor }}
                    />
                    <span className={`text-xs font-bold uppercase tracking-widest ${selectedPalette.id === palette.id ? 'text-[#795558]' : 'text-gray-400'}`}>
                      {palette.name}
                    </span>
                 </motion.button>
               ))}
            </div>
         </div>

         {/* Enhanced Moodboard Display Card */}
         <AnimatePresence mode="wait">
            <motion.div
              key={selectedPalette.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(121,85,88,0.1)] border border-[#795558]/5 grid lg:grid-cols-12"
            >
               
               {/* Left Column: Visuals */}
               <div className="lg:col-span-5 h-[400px] lg:h-auto relative overflow-hidden bg-[#fafafa]">
                  <img 
                    src={selectedPalette.image} 
                    alt={selectedPalette.vibe} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                     <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/20">
                        Visual Concept
                     </span>
                     <h3 className="text-3xl font-serif mb-2">{selectedPalette.vibe}</h3>
                     <div className="flex flex-wrap gap-2 mt-4">
                        {selectedPalette.keywords.map((keyword) => (
                           <span key={keyword} className="text-xs font-light opacity-80 bg-black/20 px-2 py-1 rounded">#{keyword}</span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right Column: Palette details */}
               <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                  
                  <div className="mb-12">
                     <h4 className="flex items-center gap-2 text-[#795558] font-serif text-2xl mb-6">
                        <Sparkles className="w-5 h-5 opacity-60" />
                        A Paleta
                     </h4>
                     <p className="text-gray-500 font-light mb-8 text-sm leading-relaxed max-w-lg">
                        {selectedPalette.description}
                     </p>

                     <div className="grid grid-cols-4 gap-4">
                        {selectedPalette.colors.map((color, index) => (
                           <motion.div
                              key={color.code}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group cursor-pointer"
                              onClick={() => handleCopy(color.code)}
                           >
                              <div 
                                 className="aspect-square rounded-2xl shadow-sm mb-3 relative overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md border border-gray-100" 
                                 style={{ backgroundColor: color.code }}
                              >
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                                    {copiedColor === color.code ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                                 </div>
                              </div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#795558] text-center opacity-60 group-hover:opacity-100">{color.name}</p>
                              <p className="text-[9px] text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">{color.code}</p>
                           </motion.div>
                        ))}
                     </div>
                  </div>

                  <div className="border-t border-[#795558]/5 pt-8">
                     <h4 className="flex items-center gap-2 text-[#795558] font-serif text-xl mb-6">
                        <Type className="w-5 h-5 opacity-60" />
                        Tipografia Ideal
                     </h4>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#fafafa] p-6 rounded-2xl border border-gray-100">
                           <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Título (Serif)</span>
                           <p className="text-2xl text-[#795558]" style={{ fontFamily: 'Georgia, serif' }}>{selectedPalette.typography.serif}</p>
                           <p className="text-xs text-gray-400 mt-1">Elegância e autoridade</p>
                        </div>
                        <div className="bg-[#fafafa] p-6 rounded-2xl border border-gray-100">
                           <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Texto (Sans)</span>
                           <p className="text-2xl text-[#795558]" style={{ fontFamily: 'Arial, sans-serif' }}>{selectedPalette.typography.sans}</p>
                           <p className="text-xs text-gray-400 mt-1">Clareza e modernidade</p>
                        </div>
                     </div>
                  </div>

               </div>

            </motion.div>
         </AnimatePresence>

         {/* Call to Action for Customization */}
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
         >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#795558]/10 shadow-sm cursor-pointer hover:shadow-md transition-all" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
               <LayoutTemplate className="w-4 h-4 text-[#795558]" />
               <span className="text-xs font-bold uppercase tracking-widest text-[#795558]">Gostou? Vamos criar a sua exclusiva</span>
            </div>
         </motion.div>
       </div>
    </section>
  );
}
