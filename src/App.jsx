import './index.css'
import Hero from './components/Hero'
import TarotForm from './components/TarotForm'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Differentials from './components/Differentials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import UrgencyBlock from './components/UrgencyBlock'
import Footer from './components/Footer'

function App() {
  const scrollToReading = () => {
    const element = document.getElementById('reading');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            <div className="text-[10px] md:text-xs text-mystic-gold/60 tracking-[0.5em] uppercase mt-1 font-medium">
              Conexão Ancestral • Clareza Divina
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24">
        <Hero onStart={scrollToReading} />
        <TarotForm />
        <HowItWorks />
        <Benefits />
        <Differentials />
        <Pricing />
        <FAQ />
        <UrgencyBlock onAction={scrollToReading} />
      </main>

      <Footer />
    </div>
  )
}

export default App
