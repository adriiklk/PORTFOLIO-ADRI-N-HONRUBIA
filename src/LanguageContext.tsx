import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    // Header & Brand
    'brand.subtitle': 'GRAPHIC DESIGN, FILMMAKING & BRANDING',
    'brand.info': 'INFO & INQUIRIES',
    'brand.directory': 'NAVIGATE DIRECTORY',
    
    // Hero
    'hero.badge': 'PORTFOLIO OF ADRIÁN HONRUBIA',
    'hero.tagline': 'Crafting cinematic narratives & bold visual identities.',
    'hero.description': 'A Madrid-based Graphic Designer & Filmmaker specialized in high-end brand identity systems, video production, and social-first content strategies.',
    'hero.cta': 'Discover Selected Works',
    
    // About
    'about.title': 'BIOGRAPHY',
    'about.heading': "A designer with a filmmaker's lens, crafting stories across mediums.",
    'about.p1': 'I am a multidimensional creator working at the intersection of motion, print, and digital branding. My process is defined by narrative depth, rigorous geometry, and meticulous attention to emotional resonance.',
    'about.p2': 'Whether drafting the typographic layout of an editorial book, designing premium packaging, or directing natural-light cinematic visuals on set, I focus on building cohesive worlds that communicate trust, quality, and bold contemporary style.',
    'about.creativeFields': 'CREATIVE FIELD INTERESTS',
    'about.branding': 'Luxury & Editorial Branding',
    'about.editorial': 'Grid Systems & Typography',
    'about.direction': 'Cinematography & Creative Direction',
    
    // Projects
    'projects.title': 'SELECTED WORKS',
    'projects.subtitle': 'Curated collection of film, branding, and design projects.',
    'projects.viewProject': 'View Project',
    'projects.back': 'Back to home',
    'projects.year': 'YEAR',
    'projects.client': 'CLIENT',
    'projects.role': 'ROLE',
    'projects.services': 'SERVICES DELIVERED',
    'projects.challenge': 'THE CHALLENGE',
    'projects.solution': 'THE SOLUTION',
    'projects.overview': 'PROJECT OVERVIEW',
    'projects.nextProject': 'Next Project',
    'projects.gallery': 'Selected Spread Captures',
    
    // Services
    'services.title': 'SPECIALIST CAPABILITIES',
    'services.subtitle': 'A tailored approach to physical and digital brand elevation.',
    
    // Contact
    'contact.title': "LET'S WORK TOGETHER",
    'contact.subtitle': 'COLLABORATE',
    'contact.desc': "Have an upcoming project, brand system, or film campaign that needs a distinct creative direction? Drop a line and let's explore how we can build something memorable.",
    'contact.formTitle': 'INQUIRY FORM',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.project': 'Project Type',
    'contact.projectPlaceholder': 'e.g., Campaign, Branding, Music Video',
    'contact.message': 'Project Description',
    'contact.messagePlaceholder': 'Tell me a bit about your ideas and timeline...',
    'contact.submit': 'Send Inquiry',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you! Your inquiry has been sent successfully.',
    'contact.error': 'Something went wrong. Please try again.',
    'contact.office': 'CREATIVE DESK',
    'contact.location': 'Madrid, Spain',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.credits': 'Designed & Developed'
  },
  es: {
    // Navigation
    'nav.work': 'Trabajo',
    'nav.about': 'Sobre mí',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    
    // Header & Brand
    'brand.subtitle': 'DISEÑO GRÁFICO, CINE Y BRANDING',
    'brand.info': 'INFORMACIÓN Y PREGUNTAS',
    'brand.directory': 'NAVEGAR POR EL DIRECTORIO',
    
    // Hero
    'hero.badge': 'PORTAFOLIO DE ADRIÁN HONRUBIA',
    'hero.tagline': 'Creando narrativas cinematográficas e identidades visuales audaces.',
    'hero.description': 'Diseñador Gráfico y Filmmaker afincado en Madrid especializado en sistemas de identidad de marca de alto nivel, producción de vídeo y estrategias de contenido enfocadas en redes sociales.',
    'hero.cta': 'Descubrir Trabajos Seleccionados',
    
    // About
    'about.title': 'BIOGRAFÍA',
    'about.heading': 'Un diseñador con la mirada de un filmmaker, creando historias a través de diferentes medios.',
    'about.p1': 'Soy un creador multidimensional que trabaja en la intersección del movimiento, el diseño impreso y el branding digital. Mi proceso se define por la profundidad narrativa, la geometría rigurosa y una atención meticulosa a la resonancia emocional.',
    'about.p2': 'Ya sea redactando la maquetación tipográfica de un libro editorial, diseñando un packaging premium o dirigiendo escenas cinematográficas con luz natural en el set, me enfoco en construir mundos cohesivos que transmitan confianza, calidad y un estilo contemporáneo audaz.',
    'about.creativeFields': 'ÁREAS DE INTERÉS CREATIVO',
    'about.branding': 'Branding de Lujo y Editorial',
    'about.editorial': 'Sistemas de Rejilla y Tipografía',
    'about.direction': 'Cinematografía y Dirección Creativa',
    
    // Projects
    'projects.title': 'TRABAJOS SELECCIONADOS',
    'projects.subtitle': 'Colección comisariada de proyectos de cine, branding y diseño.',
    'projects.viewProject': 'Ver Proyecto',
    'projects.back': 'Volver al inicio',
    'projects.year': 'AÑO',
    'projects.client': 'CLIENTE',
    'projects.role': 'ROL',
    'projects.services': 'SERVICIOS PRESTADOS',
    'projects.challenge': 'EL DESAFÍO',
    'projects.solution': 'LA SOLUCIÓN',
    'projects.overview': 'RESUMEN DEL PROYECTO',
    'projects.nextProject': 'Siguiente Proyecto',
    'projects.gallery': 'Capturas de Distribución Seleccionadas',
    
    // Services
    'services.title': 'CAPACIDADES ESPECIALISTAS',
    'services.subtitle': 'Un enfoque personalizado para elevar marcas tanto físicas como digitales.',
    
    // Contact
    'contact.title': 'TRABAJEMOS JUNTOS',
    'contact.subtitle': 'COLABORAR',
    'contact.desc': '¿Tienes un proyecto, sistema de marca o campaña cinematográfica que necesite una dirección creativa distintiva? Escríbeme y exploremos cómo podemos construir algo memorable.',
    'contact.formTitle': 'FORMULARIO DE CONTACTO',
    'contact.name': 'Tu Nombre',
    'contact.email': 'Tu Email',
    'contact.project': 'Tipo de Proyecto',
    'contact.projectPlaceholder': 'ej., Campaña, Branding, Vídeo Musical',
    'contact.message': 'Descripción del Proyecto',
    'contact.messagePlaceholder': 'Cuéntame un poco sobre tus ideas y plazos...',
    'contact.submit': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Gracias! Tu mensaje ha sido enviado con éxito.',
    'contact.error': 'Algo salió mal. Por favor, inténtalo de nuevo.',
    'contact.office': 'OFICINA CREATIVA',
    'contact.location': 'Madrid, España',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.credits': 'Diseñado y Desarrollado'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'es' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
