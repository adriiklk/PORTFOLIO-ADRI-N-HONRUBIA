import { useLanguage } from '../LanguageContext';
import { Mail, Instagram, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const { language } = useLanguage();
  const channels = [
    { label: language === 'es' ? 'Correo' : 'Email', icon: Mail, href: 'mailto:adrianhonrubia05@gmail.com', detail: 'adrianhonrubia05@gmail.com', external: false },
    { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/adriannhg_', detail: '@adriannhg_', external: true },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/adri%C3%A1n-honrubia-gonz%C3%A1lez-8b1640435/', detail: 'Adrián Honrubia', external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative w-full py-20 md:py-28 scroll-mt-20" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t pt-12 md:pt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-14" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-accent font-medium uppercase mb-4 block">
              {language === 'es' ? '04 / CONTACTO' : '04 / CONTACT'}
            </span>
            <h2 id="contact-heading" className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-neutral-900 dark:text-white">
              {language === 'es' ? 'Hablemos.' : 'Let’s talk.'}
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {language === 'es' ? 'Una idea empieza con un hola.' : 'Every idea starts with a hello.'}
            </p>
          </div>
          <nav aria-label={language === 'es' ? 'Formas de contacto' : 'Contact channels'} className="flex items-start gap-7 sm:gap-10 md:gap-12">
            {channels.map(({ label, icon: Icon, href, detail, external }) => (
              <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                aria-label={`${label}: ${detail}`} title={detail} data-cursor="hover"
                className="group flex flex-col items-center gap-3 rounded-lg outline-offset-8 focus-visible:outline-2 focus-visible:outline-accent">
                <span className="flex size-16 sm:size-18 items-center justify-center rounded-full border border-current/15 text-neutral-700 dark:text-neutral-300 group-hover:text-accent group-hover:border-accent/60 group-focus-visible:text-accent transition-colors duration-200">
                  <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="text-xs tracking-wide text-neutral-600 dark:text-neutral-400 group-hover:text-accent group-focus-visible:text-accent transition-colors duration-200">{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
