import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 md:py-32 px-6 md:px-12 bg-[#FCF6EF]/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-light">
                Quem sou eu
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#795558] leading-tight">
                Olá, muito prazer
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg font-light">
                Sou uma designer gráfica apaixonada por criar conexões visuais significativas. 
                Meu trabalho vai além da estética — busco entender profundamente cada projeto 
                para criar soluções que realmente façam sentido.
              </p>
              
              <p className="text-lg font-light">
                Com mais de 5 anos de experiência, tenho o privilégio de trabalhar com marcas 
                que valorizam autenticidade e qualidade. Acredito que bom design é aquele que 
                comunica com clareza e toca as pessoas.
              </p>

              <p className="text-lg font-light">
                Quando não estou criando, você me encontra explorando novos cafés, 
                folheando livros de arte ou passeando com meu cachorro.
              </p>
            </div>

            <div className="flex gap-6 pt-4">
              <div className="border-l-2 border-[#795558] pl-6">
                <p className="text-3xl font-light text-[#795558]">5+</p>
                <p className="text-sm uppercase tracking-wider text-gray-500 mt-1">Anos</p>
              </div>
              <div className="border-l-2 border-[#795558] pl-6">
                <p className="text-3xl font-light text-[#795558]">50+</p>
                <p className="text-sm uppercase tracking-wider text-gray-500 mt-1">Projetos</p>
              </div>
              <div className="border-l-2 border-[#795558] pl-6">
                <p className="text-3xl font-light text-[#795558]">30+</p>
                <p className="text-sm uppercase tracking-wider text-gray-500 mt-1">Clientes</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1626784579980-db39c1a13aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHBvcnRyYWl0JTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY5MzU4MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Designer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-[#FFDAF0] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
