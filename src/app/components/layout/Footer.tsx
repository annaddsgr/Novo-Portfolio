import { motion } from 'motion/react';
import { Instagram, Mail, ArrowUp, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { getImagePath } from '@/app/utils/imagePath';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "O Início", id: "hero" },
    { label: "Sobre Mim", id: "sobre" },
    { label: "Arquivo", id: "projetos" },
    { label: "Laboratório", id: "laboratorio" },
    { label: "Especialidades", id: "servicos" },
  ];

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#795558] text-[#FCF6EF] pt-24 md:pt-40 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Editorial Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#FCF6EF]" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#FCF6EF]" />
        <h1 className="absolute -bottom-10 -left-10 text-[35vw] font-serif italic text-white leading-none">A</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32 md:mb-48">

          {/* Column 1: The Grand Statement */}
          <div className="lg:col-span-6 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-[#FCF6EF]/40">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Visual Strategist</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-serif leading-[0.9] text-white">
                Vamos criar <br />
                <span className="italic font-light opacity-60">o extraordinário.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#FCF6EF]/30 block">Location</span>
                <div className="flex items-center gap-3 text-lg font-serif italic">
                  <MapPin className="w-4 h-4 opacity-50" />
                  Belo Horizonte, MG
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#FCF6EF]/30 block">Status</span>
                <div className="flex items-center gap-3 text-lg font-serif italic">
                  <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  Agenda Aberta / 2026
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Socials */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-2 gap-12">
            {/* Sitemap */}
            <div className="space-y-10">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#FCF6EF]/30">Diretório</span>
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <motion.li key={link.id} whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-xl md:text-2xl font-serif text-[#FCF6EF]/70 hover:text-white transition-all italic hover:not-italic"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Connection */}
            <div className="space-y-10">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#FCF6EF]/30">Conexão Digital</span>
              <div className="flex flex-col gap-6">
                {[
                  { label: 'Instagram', url: 'https://instagram.com/annadsgr', icon: Instagram },
                  { label: 'Email Me', url: 'mailto:contato@anna.com', icon: Mail },
                ].map((social) => (
                  <Magnetic key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 bg-[#FCF6EF]/5 border border-[#FCF6EF]/10 p-4 rounded-2xl hover:bg-[#FCF6EF] hover:text-[#795558] transition-all"
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{social.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Typographic Brand */}
        <div className="border-t border-[#FCF6EF]/10 pt-16 mt-16 md:mt-32">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="space-y-6 max-w-sm">
              <img
                src={getImagePath('assets/logo.png')}
                alt="Anna Designer"
                className="h-12 md:h-20 brightness-200 grayscale contrast-200"
              />
              <p className="text-xs md:text-sm text-[#FCF6EF]/40 font-light leading-relaxed italic">
                Identidade visual, estratégia e design editorial com foco no extraordinário. Criado com alma no Brasil.
              </p>
            </div>

            <div className="flex flex-col items-end gap-6">
              <Magnetic>
                <button
                  onClick={scrollToTop}
                  className="group w-24 h-24 rounded-full border border-[#FCF6EF]/20 flex flex-col items-center justify-center gap-2 hover:bg-white hover:text-[#795558] transition-all"
                >
                  <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">Topo</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="mt-24 pt-8 border-t border-[#FCF6EF]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FCF6EF]/20">
            © {currentYear} Anna Designer — Todos os Diretos Reservados
          </div>

          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCF6EF]/20">
            <span className="hover:text-[#FCF6EF]/80 cursor-default">Privacy</span>
            <span className="hover:text-[#FCF6EF]/80 cursor-default">Terms</span>
            <span className="italic">Design by Anna</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
