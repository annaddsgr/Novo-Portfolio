import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('anna-portfolio-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000); // Aparece depois de 2s
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('anna-portfolio-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-[#E8DCCA] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
            <div className="flex items-start gap-4">
              <div className="bg-[#FCF6EF] p-2 rounded-full hidden md:block">
                 <Cookie className="w-6 h-6 text-[#795558]" />
              </div>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Este site utiliza cookies para garantir que você tenha a melhor experiência possível. Nada invasivo, apenas o essencial para tudo funcionar bem. 🍪
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
               <button 
                 onClick={() => setIsVisible(false)}
                 className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-[#795558] hover:bg-[#FCF6EF] rounded-xl transition-colors"
               >
                 Fechar
               </button>
               <button 
                 onClick={handleAccept}
                 className="flex-1 md:flex-none px-8 py-2.5 text-sm font-medium text-white bg-[#795558] hover:bg-[#5A3D3F] rounded-xl shadow-lg shadow-[#795558]/10 transition-all"
               >
                 Concordar
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
