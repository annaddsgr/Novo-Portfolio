import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.contact': 'Contato',
    'hero.title': 'Transformo histórias em marcas autênticas.',
    'hero.subtitle': 'Designer Gráfico & Estrategista Visual especializada em Identidade Visual e Social Media.',
    'cta.budget': 'Solicitar Orçamento',
    'projects.title': 'Histórias que ajudei a criar',
    'projects.subtitle': 'Cada projeto é uma jornada única.',
    // Adicionar mais chaves conforme necessário
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Transforming stories into authentic brands.',
    'hero.subtitle': 'Graphic Designer & Visual Strategist specializing in Visual Identity and Social Media.',
    'cta.budget': 'Request a Quote',
    'projects.title': 'Stories I helped create',
    'projects.subtitle': 'Every project is a unique journey.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
