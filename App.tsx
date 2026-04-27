import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Security from './components/Security';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import DashboardPreview from './components/DashboardPreview';
import SectionTabs from './components/SectionTabs';
import Radar from './components/Radar';
import Nexus from './components/Nexus';
import ComingSoon from './components/ComingSoon';
import FAQPage from './components/FAQPage';
import { AlertCircle, CheckCircle2, TrendingUp, BarChart3, ArrowRight, HelpCircle, ChevronDown, Check, X, FileText, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'radar' | 'nexus' | 'faq'>('home');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle full-page background gradient */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            background: `radial-gradient(1200px circle at var(--mouse-x) var(--mouse-y), rgba(56, 83, 230, 0.05), transparent 80%)`
          }}
        ></div>
        <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
      
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar onOpenDemo={() => setIsModalOpen(true)} onViewChange={setCurrentView} currentView={currentView === 'faq' ? 'home' : currentView} />
        {currentView === 'home' && <SectionTabs />}
      </header>
      
      <main className="relative z-10 pt-16 lg:pt-24">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Hero onOpenDemo={() => setIsModalOpen(true)} />
              <HowItWorks />
              <Security />

              <DashboardPreview />
              
              <Features onOpenSignup={() => setIsModalOpen(true)} />
              
              <ComingSoon />
              
              <section className="py-40 text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-[900] text-slate-900 mb-10 tracking-tighter leading-[0.9] max-w-4xl mx-auto">
                  Check if your products <br/> <span className="text-brand-600 text-6xl md:text-8xl">can be found on AI</span>
                </h2>
                <a 
                  href="https://agentixpay.substack.com/p/agentixpay-white-paper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-brand-600 text-white font-[800] hover:shadow-[0_0_40px_rgba(56,83,230,0.6)] transition-all text-xl"
                >
                  <FileText size={24} />
                  Check your AI visibility
                </a>
              </section>
            </motion.div>
          ) : currentView === 'radar' ? (
            <motion.div
              key="radar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Radar />
            </motion.div>
          ) : currentView === 'nexus' ? (
            <motion.div
              key="nexus"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Nexus />
            </motion.div>
          ) : (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <FAQPage onBack={() => setCurrentView('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onViewChange={setCurrentView} />
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white backdrop-blur-sm overflow-hidden transition-all hover:shadow-lg hover:border-slate-300">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-6 flex items-center justify-between text-left">
        <span className="text-lg font-bold text-slate-900">{question}</span>
        <ChevronDown className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-8 pb-6 text-slate-600 leading-relaxed font-medium">{answer}</div>}
    </div>
  );
};

export default App;