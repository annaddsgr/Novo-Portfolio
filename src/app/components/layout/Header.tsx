import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getImagePath } from '@/app/utils/imagePath';
import { Magnetic } from './Magnetic';

export function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const navItems = [
    { id: 'sobre', label: t('nav.about') },
    { id: 'projetos', label: t('nav.projects') },
    { id: 'laboratorio', label: 'Laboratório' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'processo', label: 'Processo' },
    { id: 'contato', label: t('nav.contact') },
  ];

  const goBriefing = () => {
    navigate('/briefing');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-700 ease-in-out flex items-center ${isScrolled ? 'bg-[#FCF6EF]/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(121,85,88,0.05)] h-16 md:h-18 border-b border-[#795558]/5' : 'bg-[#FCF6EF]/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none shadow-sm md:shadow-none h-20 md:h-24'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center">
          {/* Logo */}
          <Magnetic>
            <motion.div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group cursor-pointer select-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={getImagePath('assets/logo.png')}
                alt="Anna Designer Gráfico"
                className={`transition-all duration-700 object-contain ${isScrolled ? 'h-8 md:h-12' : 'h-12 md:h-20'
                  }`}
              />
            </motion.div>
          </Magnetic>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-4 lg:gap-8">
              {navItems.map((item) => (
                <Magnetic key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.25em] text-[#795558]/50 hover:text-[#795558] transition-all relative group py-3 px-1 lg:px-2"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#795558] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-30" />
                  </button>
                </Magnetic>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-[#795558]/10" />

            <div className="flex items-center gap-4 lg:gap-6">
              <Magnetic>
                <button
                  onClick={goBriefing}
                  className="px-6 lg:px-8 py-2.5 rounded-full bg-[#795558] text-[#FCF6EF] text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#5A3D3F] transition-all shadow-[0_10px_20px_-5px_rgba(121,85,88,0.3)]"
                >
                  Iniciar Projeto
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-[#795558]/10 hover:border-[#795558]/30 transition-all text-[#795558] group relative overflow-hidden"
                >
                  <div className="relative z-10 text-[8px] lg:text-[9px] font-black">{language.toUpperCase()}</div>
                  <div className="absolute inset-0 bg-[#795558]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </Magnetic>
            </div>
          </nav>

          {/* Mobile Menu Toggle & Actions */}
          <div className="flex items-center gap-4 md:hidden pr-2">
            {/* Language Toggle Mobile */}
             <button
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#795558]/10 text-[#795558] text-[9px] font-black bg-white/50 backdrop-blur-sm shadow-sm"
            >
                {language.toUpperCase()}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-[6000] p-2.5 text-[#795558] bg-white/50 backdrop-blur-sm rounded-full border border-[#795558]/10 shadow-sm"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1.5 items-end w-6">
                 <span className={`block h-[2px] bg-current transition-all duration-300 origin-center ${isMenuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
                 <span className={`block h-[2px] bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`} />
                 <span className={`block h-[2px] bg-current transition-all duration-300 origin-center ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-6'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#FCF6EF] z-[5500] md:hidden"
          >
            {/* Artistic Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute top-20 left-[-10%] text-[40rem] font-serif italic text-[#795558] leading-none">A</div>
              <div className="absolute bottom-[-10%] right-[-10%] text-[40rem] font-serif italic text-[#795558] leading-none rotate-12">N</div>
            </div>

            <div className="relative h-full flex flex-col items-center justify-center px-12">
              <div className="flex flex-col gap-10 items-center">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="text-4xl sm:text-5xl font-serif text-[#795558] hover:italic transition-all group"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#795558]/20 transition-all group-hover:w-full" />
                    </span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={goBriefing}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-20 px-12 py-5 rounded-full bg-[#795558] text-[#FCF6EF] text-xs font-black uppercase tracking-[0.3em] shadow-2xl"
              >
                Iniciar Projeto
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-12 flex gap-8"
              >
                <a href="https://instagram.com/annadsgr" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-[#795558]/40">Instagram</a>
                <div className="w-[1px] h-3 bg-[#795558]/10" />
                <a href="mailto:contato@anna.com" className="text-[10px] font-black uppercase tracking-widest text-[#795558]/40">Email</a>
                <div className="w-[1px] h-3 bg-[#795558]/10" />
                <button
                   onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                   className="text-[10px] font-black uppercase tracking-widest text-[#795558]/40 hover:text-[#795558]"
                >
                   {language.toUpperCase()}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
