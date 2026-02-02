import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import TarotForm from './components/TarotForm'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Differentials from './components/Differentials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import UrgencyBlock from './components/UrgencyBlock'
import Footer from './components/Footer'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'
import Contact from './components/Contact'

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const scrollToReading = () => {
    if (currentPage !== 'main') {
      setCurrentPage('main');
      // Small delay to allow main page to render before scrolling
      setTimeout(() => {
        const element = document.getElementById('reading');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('reading');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'terms':
        return <TermsOfUse onBack={() => setCurrentPage('main')} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentPage('main')} />;
      case 'contact':
        return <Contact onBack={() => setCurrentPage('main')} />;
      default:
        return (
          <>
            <Hero onStart={scrollToReading} />
            <TarotForm />
            <HowItWorks />
            <Benefits />
            <Differentials />
            <Pricing />
            <FAQ />
            <UrgencyBlock onAction={scrollToReading} />
          </>
        );
    }
  };

  return (
    <div className="app flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-mystic-deep/80 backdrop-blur-md transition-all duration-300">
        <div className="container-custom flex items-center justify-center py-4 md:py-6">
          <div className="logo-container flex flex-col items-center">
            <div className="logo font-display text-xl md:text-3xl text-mystic-gold font-bold tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] flex items-center gap-3">
              <span className="w-8 h-px bg-mystic-gold/30 hidden md:block"></span>
              SINAL DO UNIVERSO
              <span className="w-8 h-px bg-mystic-gold/30 hidden md:block"></span>
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-grow ${currentPage === 'main' ? 'pt-24' : ''}`}>
        {renderContent()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  )
}

export default App
