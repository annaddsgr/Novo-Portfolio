import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/features/figma/ImageWithFallback';
import { Sparkles, Palette, Lightbulb } from 'lucide-react';
import { getImagePath } from '@/app/utils/imagePath';

export function AboutMobile() {
  return (
    <section id="sobre" className="py-16 px-6 bg-white overflow-hidden relative">
      {/* Reduced Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-8 w-[1px] h-full bg-[#795558]" />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 flex flex-col gap-10">

        {/* 1. Header with 'Since' badge */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
        >
            <div className="h-[1px] w-8 bg-[#795558]/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#795558]/50 italic">Since 2019</span>
        </motion.div>

        {/* 2. Main Title - Big & Bold */}
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-serif text-[#795558] leading-[1.1]"
        >
            Olá, muito <br /> 
            <span className="italic font-light opacity-80 block ml-8">prazer.</span>
        </motion.h2>

        {/* 3. Image - Full Width Style */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <div className="absolute inset-0 bg-[#795558]/10 mix-blend-multiply z-10" />
            <ImageWithFallback
                src={getImagePath('assets/profile_anna.jpg')}
                alt="Anna - Designer"
                className="w-full h-full object-cover"
            />
            
            {/* Minimalist Floating Badge */}
            <div className="absolute bottom-4 right-4 bg-[#FCF6EF] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
                <Sparkles className="w-3 h-3 text-[#795558]" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#795558]">Essência</span>
            </div>
        </div>

        {/* 4. Text Content - Left Aligned & Readable */}
        <div className="space-y-6 text-[#795558]/80 font-light leading-relaxed text-[15px]">
            <p className="font-serif italic text-xl text-[#795558] border-l-2 border-[#795558]/20 pl-4">
                Sou apaixonada por criar conexões visuais que tocam a alma.
            </p>
            <p>
                Trabalho além da estética. Meu compromisso é com a autenticidade e a clareza visual, construindo pontes entre propósitos e resultados reais.
            </p>
        </div>

        {/* 5. Mission/Vision Cards - Stacked or Horizontal Scroll */}
        <div className="grid grid-cols-1 gap-4 pt-4 border-t border-[#795558]/10">
            <div className="bg-[#FCF6EF]/50 p-5 rounded-xl border border-[#795558]/5">
                <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="w-4 h-4 text-[#795558]" />
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#795558]">Missão</h4>
                </div>
                <p className="text-xs text-[#795558]/70">Transformar essências em identidades potentes com estratégia.</p>
            </div>
            
            <div className="bg-[#FCF6EF]/50 p-5 rounded-xl border border-[#795558]/5">
                <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-4 h-4 text-[#795558]" />
                     <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#795558]">Visão</h4>
                </div>
                <p className="text-xs text-[#795558]/70">Ser a referência em design que conecta marcas a corações.</p>
            </div>
        </div>

        {/* 6. Tags - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            {["Minimalismo", "Estratégia", "Curadoria", "Propósito"].map((tag, i) => (
                <span key={i} className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.2em] text-[#795558]/50 border border-[#795558]/10 px-3 py-1.5 rounded-full bg-white">
                {tag}
                </span>
            ))}
        </div>

      </div>
    </section>
  );
}
