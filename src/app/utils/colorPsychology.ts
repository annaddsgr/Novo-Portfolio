
export interface ColorPsychology {
    title: string;
    description: string;
    archetype: string;
    keywords: string[];
    industries: string[];
    personality: string;
    matchType: string;
}

const HUE_Names = [
    { range: [0, 15], name: 'Vermelho', adj: 'Intenso', archetype: 'O Herói', feeling: 'paixão e urgência' },
    { range: [15, 40], name: 'Laranja', adj: 'Amigável', archetype: 'O Bobo da Corte', feeling: 'criatividade e conexão' },
    { range: [40, 65], name: 'Amarelo', adj: 'Otimista', archetype: 'O Inocente', feeling: 'intelecto e clareza' },
    { range: [65, 150], name: 'Verde', adj: 'Natural', archetype: 'O Explorador', feeling: 'crescimento e harmonia' },
    { range: [150, 190], name: 'Ciano', adj: 'Inovador', archetype: 'O Criador', feeling: 'fluidez e tecnologia' },
    { range: [190, 240], name: 'Azul', adj: 'Confiável', archetype: 'O Governante', feeling: 'segurança e verdade' },
    { range: [240, 290], name: 'Roxo', adj: 'Místico', archetype: 'O Mago', feeling: 'luxo e imaginação' },
    { range: [290, 330], name: 'Magenta', adj: 'Visionário', archetype: 'O Rebelde', feeling: 'ousadia e transformação' },
    { range: [330, 360], name: 'Rosa', adj: 'Empático', archetype: 'O Amante', feeling: 'afeto e cuidado' },
];

export const analyzeColor = (h: number, s: number, l: number): ColorPsychology => {
    // Normalize Hue
    const hue = h >= 345 ? 0 : h; // Wrap Red
    const baseH = HUE_Names.find(x => (hue >= x.range[0] && hue < x.range[1])) || HUE_Names[0];

    // Determine Tone
    let tone = 'Puro';
    let toneDesc = '';
    let personality = '';
    
    // Low Saturation (Grayish)
    if (s < 15) {
        tone = 'Neutro';
        toneDesc = 'A neutralidade deste tom traz equilíbrio e sofisticação minimalista.';
        personality = 'Pragmática, Segura, Elegante';
    }
    // High Lightness (Pastel)
    else if (l > 75) {
        tone = 'Pastel';
        toneDesc = 'A suavidade da luz eleva a cor a um estado etéreo e acolhedor.';
        personality = 'Gentil, Acessível, Calmante';
    }
    // Low Lightness (Deep)
    else if (l < 30) {
        tone = 'Profundo';
        toneDesc = 'A profundidade da sombra confere mistério, autoridade e solidez.';
        personality = 'Séria, Exclusiva, Atemporal';
    }
    // Low Saturation + Mid Lightness (Muted)
    else if (s < 45) {
        tone = 'Opaco';
        toneDesc = 'A desaturação cria uma atmosfera orgânica, madura e nostálgica.';
        personality = 'Discreta, Madura, Orgânica';
    }
    // High Saturation (Vibrant)
    else if (s > 80) {
        tone = 'Vibrante';
        toneDesc = 'A saturação máxima projeta energia elétrica e visibilidade total.';
        personality = 'Audaciosa, Dinâmica, Jovem';
    }
    else {
        tone = 'Equilibrado';
        toneDesc = 'Um equilíbrio cromático que comunica clareza sem agredir.';
        personality = 'Assertiva, Clara, Presente';
    }

    // Construct Title
    const title = `${baseH.name} ${tone}`;

    // Construct Description (Combinatorial)
    const feelings = [
        `Evocando ${baseH.feeling}, esta variante ${tone.toLowerCase()} reposiciona a marca.`,
        `A essência de ${baseH.feeling} é aqui filtrada por uma lente ${tone.toLowerCase()}.`,
        `Enquanto o ${baseH.name.toLowerCase()} base traz ${baseH.feeling}, o acabamento ${tone.toLowerCase()} adiciona nuances estratégicas.`,
        `Uma fusão de ${baseH.feeling} com a estética ${tone.toLowerCase()}.`
    ];
    
    // Simple deterministic randomizer based on H+S+L
    const idx = (Math.floor(h + s + l)) % feelings.length;
    const mainDesc = feelings[idx] + " " + toneDesc;

    // Industries
    const industriesMap: Record<string, string[]> = {
        'Vermelho': ['Alimentação', 'Esportes', 'Varejo', 'Entretenimento'],
        'Laranja': ['Criatividade', 'Serviços', 'Tecnologia', 'Turismo'],
        'Amarelo': ['Educação', 'Infantil', 'Logística', 'Fast Food'],
        'Verde': ['Saúde', 'Finanças', 'Sustentabilidade', 'Imobiliário'],
        'Ciano': ['Tech', 'Higiene', 'Comunicação', 'Aérea'],
        'Azul': ['Corporativo', 'Bancos', 'Direito', 'Medicina'],
        'Roxo': ['Luxo', 'Beleza', 'Espiritualidade', 'Games'],
        'Magenta': ['Moda', 'Design', 'Doces', 'Arte'],
        'Rosa': ['Skincare', 'Bem-estar', 'Moda Íntima', 'Infantil']
    };

    return {
        title,
        description: mainDesc,
        archetype: baseH.archetype,
        keywords: [baseH.adj, tone, personality.split(', ')[0]],
        industries: industriesMap[baseH.name] || ['Geral', 'Tech'],
        personality: personality,
        matchType: tone === 'Vibrante' ? 'Alto Impacto' : tone === 'Neutro' ? 'Minimalista' : 'Harmônico'
    };
};
