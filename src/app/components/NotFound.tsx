import { motion } from "motion/react";
import { Home, ArrowLeft, RefreshCcw, Search } from "lucide-react";

interface NotFoundProps {
  onBack?: () => void;
}

export function NotFound({ onBack }: NotFoundProps) {
  const handleGoHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6EF] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#795558]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#795558]/5 rounded-full blur-[120px]" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12"
        >
          {/* Large 404 Text with Stylized Design */}
          <h1 className="text-[12rem] md:text-[18rem] font-serif leading-none text-[#795558]/10 select-none">
            404
          </h1>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border border-[#795558]/10"
            >
              <Search className="w-12 h-12 md:w-20 md:h-20 text-[#795558]/30 stroke-[1]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#795558]">
            Caminho não encontrado
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Parece que essa página se perdeu no processo criativo. 
            Não se preocupe, vamos te levar de volta para um lugar seguro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={handleGoHome}
              className="group relative flex items-center gap-3 bg-[#795558] text-[#FCF6EF] px-8 py-4 rounded-xl hover:bg-[#5A3D3F] transition-all duration-300 shadow-lg hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Voltar ao Início</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-3 bg-white text-[#795558] border border-[#795558]/20 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <RefreshCcw className="w-5 h-5" />
              <span className="font-medium">Tentar Novamente</span>
            </button>
          </div>
        </motion.div>

        {/* Footer info 404 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex items-center justify-center gap-8 text-[#795558]/30 text-xs font-bold uppercase tracking-widest"
        >
          <span className="flex items-center gap-2">Design Estratégico</span>
          <span className="w-1 h-1 rounded-full bg-[#795558]/20" />
          <span className="flex items-center gap-2">Anna Designer</span>
        </motion.div>
      </div>
    </div>
  );
}
