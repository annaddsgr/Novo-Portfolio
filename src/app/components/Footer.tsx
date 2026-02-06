import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#795558] text-[#FCF6EF] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <p className="text-lg font-semibold">
            Designer Gráfico
          </p>
          <p className="text-white/80 flex items-center justify-center gap-2">
            Feito com intenção e afeto <Heart className="w-4 h-4 fill-current" />
          </p>
          <p className="text-white/60 text-sm">
            © 2026 Todos os direitos reservados • Feito por Anna
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
