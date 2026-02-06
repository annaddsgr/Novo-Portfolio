import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'sobre', label: t('nav.about') },
    { id: 'projetos', label: t('nav.projects') },
    { id: 'processo', label: 'Processo' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'contato', label: t('nav.contact') },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 flex items-center ${
          isScrolled ? 'bg-[#FCF6EF]/80 backdrop-blur-md shadow-sm h-20' : 'bg-transparent h-28'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt="Anna Designer Gráfico" 
              className={`transition-all duration-500 object-contain ${
                isScrolled ? 'h-14 md:h-20' : 'h-20 md:h-28'
              }`}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#795558]/60 hover:text-[#795558] transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#795558] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#795558]/20 hover:border-[#795558] transition-all text-[#795558] text-[10px] font-bold uppercase tracking-widest bg-white/50 backdrop-blur-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              {language.toUpperCase()}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#795558] p-2 relative z-[1001]"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#FCF6EF] z-[999] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-3xl font-serif text-[#795558] capitalize hover:scale-105 transition-transform"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => {
                  setLanguage(language === 'pt' ? 'en' : 'pt');
                  setIsMenuOpen(false);
                }}
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border border-[#795558]/20 text-[#795558] text-sm font-bold uppercase tracking-widest"
              >
                <Globe className="w-4 h-4" />
                {language === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
