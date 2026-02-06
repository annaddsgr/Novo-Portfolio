import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Mail, Send, CheckCircle, ArrowRight } from 'lucide-react';
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
    
    const phoneNumber = "5531992781019";
    const text = `Olá Anna! Me chamo *${formData.name}*.\n\n${formData.message}\n\n(Meu email para contato é: ${formData.email})`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    toast.success('Redirecionando para o WhatsApp...');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      url: "https://www.instagram.com/annadsgr?igsh=ZzRleWVic3luc2gw&utm_source=qr",
      color: "bg-[#FFDAF0]",
      hoverColor: "text-[#795558]"
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:contato@designer.com",
      color: "bg-[#FCF6EF]",
      hoverColor: "text-[#795558]"
    }
  ];

  return (
    <section id="contato" className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img 
            src={`${import.meta.env.BASE_URL}assets/organic_shape_wave.png`}
            alt=""
            className="absolute bottom-0 left-[-10%] w-[50%] opacity-20 rotate-12"
            animate={{ rotate: [12, 10, 15, 12], y: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#795558] mb-6">
            Vamos conversar?
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Se fizer sentido pra você, a gente pode trocar uma ideia. Sem compromisso, apenas para ouvir sua história e ver se podemos caminhar juntos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <label htmlFor="name" className="block text-[#795558] font-medium mb-3 pl-1 text-sm tracking-wide opacity-80 group-focus-within:opacity-100 transition-opacity">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white border border-[#E8DCCA] focus:border-[#FFDAF0] focus:shadow-[0_4px_20px_-10px_rgba(121,85,88,0.1)] outline-none transition-all duration-300 placeholder-gray-400 font-light"
                  placeholder="Como prefere ser chamado?"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-[#795558] font-medium mb-3 pl-1 text-sm tracking-wide opacity-80 group-focus-within:opacity-100 transition-opacity">
                  Seu melhor email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white border border-[#E8DCCA] focus:border-[#FFDAF0] focus:shadow-[0_4px_20px_-10px_rgba(121,85,88,0.1)] outline-none transition-all duration-300 placeholder-gray-400 font-light"
                  placeholder="Pra gente manter contato"
                />
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-[#795558] font-medium mb-3 pl-1 text-sm tracking-wide opacity-80 group-focus-within:opacity-100 transition-opacity">
                  O que você tem em mente?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl bg-white border border-[#E8DCCA] focus:border-[#FFDAF0] focus:shadow-[0_4px_20px_-10px_rgba(121,85,88,0.1)] outline-none transition-all duration-300 resize-none placeholder-gray-400 font-light"
                  placeholder="Pode ser apenas uma ideia inical..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, boxShadow: "0 10px 30px -10px rgba(121, 85, 88, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#795558] text-white py-5 rounded-xl font-serif text-lg tracking-wide hover:bg-[#8A6B6D] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#795558]/10"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-light">Obrigado pelo contato!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="font-light">Iniciar conversa</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links & Info & Briefing */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >


            <div className="bg-[#FCF6EF]/50 rounded-[2rem] p-10">
              <h3 className="text-2xl font-serif text-[#795558] mb-8">
                Outros lugares
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-6 p-4 rounded-2xl bg-white hover:shadow-md transition-all duration-300 group cursor-pointer border border-transparent hover:border-[#FFDAF0]"
                    >
                      <div className={`w-14 h-14 rounded-full ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-[#795558]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#795558] text-lg">
                          {social.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {social.label === "Email" ? "Ficar à vontade" : "Ver o dia a dia"}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="px-4">
              <h3 className="text-xl font-serif text-[#795558] mb-4">
                No seu tempo
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                Estou sempre por aqui para trocar ideias. Não se preocupe em ter um projeto pronto na cabeça.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Respondo assim que possível</span>
              </div>
            </div>
            

          </motion.div>
        </div>
      </div>
    </section>
  );
}
