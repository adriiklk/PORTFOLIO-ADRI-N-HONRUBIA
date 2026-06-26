import { Project, Service } from './types';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage from './assets/images/regenerated_image_1781698049953.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage2 from './assets/images/regenerated_image_1781709185111.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage3 from './assets/images/regenerated_image_1781711159216.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage4 from './assets/images/regenerated_image_1781713942118.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage5 from './assets/images/regenerated_image_1782397455294.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage6 from './assets/images/regenerated_image_1782397811027.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage7 from './assets/images/regenerated_image_1782397812156.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage8 from './assets/images/regenerated_image_1782398134878.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage9 from './assets/images/regenerated_image_1782399328597.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage10 from './assets/images/regenerated_image_1782399827470.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage11 from './assets/images/regenerated_image_1782399828414.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage12 from './assets/images/regenerated_image_1782399828705.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage13 from './assets/images/regenerated_image_1782399829311.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage14 from './assets/images/regenerated_image_1782399830414.png';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage15 from './assets/images/regenerated_image_1782400659934.jpg';
// @ts-expect-error - Vite handles asset imports correctly
import regeneratedImage16 from './assets/images/regenerated_image_1782401326643.png';

export const portfolioProjects: Project[] = [
  {
    id: 'ikea-spot',
    title: 'Ikea Spot',
    category: 'Filmmaking & branding',
    year: '2025',
    image: regeneratedImage,
    video: 'https://www.youtube.com/embed/qQMHQGn4G18?autoplay=1&mute=1&loop=1&playlist=qQMHQGn4G18',
    description: 'An advertising campaign built around the contrast between a fast-paced boxing-inspired lifestyle and the serene comfort of an IKEA home.',
    longDescription: 'Developed for IKEA to promote new product launches, the campaign resolves the dual desire for both high-intensity lifestyles and balanced household sanctuaries, positioning well-designed furniture as the ultimate foundation for personal restoration.',
    challenge: 'Creating a highly stylized visual narrative that translates traditional athletic imagery into high-end retail art direction, while maintaining immediate emotional warmth.',
    solution: 'Constructing a hybrid cinematic set where a brutalist boxing ring is meticulously dressed with minimalist IKEA products, resulting in a striking and memorable surreal juxtaposition.',
    services: ['Campaign Visual 01', 'Campaign Visual 02', 'TV Commercial', 'TikTok Commercial'],
    client: 'IKEA',
    role: 'Art Director & Lead Director',
    gallery: [
      'https://images.unsplash.com/photo-1540747737956-378724044432?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'aura-studios',
    title: 'Preview Napoli Music Video',
    category: 'FILMMAKING',
    year: '2025',
    image: regeneratedImage2,
    description: 'A raw and cinematic music video inspired by the energy, attitude, and lifestyle of the streets of Naples.',
    video: 'https://www.youtube.com/embed/wFlfQ2S2lsM?autoplay=1&mute=1&loop=1&playlist=wFlfQ2S2lsM',
    longDescription: 'Napoli is a filmmaker showcase that explores themes of freedom, movement, rebellion, and life outside conventional systems through a gritty, handheld visual language.',
    challenge: 'Capturing the genuine, organic grit of urban environments without falling into cinematic cliches or over-produced art direction.',
    solution: 'Adopting a high-contrast natural lighting approach paired with fluid handheld camerawork and real street locations to evoke authentic speed and motion.',
    services: ['Creative Direction', 'Cinematography', 'Film Editing', 'Color Grading'],
    client: 'Urban Syndicate Records',
    role: 'Creative Director & Director of Photography',
    gallery: [
      regeneratedImage5,
      regeneratedImage6,
      regeneratedImage7,
      regeneratedImage8
    ]
  },
  {
    id: 'nocturnal-drift',
    title: 'Maná Energy Drink Brand Creation',
    category: 'Graphic design & BRANDING',
    year: '2024',
    image: regeneratedImage3,
    description: 'A bold, sleek packaging and visual identity system designed for Maná, an all-natural premium energy drink celebrating clean energy.',
    longDescription: 'Maná is a premium energy drink crafted from raw natural ingredients. We designed a holistic aesthetic identity—from sleek dark aluminum cans and geometric logo systems to high-contrast digital campaigns that represent focused potential and modern vibrancy.',
    challenge: 'To design luxury-tier beverage packaging that balances organic warmth with ultra-modern high-performance energy cues, bypassing heavy synthetic aesthetics.',
    solution: 'Crafting minimalist typography layouts on tactile matte-finish cans, paired with modern high-contrast editorial branding patterns that command immediate retail attention.',
    services: ['Packaging Design', 'Visual Strategy', 'Product Rendering', 'Brand Identity'],
    client: 'Maná Beverages Inc.',
    role: 'Lead Art Director',
    gallery: [
      regeneratedImage16,
      regeneratedImage10,
      regeneratedImage11,
      regeneratedImage12,
      regeneratedImage15,
      regeneratedImage13,
      regeneratedImage14
    ]
  },
  {
    id: 'vague-magazine',
    title: 'LaPara BarberShow Account Manage',
    category: 'Social Media Management',
    year: '2026',
    image: regeneratedImage4,
    description: 'An ongoing social media and content creation project focused on strengthening the barbershop\'s digital presence and building a recognizable brand identity across social platforms.',
    longDescription: 'The objective of LaPara BarberShow is to establish a strong, consistent digital presence capable of attracting new clients while reinforcing the brand\'s professional image. The strategy combines visual identity, short-form video content, and storytelling to increase visibility and engagement across social media platforms.',
    challenge: 'Developing a clean, modern, and curated digital aesthetic that communicates professionalism and attention to detail, cutting through the noise of standard social content.',
    solution: 'Deploying optimized vertical short-form video strategies, structured transformation hooks, and aesthetic layout guidelines that build community trust and loyalty.',
    services: ['Content Creation', 'Video Production', 'Social Media Strategy', 'Brand Image Development', 'Graphic Design'],
    client: 'LaPara BarberShow',
    role: 'Social Media Manager & Content Creator',
    gallery: [
      regeneratedImage4,
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];

export const servicesList: Service[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Bespoke layout and print craftsmanship combining classic grid theory and contemporary visual techniques.',
    details: ['Editorial publications', 'Books & catalogs', 'Exhibition graphics', 'Event flyers']
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    description: 'Creating enduring visual systems and core philosophies that elevate start-ups into cultural luxury icons.',
    details: ['Visual strategy', 'Typographic architectures', 'Packaging engineering', 'Brand guidelines systems']
  },
  {
    id: 'social-content',
    title: 'Social Media Content',
    description: 'High-concept vertical visual content designed to disrupt fast-scrolling feeds and build dedicated communities.',
    details: ['Premium vertical campaigns', 'Still life art direction', 'Interactive templates', 'Content strategy']
  },
  {
    id: 'filmmaking',
    title: 'Filmmaking & Direction',
    description: 'End-to-end cinematic narratives, corporate documentaries, and creative direction from scripting to delivery.',
    details: ['Cinematic production', 'Technical direction', 'Creative concept writing', 'Camera operator on-set']
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'High-precision audio-visual editorial cutting, pacing narratives to evoke emotional tension and engagement.',
    details: ['Narrative & doc editing', 'Sound sculpting', 'Pacing & flow structures', 'Archival footage synthesis']
  },
  {
    id: 'ia',
    title: 'Artificial Intelligence',
    description: 'Expert integration of modern generative AI models. Driven by continuous learning of the latest systems.',
    details: ['Generative AI integration', 'Prompt engineering', 'Workflow automation', 'Continuous model research']
  }
];

// Dual-language localizer function to seamlessly return localized projects
export const getPortfolioProjects = (lang: 'en' | 'es'): Project[] => {
  return portfolioProjects.map(proj => {
    if (lang === 'es') {
      if (proj.id === 'ikea-spot') {
        return {
          ...proj,
          category: 'Cine y Branding',
          description: 'Una campaña publicitaria construida en torno al contraste entre un estilo de vida de boxeo de ritmo rápido y la serenidad de un hogar IKEA.',
          longDescription: 'Desarrollada para que IKEA promocione nuevos lanzamientos, la campaña aborda el deseo dual de un estilo de vida de alta intensidad y un santuario doméstico equilibrado, posicionando el mobiliario de diseño como la base definitiva para la recuperación personal.',
          challenge: 'Crear una narrativa visual altamente estilizada que traduzca la imaginería atlética tradicional en dirección de arte de alta gama, manteniendo una calidez emocional inmediata.',
          solution: 'Construir un set de rodaje híbrido donde un ring de boxeo de estilo brutalista se decora meticulosamente con productos minimalistas de IKEA, logrando una espectacular yuxtaposición surrealista.',
          services: ['Visual de Campaña 01', 'Visual de Campaña 02', 'Anuncio de Televisión', 'Anuncio de TikTok'],
          role: 'Director de Arte y Director Principal'
        };
      }
      if (proj.id === 'aura-studios') {
        return {
          ...proj,
          category: 'Dirección de Cine',
          description: 'Un videoclip crudo y cinematográfico inspirado en la energía, la actitud y el estilo de vida de las calles de Nápoles.',
          longDescription: 'Napoli es una muestra cinematográfica que explora temas de libertad, movimiento, rebeldía y la vida fuera de los sistemas convencionales mediante un lenguaje visual de cámara en mano y estética texturizada.',
          challenge: 'Capturar el carácter auténtico y urbano de los entornos de calle sin caer en clichés cinematográficos ni en una dirección de arte sobreproducida.',
          solution: 'Adoptar un enfoque de iluminación natural de alto contraste combinado con un movimiento fluido de cámara en mano y localizaciones urbanas reales para evocar velocidad y movimiento genuinos.',
          services: ['Dirección Creativa', 'Cinematografía', 'Edición de Cine', 'Etalonaje de Color'],
          role: 'Director Creativo y Director de Fotografía'
        };
      }
      if (proj.id === 'nocturnal-drift') {
        return {
          ...proj,
          category: 'Diseño Gráfico y Branding',
          description: 'Un sistema de identidad visual y packaging audaz y estilizado diseñado para Maná, una bebida energética premium natural que celebra la energía limpia.',
          longDescription: 'Maná es una bebida energética premium elaborada a partir de ingredientes naturales. Diseñamos una identidad estética holística: desde latas de aluminio mate oscuro y sistemas de logotipos geométricos hasta campañas digitales de alto contraste que transmiten foco y vitalidad.',
          challenge: 'Diseñar un packaging de bebida de lujo que equilibre la calidez orgánica con estímulos de energía ultra modernos y de alto rendimiento, eludiendo la estética sintética tradicional.',
          solution: 'Crear maquetas tipográficas minimalistas sobre latas de acabado mate táctil, combinadas con patrones de branding editorial modernos de alto contraste que captan la atención comercial inmediata.',
          services: ['Diseño de Packaging', 'Estrategia Visual', 'Renderizado de Producto', 'Identidad de Marca'],
          role: 'Director de Arte Principal'
        };
      }
      if (proj.id === 'vague-magazine') {
        return {
          ...proj,
          category: 'Gestión de Redes Sociales',
          description: 'Un proyecto continuo de creación de contenidos y redes sociales centrado en reforzar la presencia digital de la barbería y construir una identidad de marca reconocible.',
          longDescription: 'El objetivo de LaPara BarberShow es establecer una presencia digital sólida y coherente, capaz de atraer a nuevos clientes y, al mismo tiempo, reforzar la imagen profesional de la marca. La estrategia combina la identidad visual, el formato de vídeo corto y el storytelling para aumentar la visibilidad y el compromiso.',
          challenge: 'Desarrollar una estética digital limpia, moderna y cuidada que comunique profesionalidad y atención al detalle, destacando sobre el ruido del contenido social habitual.',
          solution: 'Desplegar estrategias de vídeo corto en formato vertical, ganchos de transformación estructurados y pautas de diseño estético que generen confianza y lealtad en la comunidad.',
          services: ['Creación de Contenido', 'Producción de Vídeo', 'Estrategia en Redes Sociales', 'Desarrollo de Imagen de Marca', 'Diseño Gráfico'],
          role: 'Gestor de Redes Sociales y Creador de Contenido'
        };
      }
    }
    return proj;
  });
};

export const getServicesList = (lang: 'en' | 'es'): Service[] => {
  return servicesList.map(srv => {
    if (lang === 'es') {
      if (srv.id === 'graphic-design') {
        return {
          ...srv,
          title: 'Diseño Gráfico',
          description: 'Maquetación editorial y diseño impreso a medida combinando la teoría clásica de retículas con técnicas visuales contemporáneas.',
          details: ['Publicaciones editoriales', 'Libros y catálogos', 'Gráficos para exposiciones', 'Cartelería de eventos']
        };
      }
      if (srv.id === 'branding') {
        return {
          ...srv,
          title: 'Branding e Identidad',
          description: 'Creación de sistemas visuales perdurables y filosofías de marca que elevan proyectos emergentes a iconos de prestigio.',
          details: ['Estrategia visual', 'Arquitecturas tipográficas', 'Ingeniería de packaging', 'Sistemas de pautas de marca']
        };
      }
      if (srv.id === 'social-content') {
        return {
          ...srv,
          title: 'Contenido para Redes',
          description: 'Contenido visual vertical de alto impacto conceptual, diseñado para interrumpir el scroll rápido y fidelizar comunidades.',
          details: ['Campañas verticales premium', 'Dirección de arte de bodegones', 'Plantillas interactivas', 'Estrategia de contenidos']
        };
      }
      if (srv.id === 'filmmaking') {
        return {
          ...srv,
          title: 'Cine y Dirección',
          description: 'Narrativas cinematográficas completas, documentales corporativos y dirección creativa desde el guion hasta la copia final.',
          details: ['Producción cinematográfica', 'Dirección técnica', 'Creación de conceptos creativos', 'Operador de cámara en rodaje']
        };
      }
      if (srv.id === 'video-editing') {
        return {
          ...srv,
          title: 'Montaje de Vídeo',
          description: 'Montaje audiovisual editorial de alta precisión, estructurando ritmos para evocar tensión emocional y máximo engagement.',
          details: ['Edición narrativa y documental', 'Escultura y diseño de sonido', 'Estructuras de ritmo y flujo', 'Síntesis de material de archivo']
        };
      }
      if (srv.id === 'ia') {
        return {
          ...srv,
          title: 'Inteligencia Artificial',
          description: 'Integración experta de modelos generativos de IA modernos, respaldada por un aprendizaje y experimentación constantes.',
          details: ['Integración de IA generativa', 'Ingeniería de prompts', 'Automatización de flujos de trabajo', 'Investigación continua de modelos']
        };
      }
    }
    return srv;
  });
};
