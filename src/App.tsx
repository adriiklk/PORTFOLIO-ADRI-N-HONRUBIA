import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import { getPortfolioProjects, getServicesList } from './data';
import { ViewState } from './types';
import { useLanguage } from './LanguageContext';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({ view: 'home' });
  const { language } = useLanguage();

  const localizedProjects = getPortfolioProjects(language);
  const localizedServices = getServicesList(language);

  // Find the currently selected project for details layout
  const selectedProject = localizedProjects.find(
    (p) => p.id === viewState.selectedProjectId
  );

  const handleDiscoverClick = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* 1. Thin Elegant Read Progress Indicator */}
      <ScrollProgress />

      {/* 2. Custom Interactive Cursor */}
      <CustomCursor />

      {/* Elegant Dark Theme Decorative Backdrop Lines */}
      <div className="fixed top-0 right-[20%] w-[1px] h-full bg-white/5 pointer-events-none z-10" />
      <div className="fixed bottom-0 left-[30%] w-[1px] h-32 bg-[#C9A96E]/20 pointer-events-none z-10" />

      {/* 3. Global Header (Always visible, handles cross-view navigation) */}
      <Header viewState={viewState} setViewState={setViewState} />

      {/* 4. Immersive Content Switcher */}
      <main className="min-h-screen bg-[#0A0A0A]">
        <AnimatePresence mode="wait">
          {viewState.view === 'home' ? (
            <motion.div
              key="home-panels"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero onDiscoverClick={handleDiscoverClick} />
              </motion.div>

              {/* Biography Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <About />
              </motion.div>

              {/* Curated Selected Works */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectsSection
                  projects={localizedProjects}
                  onSelectProject={(id) => setViewState({ view: 'project', selectedProjectId: id })}
                />
              </motion.div>

              {/* Specialist Capability Services */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServicesSection services={localizedServices} />
              </motion.div>

              {/* Dynamic Contact Inquiries */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ContactSection />
              </motion.div>
            </motion.div>
          ) : (
            selectedProject && (
              <div key={`project-wrapper-${selectedProject.id}`} className="contents">
                <ProjectDetail
                  project={selectedProject}
                  onBack={() => setViewState({ view: 'home' })}
                  onNavigateToProject={(id) => setViewState({ view: 'project', selectedProjectId: id })}
                />
              </div>
            )
          )}
        </AnimatePresence>
      </main>

      {/* 5. Fine Global Footer */}
      <Footer />
    </>
  );
}

