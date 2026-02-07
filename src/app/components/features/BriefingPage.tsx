import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ArrowLeft,
    Send,
    User,
    Briefcase,
    Target,
    Clock,
    Star,
    Instagram,
    Palette,
    Layout,
    Users,
    Search
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';

export function BriefingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        brandName: '',
        email: '',
        whatsapp: '',
        instagram: '',
        // Step 2: Sobre a Marca
        history: '',
        competitors: '',
        differentiation: '',
        // Step 3: O Projeto
        service: '',
        isRedesign: '', // Novo Projeto ou Redesign
        deliverables: '', // Entregáveis específicos
        // Step 4: Estética
        purpose: '',
        audience: '',
        keywords: '',
        colors: '',
        references: '',
        // Step 5: Logística
        deadline: '',
        investment: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceSelect = (service: string) => {
        setFormData({ ...formData, service });
    };

    const generatePDF = async () => {
        const doc = new jsPDF() as any;

        // Configurações de cores (Match with portfolio)
        const primaryColor = [121, 85, 88]; // #795558
        const bgColor = [252, 246, 239]; // #FCF6EF

        // Background Color
        doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
        doc.rect(0, 0, 210, 297, 'F');

        // Header
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, 0, 210, 45, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(26);
        doc.text("BRIEFING ESTRATÉGICO", 20, 25);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("ANNA DESIGNER GRÁFICO", 150, 25);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 150, 32);

        // Content Sections
        let currentY = 60;

        const drawSection = (title: string, data: { label: string, value: string }[]) => {
            // Check for space
            if (currentY > 240) {
                doc.addPage();
                doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
                doc.rect(0, 0, 210, 297, 'F');
                currentY = 20;
            }

            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text(title.toUpperCase(), 20, currentY);
            currentY += 5;
            doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.setLineWidth(0.5);
            doc.line(20, currentY, 190, currentY);
            currentY += 10;

            doc.setTextColor(60, 60, 60);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            data.forEach(item => {
                const linesValue = doc.splitTextToSize(item.value || "Não informado", 120);
                const blockHeight = (linesValue.length * 6) + 4;

                if (currentY + blockHeight > 275) {
                    doc.addPage();
                    doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
                    doc.rect(0, 0, 210, 297, 'F');
                    currentY = 20;
                }

                doc.setFont("helvetica", "bold");
                doc.text(`${item.label}:`, 20, currentY);
                doc.setFont("helvetica", "normal");
                doc.text(linesValue, 70, currentY);
                currentY += blockHeight;
            });

            currentY += 10;
        };

        drawSection("1. Identificação", [
            { label: "Cliente", value: formData.name },
            { label: "Empresa/Marca", value: formData.brandName },
            { label: "E-mail", value: formData.email },
            { label: "WhatsApp", value: formData.whatsapp },
            { label: "Instagram", value: formData.instagram }
        ]);

        drawSection("2. Sobre a Marca", [
            { label: "História", value: formData.history },
            { label: "Concorrentes", value: formData.competitors },
            { label: "Diferencial", value: formData.differentiation }
        ]);

        drawSection("3. O Projeto", [
            { label: "Serviço", value: formData.service },
            { label: "Tipo", value: formData.isRedesign },
            { label: "Entregáveis", value: formData.deliverables }
        ]);

        drawSection("4. Estratégia e Estética", [
            { label: "Objetivo", value: formData.purpose },
            { label: "Público-alvo", value: formData.audience },
            { label: "Palavras-chave", value: formData.keywords },
            { label: "Cores/Preferências", value: formData.colors },
            { label: "Referências", value: formData.references }
        ]);

        drawSection("5. Logística", [
            { label: "Prazo Desejado", value: formData.deadline },
            { label: "Investimento", value: formData.investment }
        ]);

        doc.setFontSize(8);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.5);
        doc.text("Este documento é confidencial e pertence ao processo criativo de Anna Designer.", 20, 285);

        const fileName = `Briefing_AnnaForm_${formData.name.replace(/\s+/g, '_')}.pdf`;
        const pdfBlob = doc.output('blob');
        return new File([pdfBlob], fileName, { type: 'application/pdf' });
    };

    const fallbackSubmit = (file: File, phone: string, text: string) => {
        // Download the file
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text + '\n\n(Estou enviando o arquivo PDF em anexo!)')}`;

        toast.info('Dossiê gerado! Agora é só anexar o arquivo no WhatsApp.');

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setIsSubmitting(false);
        }, 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const pdfFile = await generatePDF();
            const phoneNumber = "5531992781019";
            const message = `✨ *BRIEFING ESTRATÉGICO FINALIZADO* ✨\n\n` +
                `Olá Anna! Acabei de concluir o briefing estratégico.\n\n` +
                `👤 *Cliente:* ${formData.name}\n` +
                `🚀 *Projeto/Marca:* ${formData.brandName || 'Não informado'}\n` +
                `🛠️ *Serviço:* ${formData.service}`;

            // Check if Web Share API can share files
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
                try {
                    await navigator.share({
                        files: [pdfFile],
                        title: 'Briefing Estratégico - Anna Designer',
                        text: message,
                    });
                    toast.success('Briefing compartilhado com sucesso!');
                    setIsSubmitting(false);
                } catch (shareError) {
                    console.log("Share failed or cancelled, falling back", shareError);
                    fallbackSubmit(pdfFile, phoneNumber, message);
                }
            } else {
                fallbackSubmit(pdfFile, phoneNumber, message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao processar o briefing. Tente novamente.');
            setIsSubmitting(false);
        }
    };

    const services = [
        "Identidade Visual",
        "Social Design",
        "Web Experience",
        "Papelaria Premium",
        "Acompanhamento Mensal",
        "Outro"
    ];

    return (
        <div className="min-h-screen bg-[#FCF6EF] py-12 md:py-24 px-4 md:px-12 relative overflow-hidden">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#795558]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#795558]/3 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                {/* Header Nav */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 md:mb-20">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => {
                                window.history.pushState({}, '', import.meta.env.BASE_URL);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                            }}
                            className="group flex items-center gap-3 md:gap-4 text-[#795558]"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#795558] group-hover:text-white transition-all">
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Início</span>
                        </button>

                        <div className="w-[1px] h-6 bg-[#795558]/10 hidden md:block" />

                        {/* Direct Share Tool */}
                        <button
                            onClick={() => {
                                const url = window.location.href;
                                navigator.clipboard.writeText(url);
                                toast.success('Link do briefing copiado! Prontinho para enviar ao cliente.');
                            }}
                            className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-[#795558]/5 px-4 md:px-6 py-3 rounded-full hover:bg-[#795558] hover:text-white transition-all shadow-sm"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-400 group-hover:animate-ping" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Copiar Link Direto</span>
                        </button>
                    </div>

                    <div className="text-right hidden sm:block">
                        <span className="text-[9px] md:text-[10px] font-black tracking-widest text-[#795558]/30 uppercase">Passo {step} de 5</span>
                        <div className="w-24 md:w-32 h-[3px] bg-[#795558]/5 mt-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 5) * 100}%` }}
                                className="h-full bg-[#795558]"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(121,85,88,0.15)] overflow-hidden border border-[#795558]/5">
                    <div className="p-8 md:p-16 lg:p-20">
                        <header className="mb-12 md:mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#FCF6EF] rounded-full text-[#795558] mb-6 md:mb-8">
                                <Star className="w-3 h-3" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Dossiê Estratégico</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#795558] leading-tight">
                                {step === 1 && <>Vamos começar pelo <span className="italic font-light">essencial</span></>}
                                {step === 2 && <>Sua história é seu <span className="italic font-light">diferencial</span></>}
                                {step === 3 && <>O que vamos <span className="italic font-light">construir</span>?</>}
                                {step === 4 && <>A <span className="italic font-light">alma</span> visual da marca</>}
                                {step === 5 && <>Últimos <span className="italic font-light">ajustes</span></>}
                            </h1>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {/* Step 1: Info Base */}
                                {step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 md:space-y-12">
                                        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><User className="w-3 h-3" /> Seu Nome</label>
                                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Star className="w-3 h-3" /> Nome da Marca</label>
                                                <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl text-sm md:text-base" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">WhatsApp</label>
                                                <input type="text" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">E-mail</label>
                                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Instagram className="w-3 h-3" /> Instagram/Site</label>
                                                <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl text-sm md:text-base" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Sobre a Marca */}
                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Search className="w-3 h-3" /> História e Essência da Marca</label>
                                            <textarea name="history" value={formData.history} onChange={handleChange} rows={3} placeholder="Conte um pouco sobre como surgiu..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] rounded-t-xl resize-none text-sm md:text-base" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Quem são seus concorrentes?</label>
                                                <textarea name="competitors" value={formData.competitors} onChange={handleChange} rows={2} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] rounded-t-xl resize-none text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">O que te diferencia deles?</label>
                                                <textarea name="differentiation" value={formData.differentiation} onChange={handleChange} rows={2} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] rounded-t-xl resize-none text-sm md:text-base" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: O Projeto */}
                                {step === 3 && (
                                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="space-y-6">
                                            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Qual o serviço principal?</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                                {services.map((s) => (
                                                    <button key={s} type="button" onClick={() => handleServiceSelect(s)} className={`px-3 py-4 md:px-4 md:py-5 rounded-xl md:rounded-2xl border transition-all text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${formData.service === s ? 'bg-[#795558] text-white border-[#795558] shadow-lg' : 'bg-white text-[#795558]/60 border-[#795558]/10 hover:border-[#795558]/30'}`}>{s}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Status do Projeto</label>
                                                <select name="isRedesign" value={formData.isRedesign} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base">
                                                    <option value="">Selecione...</option>
                                                    <option value="Criação do Zero">Criação do Zero</option>
                                                    <option value="Redesign / Modernização">Redesign / Modernização</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Layout className="w-3 h-3" /> Itens Específicos Necessários</label>
                                                <input type="text" name="deliverables" value={formData.deliverables} onChange={handleChange} placeholder="Ex: Cartão, Posts..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Estética */}
                                {step === 4 && (
                                    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Target className="w-3 h-3" /> Objetivo do Projeto</label>
                                                <textarea name="purpose" value={formData.purpose} onChange={handleChange} rows={2} placeholder="O que deseja alcançar?" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl resize-none text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Users className="w-3 h-3" /> Público-alvo</label>
                                                <textarea name="audience" value={formData.audience} onChange={handleChange} rows={2} placeholder="Para quem falamos?" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl resize-none text-sm md:text-base" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">3 Palavras que definem a marca</label>
                                                <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Ex: Leveza, Luxo" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Palette className="w-3 h-3" /> Preferências de Cores</label>
                                                <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="Tons preferidos..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Inspirações ou Links (Opcional)</label>
                                            <input type="text" name="references" value={formData.references} onChange={handleChange} placeholder="Pinterest, Instagram..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base" />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 5: Logística */}
                                {step === 5 && (
                                    <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Clock className="w-3 h-3" /> Prazo Estimado</label>
                                                <input type="text" name="deadline" required value={formData.deadline} onChange={handleChange} placeholder="Para quando precisa?" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Orçamento Previsto</label>
                                                <select name="investment" required value={formData.investment} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl text-sm md:text-base">
                                                    <option value="">Selecione...</option>
                                                    <option value="R$ 1.000 - R$ 2.500">R$ 1.000 - R$ 2.500</option>
                                                    <option value="R$ 2.500 - R$ 5.000">R$ 2.500 - R$ 5.000</option>
                                                    <option value="R$ 5.000 - R$ 10.000">R$ 5.000 - R$ 10.000</option>
                                                    <option value="Acima de R$ 10.000">Acima de R$ 10.000</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8 bg-[#FCF6EF]/30 rounded-2xl md:rounded-3xl border border-[#795558]/5">
                                            <p className="text-[10px] md:text-[11px] text-[#795558]/50 leading-relaxed font-light italic">
                                                "Ao clicar em finalizar, um dossiê estratégico em PDF será gerado com todas as suas informações.
                                                Terei o prazer de analisar cada detalhe para transformarmos sua marca em algo inesquecível."
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Nav */}
                            <div className="flex items-center justify-between pt-10 md:pt-12 border-t border-[#795558]/5 mt-8 md:mt-12">
                                {step > 1 ? (
                                    <button type="button" onClick={prevStep} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#795558]/40 hover:text-[#795558] transition-colors">Anterior</button>
                                ) : <div />}

                                {step < 5 ? (
                                    <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStep} disabled={step === 3 && !formData.service} className={`bg-[#795558] text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-xl ${step === 3 && !formData.service ? 'opacity-50' : ''}`}>Próximo Passo</motion.button>
                                ) : (
                                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isSubmitting} className="bg-[#795558] text-white pl-8 pr-3 py-2 md:pl-10 md:pr-4 md:py-3 rounded-full flex items-center gap-4 md:gap-6 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-2xl group">
                                        {isSubmitting ? 'Gerando Dossiê...' : 'Finalizar'}
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#795558] flex items-center justify-center group-hover:rotate-12 transition-transform">
                                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-12 text-center opacity-30">
                    <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-[#795558]">&copy; 2026 Anna Designer Gráfico &bull; Processo Criativo Exclusivo</p>
                </div>
            </motion.div>
        </div>
    );
}
