export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  challenge: string;
  personalPhrase: string;
  process: { step: string; description: string }[];
  colors: string[];
  typography: string[];
  mockups: string[];
  layoutType?: 'grid' | 'carousel';
  deliverables?: string[];
  virtualSlideCount?: number;
  results?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Alegria Doce Ateliê",
    category: "Identidade Visual",
    year: "2024",
    image: "assets/alegria_doce_cover_new.png",
    description: "Uma jornada para traduzir o sabor de memórias afetivas em uma marca visual. O objetivo não era apenas vender doces, mas vender o sentimento de um abraço apertado e de uma tarde de domingo.",
    challenge:
      "O maior desafio foi equilibrar a doçura (que poderia ficar infantil) com o profissionalismo de um ateliê gourmet. A marca precisava ser fofa, mas confiável; caseira, mas premium.",
    personalPhrase:
      "Foi delicioso ver essa marca nascer. Cada cor foi escolhida como se eu estivesse selecionando os melhores ingredientes para uma receita especial.",
    process: [
      {
        step: "Imersão no Aroma",
        description: "Começamos investigando os valores da confeiteira: amor, paciência e ingredientes naturais. Entendi que a marca não vende açúcar, vende afeto."
      },
      {
        step: "Cores e Texturas",
        description: "A paleta nasceu da mistura de menta suave com tons de chocolate e creme. Buscamos cores que despertem o paladar sem serem agressivas."
      },
      {
        step: "Tipografia Manual",
        description: "Escolhi fontes que remetem à escrita manual e livros de receitas antigos, trazendo aquela sensação de 'feito pela vovó' mas com acabamento moderno."
      }
    ],
    deliverables: ["Logo Principal & Variações", "Paleta de Cores", "Tipografia Exclusiva", "Pattern & Elementos", "Design de Embalagens"],
    colors: ["#9fc8a6", "#7b4b33", "#fef3ee", "#628e6b"],
    typography: ["Poly", "ITC New Baskerville"],
    mockups: [
      "assets/alegria_doce_1.png",
      "assets/alegria_doce_mugs_new.png",
      "assets/alegria_doce_2.png",
      "assets/alegria_doce_main.png"
    ],
    layoutType: 'grid',
    results: "A marca Alegria Doce percebeu um aumento na percepção de valor dos produtos, permitindo um reajuste de preço de 15% e maior fidelização visual dos clientes."
  },
  {
    id: 2,
    title: "Recanto do Sereno",
    category: "Logo & Identidade",
    year: "2024",
    image: "assets/recanto_logo.jpg",
    description:
      "Mais que uma pousada, um convite ao silêncio. A identidade visual foi construída para desacelerar quem a vê, usando o minimalismo como ferramenta de paz.",
    challenge:
      "Fugir dos clichês de pousadas rurais (como casinhas literais) e capturar a essência abstrata da neblina da manhã e do cheiro de terra molhada de Minas Gerais.",
    personalPhrase:
      "O verde profundo e o laranja terroso contam a história do lugar antes mesmo de você chegar lá. É uma marca que respira.",
    process: [
      {
        step: "Estudo do Terroir",
        description: "Analisei a geografia do local. As curvas da logo nasceram inspiradas na silhueta exata das montanhas que cercam a propriedade."
      },
      {
        step: "Minimalismo Rústico",
        description: "Eliminei excessos. Mantivemos apenas traços essenciais, usando texturas que lembram papel reciclado e madeira crua."
      },
      {
        step: "Refinamento Elegante",
        description: "Ajustamos o peso das lines para que a marca funcione tanto em uma placa de madeira rústica quanto em um site de reservas sofisticado."
      }
    ],
    deliverables: ["Logotipo Responsivo", "Direção de Arte", "Cartões de Visita", "Papelaria Institucional", "Assinatura de E-mail"],
    colors: ["#10433a", "#e89137", "#f5f5f5"],
    typography: ["Draculas Personal", "Poppins"],
    mockups: [
      "assets/recanto_business_card.jpg",
      "assets/recanto_tote.jpg",
      "assets/recanto_flyer.jpg",
      "assets/recanto_logo_green.png",
    ],
    layoutType: 'grid',
    results: "A nova identidade atraiu um público que busca experiências de luxo silencioso, aumentando as reservas diretas pelo site em 25% no primeiro semestre."
  },
];
