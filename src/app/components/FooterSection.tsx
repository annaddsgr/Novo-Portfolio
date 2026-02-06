import { motion } from 'motion/react';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 bg-[#FCF6EF]/30 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-sm font-light text-gray-500">
              © {currentYear} Designer Gráfica. Feito com cuidado e atenção.
            </p>
          </div>

          <div className="flex gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-[#795558] transition-colors duration-300"
            >
              Voltar ao topo
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
