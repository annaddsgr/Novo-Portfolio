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

    const goBack = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="min-h-screen bg-[#FCF6EF] py-8 md:py-16 px-4 md:px-12 flex flex-col items-center justify-start md:justify-center overflow-x-hidden">
            {/* Background Ornaments */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden text-[#795558]/5">
                <div className="absolute top-10 left-10 text-[20rem] font-serif italic">B</div>
                <div className="absolute bottom-10 right-10 text-[20rem] font-serif italic">A</div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full relative z-10"
            >
                <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-[#795558] hover:text-[#5A3D3F] transition-colors mb-12 group"
                >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Retornar</span>
                </button>

                <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(121,85,88,0.1)] border border-white p-8 md:p-16 relative overflow-hidden">
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="mb-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#795558]/40 block mb-4 italic">Strategic Investigation</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-[#795558] leading-tight mb-4">
                                Briefing <span className="italic font-light">Estratégico</span>
                            </h1>
                            <div className="w-20 h-[1.5px] bg-[#795558]/20" />
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-3 flex-shrink-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 border ${step >= i ? 'bg-[#795558] text-white border-[#795558]' : 'bg-transparent text-[#795558]/20 border-[#795558]/10'
                                        }`}>
                                        {i}
                                    </div>
                                    {i < 5 && <div className={`w-8 h-[1px] ${step > i ? 'bg-[#795558]/40' : 'bg-[#FCF6EF]'}`} />}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Identificação */}
                                {step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><User className="w-3 h-3" /> Nome Completo</label>
                                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Star className="w-3 h-3" /> Nome da Marca</label>
                                                <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-8">
                                            <div className="space-y-3 col-span-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">WhatsApp</label>
                                                <input type="text" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl" />
                                            </div>
                                            <div className="space-y-3 col-span-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">E-mail</label>
                                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl" />
                                            </div>
                                            <div className="space-y-3 col-span-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Instagram className="w-3 h-3" /> Instagram/Site</label>
                                                <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] transition-all rounded-t-xl" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Sobre a Marca */}
                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Search className="w-3 h-3" /> História e Essência da Marca</label>
                                            <textarea name="history" value={formData.history} onChange={handleChange} rows={3} placeholder="Conte um pouco sobre como surgiu e o que a marca representa..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] rounded-t-xl resize-none" />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Quem são seus concorrentes?</label>
                                                <textarea name="competitors" value={formData.competitors} onChange={handleChange} rows={2} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] rounded-t-xl resize-none" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">O que te diferencia deles?</label>
                                                <textarea name="differentiation" value={formData.differentiation} onChange={handleChange} rows={2} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none focus:border-[#795558] rounded-t-xl resize-none" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: O Projeto */}
                                {step === 3 && (
                                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="space-y-6">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Qual o serviço principal?</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {services.map((s) => (
                                                    <button key={s} type="button" onClick={() => handleServiceSelect(s)} className={`px-4 py-5 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-widest ${formData.service === s ? 'bg-[#795558] text-white border-[#795558] shadow-lg' : 'bg-white text-[#795558]/60 border-[#795558]/10 hover:border-[#795558]/30'}`}>{s}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Status do Projeto</label>
                                                <select name="isRedesign" value={formData.isRedesign} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl">
                                                    <option value="">Selecione...</option>
                                                    <option value="Criação do Zero">Criação do Zero</option>
                                                    <option value="Redesign / Modernização">Redesign / Modernização</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Layout className="w-3 h-3" /> Itens Específicos Necessários</label>
                                                <input type="text" name="deliverables" value={formData.deliverables} onChange={handleChange} placeholder="Ex: Cartão, Timbrado, Posts..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Estética */}
                                {step === 4 && (
                                    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Target className="w-3 h-3" /> Objetivo do Projeto</label>
                                                <textarea name="purpose" value={formData.purpose} onChange={handleChange} rows={2} placeholder="O que deseja alcançar?" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl resize-none" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Users className="w-3 h-3" /> Público-alvo</label>
                                                <textarea name="audience" value={formData.audience} onChange={handleChange} rows={2} placeholder="Para quem estamos falando?" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl resize-none" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">3 Palavras que definem a marca</label>
                                                <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Ex: Leveza, Luxo, Inovação" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Palette className="w-3 h-3" /> Preferências de Cores</label>
                                                <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="Mencione tons preferidos..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Inspirações ou Links (Opcional)</label>
                                            <input type="text" name="references" value={formData.references} onChange={handleChange} placeholder="Pinterest, Instagram..." className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl" />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 5: Logística */}
                                {step === 5 && (
                                    <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1 flex items-center gap-2"><Clock className="w-3 h-3" /> Prazo Estimado</label>
                                                <input type="text" name="deadline" required value={formData.deadline} onChange={handleChange} placeholder="Para quando precisa?" className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#795558]/50 ml-1">Orçamento Previsto</label>
                                                <select name="investment" required value={formData.investment} onChange={handleChange} className="w-full bg-[#FCF6EF]/40 border-b border-[#795558]/10 px-4 py-4 text-[#795558] focus:outline-none rounded-t-xl">
                                                    <option value="">Selecione...</option>
                                                    <option value="R$ 1.000 - R$ 2.500">R$ 1.000 - R$ 2.500</option>
                                                    <option value="R$ 2.500 - R$ 5.000">R$ 2.500 - R$ 5.000</option>
                                                    <option value="R$ 5.000 - R$ 10.000">R$ 5.000 - R$ 10.000</option>
                                                    <option value="Acima de R$ 10.000">Acima de R$ 10.000</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-[#FCF6EF]/30 rounded-3xl border border-[#795558]/5">
                                            <p className="text-[11px] text-[#795558]/50 leading-relaxed font-light italic">
                                                "Ao clicar em finalizar, um dossiê estratégico em PDF será gerado com todas as suas informações.
                                                Terei o prazer de analisar cada detalhe para transformarmos sua marca em algo inesquecível."
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Nav */}
                            <div className="flex items-center justify-between pt-12 border-t border-[#795558]/5">
                                {step > 1 ? (
                                    <button type="button" onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-[#795558]/40 hover:text-[#795558] transition-colors">Anterior</button>
                                ) : <div />}

                                {step < 5 ? (
                                    <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStep} disabled={step === 3 && !formData.service} className={`bg-[#795558] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl ${step === 3 && !formData.service ? 'opacity-50' : ''}`}>Próximo Passo</motion.button>
                                ) : (
                                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isSubmitting} className="bg-[#795558] text-white pl-10 pr-4 py-3 rounded-full flex items-center gap-6 font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl group">
                                        {isSubmitting ? 'Gerando Dossiê...' : 'Finalizar e Enviar'}
                                        <div className="w-12 h-12 rounded-full bg-white text-[#795558] flex items-center justify-center group-hover:rotate-12 transition-transform">
                                            <Send className="w-5 h-5" />
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-12 text-center opacity-30">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#795558]">&copy; 2024 Anna Designer Gráfico &bull; Processo Criativo Exclusivo</p>
                </div>
            </motion.div>
        </div>
    );
}
