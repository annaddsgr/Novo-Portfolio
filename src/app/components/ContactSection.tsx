import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success('Mensagem enviada! Vou retornar em breve :)');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-light mb-4">
            Vamos conversar
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#795558] leading-tight mb-6">
            Pronta para novos projetos
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Se você tem um projeto em mente ou quer apenas trocar ideias, 
            adoraria ouvir de você. Respondo todos os emails pessoalmente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm uppercase tracking-widest text-gray-500">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 focus:border-[#795558] outline-none transition-colors duration-300 bg-transparent"
                placeholder="Seu nome"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm uppercase tracking-widest text-gray-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 focus:border-[#795558] outline-none transition-colors duration-300 bg-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm uppercase tracking-widest text-gray-500">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border-b border-gray-300 py-3 focus:border-[#795558] outline-none transition-colors duration-300 resize-none bg-transparent"
                placeholder="Conte-me sobre seu projeto..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4 bg-[#795558] text-white text-sm uppercase tracking-widest hover:bg-[#8A6B6D] transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Email */}
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-widest text-gray-400">Email</p>
              <a 
                href="mailto:contato@designer.com"
                className="text-xl md:text-2xl font-light text-[#795558] hover:opacity-70 transition-opacity duration-300 block"
              >
                contato@designer.com
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-gray-400">Conecte-se</p>
              <div className="flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-[#795558] hover:text-[#795558] transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-[#795558] hover:text-[#795558] transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contato@designer.com"
                  className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-[#795558] hover:text-[#795558] transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="pt-8 border-t border-gray-200 space-y-3">
              <p className="text-sm uppercase tracking-widest text-gray-400">Disponibilidade</p>
              <p className="text-base text-gray-600 font-light leading-relaxed">
                Atualmente disponível para projetos freelance. 
                <br />
                Respondo emails em até 24 horas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
