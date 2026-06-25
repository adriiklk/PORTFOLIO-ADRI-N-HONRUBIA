import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import { portfolioProjects, servicesList } from './data';
import { ViewState } from './types';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>({ view: 'home' });

  // Find the currently selected project for details layout
  const selectedProject = portfolioProjects.find(
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
              <Hero onDiscoverClick={handleDiscoverClick} />

              {/* Biography Section */}
              <About />

              {/* Curated Selected Works */}
              <ProjectsSection
                projects={portfolioProjects}
                onSelectProject={(id) => setViewState({ view: 'project', selectedProjectId: id })}
              />

              {/* Specialist Capability Services */}
              <ServicesSection services={servicesList} />

              {/* Dynamic Contact Inquiries */}
              <ContactSection />
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

