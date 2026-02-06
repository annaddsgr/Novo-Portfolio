import { useState, useEffect } from 'react';
import { Accessibility, Type, RotateCcw, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const reset = () => {
    setFontSize(100);
    setHighContrast(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-[40] bg-[#795558] text-white p-3 rounded-full shadow-lg hover:bg-[#5A3D3F] transition-colors focus:outline-none focus:ring-4 focus:ring-[#795558]/30"
        aria-label="Opções de Acessibilidade"
        title="Acessibilidade"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-4 z-[50] w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-[#795558] p-4 flex justify-between items-center text-white">
              <span className="font-bold flex items-center gap-2">
                <Accessibility className="w-4 h-4" /> Acessibilidade
              </span>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tamanho da Fonte</span>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setFontSize(s => Math.max(80, s - 10))}
                    className="flex-1 p-2 hover:bg-white rounded-md transition-colors text-gray-600 flex justify-center"
                    aria-label="Diminuir fonte"
                  >
                    <Type className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-medium w-12 text-center text-black">{fontSize}%</span>
                  <button 
                    onClick={() => setFontSize(s => Math.min(150, s + 10))}
                    className="flex-1 p-2 hover:bg-white rounded-md transition-colors text-gray-600 flex justify-center"
                    aria-label="Aumentar fonte"
                  >
                    <Type className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* High Contrast */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${highContrast ? 'bg-black text-white ring-2 ring-yellow-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Eye className="w-4 h-4" /> Alto Contraste
                </span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${highContrast ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${highContrast ? 'left-6' : 'left-1'}`} />
                </div>
              </button>

              {/* Reset */}
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 p-2 text-xs font-medium text-gray-400 hover:text-[#795558] transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Restaurar Padrão
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
