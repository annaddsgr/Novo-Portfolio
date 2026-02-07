import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Configura o número e a mensagem do WhatsApp
    const phoneNumber = "5531992781019";
    const text = `Olá Anna! ✨\n\nMe chamo *${formData.name}*.\n\n${formData.message}\n\n(Meu email para contato é: ${formData.email})`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    toast.success('Iniciando conversa no WhatsApp...');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white to-[#FCF6EF]">
      {/* Decorative Background */}
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFDAF0]/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#795558]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#795558]/60 font-bold">Contato</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-6xl font-serif text-[#795558] mb-6 md:mb-8 font-light leading-tight"
          >
            Vamos criar algo <span className="italic">único</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 font-light max-w-lg mx-auto text-sm md:text-base px-4"
          >
            Me conte sobre sua história. Prometo ler cada palavra com carinho e responder o mais breve possível.
          </motion.p>
        </div>

        {/* The Card */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(121,85,88,0.1)] overflow-hidden flex flex-col lg:flex-row relative z-10 border border-[#795558]/5">

          {/* Left: Contact Info & Vibe */}
          <div className="lg:w-[40%] bg-[#795558] text-[#FCF6EF] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Abstract Texture */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-serif mb-2 italic text-white">Anna Designer</h3>
              <p className="text-[#FCF6EF]/60 text-xs font-light uppercase tracking-widest">Belo Horizonte - Brasil</p>
            </div>

            <div className="relative z-10 space-y-6 md:space-y-8 my-10 md:my-12">
              <a href="mailto:contato@annadesigner.com" className="flex items-center gap-4 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#795558] transition-all duration-500">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Email</p>
                  <p className="font-serif text-base md:text-lg">contato@anna.com.br</p>
                </div>
              </a>

              <a href="https://instagram.com/annadsgr" target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#795558] transition-all duration-500">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Instagram</p>
                  <p className="font-serif text-base md:text-lg">@annadsgr</p>
                </div>
              </a>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10">
              <p className="text-xs md:text-sm font-light opacity-60 leading-relaxed italic">
                "O design é a linguagem silenciosa que conecta marcas a corações."
              </p>
            </div>
          </div>

          {/* Right: The Letter Form */}
          <div className="lg:w-[60%] p-8 md:p-16">
            <h4 className="text-xl md:text-3xl font-serif text-[#795558] mb-8 md:mb-10 text-center lg:text-left">Envie uma mensagem</h4>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[9px] md:text-xs font-black uppercase tracking-widest text-[#795558]/50 ml-1">Seu Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Como te chamam?"
                    className="w-full bg-[#FCF6EF]/30 border-b border-[#795558]/10 px-4 py-3 md:py-4 text-[#795558] placeholder-[#795558]/30 focus:outline-none focus:border-[#795558] transition-colors rounded-t-lg hover:bg-[#FCF6EF]/50 text-sm md:text-base shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[9px] md:text-xs font-black uppercase tracking-widest text-[#795558]/50 ml-1">Seu Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Para contato"
                    className="w-full bg-[#FCF6EF]/30 border-b border-[#795558]/10 px-4 py-3 md:py-4 text-[#795558] placeholder-[#795558]/30 focus:outline-none focus:border-[#795558] transition-colors rounded-t-lg hover:bg-[#FCF6EF]/50 text-sm md:text-base shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[9px] md:text-xs font-black uppercase tracking-widest text-[#795558]/50 ml-1">Sua Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Conte um pouco sobre sua ideia..."
                  className="w-full bg-[#FCF6EF]/30 border-b border-[#795558]/10 px-4 py-3 md:py-4 text-[#795558] placeholder-[#795558]/30 focus:outline-none focus:border-[#795558] transition-colors resize-none rounded-t-lg hover:bg-[#FCF6EF]/50 text-sm md:text-base shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    window.history.pushState({}, '', `${import.meta.env.BASE_URL}briefing`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#795558]/40 hover:text-[#795558] transition-colors mt-2 block ml-1"
                >
                  Ou clique aqui para preencher um briefing completo ✨
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-2 text-[#795558]/40 text-[9px] md:text-xs font-bold uppercase tracking-widest order-2 md:order-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Agenda 2026 Aberta
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={submitted}
                  className="w-full md:w-auto bg-[#795558] text-white pl-8 pr-2 py-2 rounded-full flex items-center justify-center md:justify-start gap-4 hover:bg-[#5A3D3F] transition-all shadow-lg hover:shadow-xl hover:shadow-[#795558]/20 group order-1 md:order-2"
                >
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {submitted ? 'Enviado!' : 'Conversar via WhatsApp'}
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-[#795558] flex items-center justify-center group-hover:rotate-45 transition-transform flex-shrink-0">
                    {submitted ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> : <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
