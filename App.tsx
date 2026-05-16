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
import AgentixOS from './components/AgentixOS';
import FAQPage from './components/FAQPage';
import { AlertCircle, CheckCircle2, TrendingUp, BarChart3, ArrowRight, HelpCircle, ChevronDown, Check, X, FileText, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'faq' | 'os'>('home');
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
              
              <section className="py-24 md:py-32 text-center relative z-10 px-4">
                <h2 className="text-4xl md:text-6xl font-[900] text-slate-900 mb-8 tracking-tighter leading-[0.9] max-w-3xl mx-auto uppercase">
                  Get your free <br/> <span className="text-brand-700 text-5xl md:text-7xl">AEO score</span>
                </h2>
                
                <div className="max-w-xl mx-auto w-full mt-12">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.open('https://agentixpay.substack.com/p/agentixpay-white-paper', '_blank');
                    }}
                    className="relative group/search"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-2xl blur opacity-25 group-focus-within/search:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        placeholder="Enter your store URL (e.g. store.com)"
                        className="w-full bg-white backdrop-blur border border-slate-200 rounded-2xl px-6 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500/50 transition-all shadow-xl"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: "#061d33" }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="absolute right-2 px-6 py-2.5 bg-[#092C4C] text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg hover:shadow-brand-500/20"
                      >
                        Check score
                      </motion.button>
                    </div>
                  </form>
                </div>
              </section>
            </motion.div>
          ) : currentView === 'os' ? (
            <motion.div
              key="os"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <AgentixOS />
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