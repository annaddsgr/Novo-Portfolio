import { motion } from 'motion/react';
import { Instagram, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Projetos", href: "#projetos" },
    { label: "Processo", href: "#processo" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com/annadsgr", icon: Instagram },
    // { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Email", href: "mailto:anna.designbr@gmail.com", icon: Mail },
  ];

  return (
    <footer className="bg-[#795558] text-[#FCF6EF] pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[20vw] font-serif leading-none text-center whitespace-nowrap">
          {/* ANNA DESIGN */}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between min-h-[400px]">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="flex items-center gap-3 mb-8"
              >
                 <div className="w-10 h-10 rounded-full bg-[#FCF6EF] flex items-center justify-center text-[#795558] font-serif text-xl font-bold">
                   A
                 </div>
                 <span className="text-xl font-serif tracking-wide">Anna Designer</span>
              </motion.div>
              <p className="text-[#FCF6EF]/60 font-light max-w-sm leading-relaxed text-sm">
                Criando universos visuais com alma, estratégia e delicadeza. Cada projeto é uma história que merece ser contada com beleza.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 opacity-40">Menu</h3>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a 
                    href={link.href} 
                    className="text-[#FCF6EF]/80 hover:text-white hover:pl-2 transition-all duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Socials & Contact */}
          <div className="md:col-span-4">
             <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 opacity-40">Conexão</h3>
             <ul className="space-y-4">
              {socialLinks.map((link, i) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#FCF6EF]/20 flex items-center justify-center group-hover:bg-[#FCF6EF] group-hover:text-[#795558] transition-all duration-300">
                      <link.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[#FCF6EF]/80 group-hover:text-white transition-colors font-light">
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FCF6EF]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#FCF6EF]/40 font-light tracking-wide text-center md:text-left">
            © 2026 Anna Designer. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-2 text-xs text-[#FCF6EF]/40 font-light">
            Feito com <Heart className="w-3 h-3 text-red-300 fill-red-300" /> e muita estratégia
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FCF6EF] hover:text-white transition-colors"
          >
            Voltar ao topo
            <div className="w-8 h-8 rounded-full bg-[#FCF6EF]/10 flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
