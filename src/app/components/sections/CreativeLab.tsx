import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
    MousePointer2,
    FlaskConical,
    Dna,
    MoveRight,
    Sparkles,
    Target,
    Layers,
    Hexagon,
    Menu,
    Palette
} from 'lucide-react';
import { analyzeColor } from '@/app/utils/colorPsychology';

// --- Utilities ---

const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

// --- Sub-Components ---

const AlchemyPicker = ({ onColorChange }: { onColorChange: (h: number, s: number, l: number) => void }) => {
    const [h, setH] = useState(15);
    const [s, setS] = useState(40);
    const [l, setL] = useState(45);
    const pickerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleUpdate = (clientX: number, clientY: number) => {
        if (!pickerRef.current) return;
        const rect = pickerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        let newH = (Math.atan2(dy, dx) * (180 / Math.PI)) + 90;
        if (newH < 0) newH += 360;
        const radius = rect.width / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let newS = (distance / (radius * 0.95)) * 100;
        if (newS > 100) newS = 100;
        setH(newH);
        setS(newS);
        onColorChange(newH, newS, l);
    };

    useEffect(() => {
        const handleUp = () => { isDragging.current = false; };
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging.current) {
                const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
                const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
                handleUpdate(clientX, clientY);
            }
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleUp);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [l]);

    return (
        <div className="flex flex-col items-center gap-12 w-full max-w-lg group">
            <div
                ref={pickerRef}
                className="relative aspect-square w-full rounded-full shadow-[0_50px_100px_rgba(121,85,88,0.1)] cursor-crosshair flex items-center justify-center p-3 bg-white border border-[#795558]/5"
                style={{
                    background: `
                        radial-gradient(circle at 50% 50%, white 0%, transparent 80%),
                        conic-gradient(from 0deg, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))
                    `
                }}
                onMouseDown={(e) => { isDragging.current = true; handleUpdate(e.clientX, e.clientY); }}
                onTouchStart={(e) => { isDragging.current = true; handleUpdate(e.touches[0].clientX, e.touches[0].clientY); }}
            >
                {/* Decorative Rings */}
                <div className="absolute inset-0 border border-[#795558]/5 rounded-full scale-[1.05] pointer-events-none" />
                <div className="absolute inset-0 border border-dashed border-[#795558]/10 rounded-full scale-[1.12] pointer-events-none group-hover:rotate-12 transition-transform duration-1000" />

                <motion.div
                    animate={{
                        left: `${50 + (s * 0.46 * Math.cos((h - 90) * Math.PI / 180))}%`,
                        top: `${50 + (s * 0.46 * Math.sin((h - 90) * Math.PI / 180))}%`
                    }}
                    className="absolute w-10 h-10 rounded-full border-4 border-white shadow-2xl z-20 flex items-center justify-center"
                    style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
                </motion.div>

                {/* Center Nucleus */}
                <div className="w-[38%] h-[38%] bg-[#FCF6EF] rounded-full shadow-inner border border-black/5 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/40 rounded-full animate-pulse" />
                    <div className="w-16 h-16 rounded-full shadow-2xl border-4 border-white relative z-10 overflow-hidden" style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Luminosity Slider */}
            <div className="w-full space-y-6 px-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#795558]/30 italic">Luminosidade</span>
                        <p className="text-xs font-serif text-[#795558]/60 italic">Afinando a vibração cromática</p>
                    </div>
                    <span className="text-xl font-serif text-[#795558]">{Math.round(l)}%</span>
                </div>
                <div className="relative h-6 flex items-center">
                    <div className="absolute inset-0 rounded-full bg-[#795558]/5 overflow-hidden">
                        <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(to right, #000, hsl(${h}, ${s}%, 50%), #fff)` }}
                        />
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="90"
                        value={l}
                        onChange={(e) => { setL(Number(e.target.value)); onColorChange(h, s, Number(e.target.value)); }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <motion.div
                        animate={{ left: `${l}%` }}
                        className="absolute w-8 h-8 bg-white rounded-full shadow-xl border border-[#795558]/10 -translate-x-1/2 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-1 h-3 bg-[#795558]/20 rounded-full" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export function CreativeLab() {
    const [activeColor, setActiveColor] = useState({ h: 15, s: 40, l: 45 });

    const navigate = useNavigate();

    const goBriefing = () => {
        navigate('/briefing');
    };

    // Use advanced Psychology analysis
    const colorData = analyzeColor(activeColor.h, activeColor.s, activeColor.l);
    
    // Hex Calculations for Display
    const mainHex = hslToHex(activeColor.h, activeColor.s, activeColor.l);
    const compHex = hslToHex((activeColor.h + 180) % 360, activeColor.s, activeColor.l);
    const analo1 = hslToHex((activeColor.h + 30) % 360, activeColor.s, activeColor.l);
    const analo2 = hslToHex((activeColor.h - 30 + 360) % 360, activeColor.s, activeColor.l);

    return (
        <section id="laboratorio" className="py-16 md:py-24 bg-[#FCF6EF] relative overflow-hidden">
            {/* Structural Ornaments */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#795558]" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#795558]" />
                <div className="absolute bottom-20 left-4 md:left-10 text-[10rem] md:text-[20rem] font-serif italic text-[#795558]">Lab</div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#795558]/10 bg-white shadow-sm">
                            <FlaskConical className="w-3.5 h-3.5 text-[#795558]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#795558]">Alquimia de Marca</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif text-[#795558] leading-[0.85] tracking-tight">
                            Color <br /> <span className="italic font-light opacity-60">Laboratory</span>
                        </h2>
                        <div className="max-w-xl mx-auto pt-8">
                            <p className="text-lg md:text-xl text-[#795558]/50 font-light italic leading-relaxed">
                                Explore a psicologia cromática através de uma curadoria técnica experimental. Transforme sensações em estratégia.
                            </p>
                        </div>
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-12 gap-12 md:gap-24 items-start">
                    {/* Interaction Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex flex-col items-center gap-16"
                    >
                        <AlchemyPicker onColorChange={(h, s, l) => setActiveColor({ h, s, l })} />

                        <div className="w-full p-8 rounded-[2.5rem] bg-white border border-[#795558]/10 shadow-sm space-y-8">
                            <div className="flex items-center gap-4 text-[#795558]/40 border-b border-[#795558]/5 pb-6">
                                <Dna className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Propriedades do Matiz</span>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Hex Code</span>
                                    <p className="text-2xl font-serif text-[#795558] tracking-wider">{mainHex}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Classificação</span>
                                    <p className="text-xl font-serif italic text-[#795558]/70 leading-tight">{colorData.title}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Result Side */}
                    <div className="lg:col-span-7 flex flex-col gap-12 pt-0 lg:pt-12">
                        <motion.div
                            key={mainHex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_50px_120px_-20px_rgba(121,85,88,0.12)] border border-[#795558]/5 relative overflow-hidden"
                        >
                            {/* Abstract Element inside card */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.04]" style={{ backgroundColor: mainHex }} />

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
                                <motion.div animate={{ backgroundColor: mainHex }} className="w-24 h-24 md:w-28 md:h-28 rounded-[2.5rem] shadow-2xl border-8 border-[#FCF6EF]" />
                                <div className="space-y-3">
                                    <h3 className="text-4xl md:text-5xl font-serif text-[#795558] leading-tight italic">Estratégia Visual</h3>
                                    <div className="flex gap-3 flex-wrap">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#795558]/5 border border-[#795558]/10">
                                            <Target className="w-3 h-3 text-[#795558]" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#795558]">{colorData.archetype}</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#795558]/5 border border-[#795558]/10">
                                            <Layers className="w-3 h-3 text-[#795558]" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#795558]">{colorData.matchType}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <div className="w-12 h-[1.5px] bg-[#795558]/10" />
                                    <p className="text-2xl md:text-3xl text-[#795558] font-serif font-light leading-snug italic text-balance">
                                        "{colorData.description}"
                                    </p>
                                </div>

                                <div className="py-6 border-y border-[#795558]/5">
                                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#795558]/30 mb-4 flex items-center gap-2"><Hexagon className="w-3 h-3" /> Setores Recomendados</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {colorData.industries.map(ind => (
                                            <span key={ind} className="px-3 py-1.5 bg-[#FCF6EF] rounded-lg text-xs font-bold text-[#795558]/70 border border-[#795558]/5 uppercase tracking-wide">{ind}</span>
                                        ))}
                                    </div>
                                </div>

                                <section className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#795558]/30 flex items-center gap-2"><Sparkles className="w-3 h-3" /> Personalidade da Marca</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {colorData.keywords.map((kw, i) => (
                                            <span key={i} className="text-lg md:text-xl font-serif italic text-[#795558] opacity-80 decoration-1 underline decoration-[#795558]/20 underline-offset-4">{kw}</span>
                                        ))}
                                        <span className="text-lg md:text-xl font-serif italic text-[#795558]/40">{colorData.personality}</span>
                                    </div>
                                </section>

                                <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-[#795558]/5">
                                    {[
                                        { t: 'Harmonia', c: compHex, desc: 'Contraste' },
                                        { t: 'Análoga A', c: analo1, desc: 'Continuidade' },
                                        { t: 'Análoga B', c: analo2, desc: 'Profundidade' }
                                    ].map(h => (
                                        <div key={h.t} className="group/item flex flex-col gap-3 md:gap-4">
                                            <motion.div
                                                animate={{ backgroundColor: h.c }}
                                                className="h-20 md:h-24 rounded-[1.5rem] md:rounded-[2rem] border-4 border-[#FCF6EF] shadow-lg group-hover/item:scale-105 transition-transform"
                                            />
                                            <div className="text-center">
                                                <span className="text-[9px] md:text-[10px] font-black text-[#795558] uppercase tracking-widest block">{h.t}</span>
                                                <span className="text-[8px] text-[#795558]/30 uppercase tracking-tighter">{h.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={goBriefing}
                            className="group relative w-full bg-[#795558] p-12 rounded-[3rem] text-[#FCF6EF] overflow-hidden shadow-2xl hover:shadow-[#795558]/40 transition-all"
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="text-left space-y-2">
                                    <h4 className="text-2xl md:text-3xl font-serif text-white">Criar Projeto Baseado nisto</h4>
                                    <p className="text-[9px] uppercase tracking-[0.5em] text-white/50 font-black">Iniciar Briefing Customizado</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                    <MoveRight className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
