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
import { AlertCircle, CheckCircle2, TrendingUp, BarChart3, ArrowRight, HelpCircle, ChevronDown, Check, X, FileText, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'radar'>('home');
  const containerRef = useRef<HTMLDivElement>(null);

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
        <Navbar onOpenDemo={() => setIsModalOpen(true)} onViewChange={setCurrentView} currentView={currentView} />
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

              {/* What Agentix Enables Section */}
              <section id="what-agentix-enables" className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">What Agentix Enables</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "AI Visibility", 
                      text: "Ensure products are discoverable by AI agents and shopping assistants.",
                      icon: <TrendingUp className="text-brand-600" size={32} />
                    },
                    { 
                      title: "Autonomous Checkout", 
                      text: "Enable AI agents to securely complete purchases on behalf of users.",
                      icon: <Zap className="text-blue-600" size={32} />
                    },
                    { 
                      title: "AI Payment Infrastructure", 
                      text: "Power AI-driven transactions with secure payment rails and verification.",
                      icon: <BarChart3 className="text-emerald-600" size={32} />
                    }
                  ].map((feature, i) => (
                    <div key={i} className="group h-64 [perspective:1000px]">
                      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        {/* Front Side */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 rounded-[2.5rem] bg-white backdrop-blur-md border border-slate-200 text-slate-900 shadow-xl [backface-visibility:hidden]">
                          <div className="mb-6">{feature.icon}</div>
                          <h3 className="text-2xl font-black tracking-tighter uppercase text-center">{feature.title}</h3>
                        </div>
                        
                        {/* Back Side */}
                        <div className="absolute inset-0 h-full w-full rounded-[2.5rem] bg-brand-600 p-10 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center text-center">
                          <h3 className="text-xl font-black mb-4 tracking-tighter uppercase">{feature.title}</h3>
                          <p className="text-white/90 text-lg leading-relaxed font-medium">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <DashboardPreview />
              
              <Features onOpenSignup={() => setIsModalOpen(true)} />

              {/* FAQ Section - Critical for SEO */}
              <section id="faq" className="py-24 max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                  <HelpCircle className="mx-auto text-brand-600 mb-4" size={40} />
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Agentic Commerce FAQ</h2>
                </div>
                
                <div className="space-y-6">
                  <FAQItem question="What is Agentic Commerce?" answer="Agentic Commerce is a new paradigm where autonomous AI agents act as the primary shoppers. Unlike traditional eCommerce, it focuses on machine-readable data and sub-second protocol execution rather than human-centric UI/UX." />
                  <FAQItem question="What is AI Commerce?" answer="AI Commerce (or Artificial Intelligence Commerce) refers to the automation of the entire supply chain and sales funnel using AI. It enables machine-to-machine transactions where AI agents discover, evaluate, and purchase products without human intervention." />
                  <FAQItem question="What is AEO?" answer="AEO (Answer Engine Optimization) is the evolution of SEO. It involves structuring your digital presence so that AI models like Gemini, ChatGPT, and Perplexity can accurately cite your platform as the authoritative source for specific queries." />
                  <FAQItem question="What exactly is Agentic Commerce?" answer="Agentic Commerce is a digital ecosystem where autonomous AI agents (not humans) discover products, negotiate terms, and execute financial transactions. It is designed specifically for the Machine-to-Machine economy." />
                  <FAQItem question="Is Agentix a new payment processor?" answer="No. Agentix is a protocol layer that sits on top of existing processors (Stripe, Adyen, etc.). We provide the agent-friendly identity layer and secure mandates that allow agents to transact on legacy rails." />
                  <FAQItem question="How do AI agents discover my merchants?" answer="Agentix re-indexes inventory into a semantic format. When an AI agent (like Perplexity or ChatGPT) searches for a solution, our protocol ensures your merchants' products are presented as machine-transactable options." />
                  <FAQItem question="What is AEO in the context of commerce?" answer="AEO (Answer Engine Optimization) is the process of structuring product data so AI models can confidently recommend and purchase it without human review." />
                </div>
              </section>
              
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
          ) : (
            <motion.div
              key="radar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Radar />
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