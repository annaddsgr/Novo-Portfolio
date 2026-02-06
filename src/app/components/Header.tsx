import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-8">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            className="block z-50 relative"
          >
            <img 
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt="Anna Designer Gráfico" 
              className="h-16 md:h-28 w-auto object-contain"
            />
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 lg:gap-12 items-center">
            {['sobre', 'projetos', 'processo', 'contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm uppercase tracking-widest text-gray-600 hover:text-[#795558] transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#795558] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#795558] z-50 relative p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-0 left-0 w-full bg-[#FCF6EF] z-40 flex flex-col items-center justify-center gap-8 md:hidden overflow-hidden"
          >
             <div className="flex flex-col gap-8 text-center">
              {['sobre', 'projetos', 'processo', 'contato'].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-2xl font-serif text-[#795558] capitalize hover:scale-105 transition-transform"
                >
                  {item}
                </motion.button>
              ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
