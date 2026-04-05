import React, { useState, useEffect } from 'react';
import { FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplainerVideo from './ExplainerVideo';

interface HeroProps {
  onOpenDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  const words = ["Intelligence", "Commerce", "Shopping"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="relative pt-12 pb-8 md:pt-28 md:pb-12 scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50/80 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur border border-slate-200 rounded-full px-3 py-1 mb-6 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
            <span className="text-[10px] md:text-xs font-medium text-slate-600 tracking-wide uppercase">Fintech Infrastructure for AI</span>
          </div>
          
          <h1 className="font-[900] text-slate-900 tracking-tighter mb-4 leading-[1.1] md:leading-[1.0]">
            <span className="text-xl md:text-4xl block mb-2 opacity-90" style={{ color: '#2F80ED' }}>AI Agents Are Starting to Shop for Customers.</span>
            <div className="h-[40px] md:h-[80px] overflow-hidden relative flex justify-center items-center">
              <AnimatePresence initial={false}>
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '-100%' }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  className="text-2xl md:text-5xl block absolute whitespace-nowrap font-bold"
                  style={{ color: '#092C4C' }}
                >
                  Power Your Store for AI {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          
          <p className="text-base md:text-xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Agentix powers AI commerce for ecommerce platforms and ISVs with AI visibility, autonomous checkout, and AI-driven payment rails.
          </p>
          
          <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full">
            {/* AI Visibility Search Bar Section */}
            <div className="w-full mb-12">
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4">
                Check your AI visibility
              </p>
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
                    className="w-full bg-white backdrop-blur border border-slate-200 rounded-2xl px-6 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500/50 transition-all shadow-sm"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#3853e6" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-2 px-6 py-2 bg-slate-900 text-white text-xs font-black rounded-xl transition-all uppercase tracking-widest shadow-lg hover:shadow-brand-500/20"
                  >
                    Check your score
                  </motion.button>
                </div>
                <p className="mt-3 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  Free check: can AI agents find your products?
                </p>
              </form>
            </div>

            <div className="relative group mb-8">
              {/* Extreme Glowing light blue light effect behind button */}
              <div className="absolute inset-[-30px] bg-brand-400/40 blur-[40px] rounded-full transition-all duration-700 group-hover:bg-brand-400/60 group-hover:scale-125 animate-pulse"></div>
              <div className="absolute inset-[-15px] bg-brand-300/70 blur-[20px] rounded-full"></div>
              <div className="absolute inset-[-5px] bg-cyan-200/50 blur-[10px] rounded-full"></div>
              
              <button 
                onClick={onOpenDemo}
                className="relative px-12 py-5 rounded-full bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center text-lg gap-2 z-10"
              >
                <Zap size={20} className="text-white fill-white" />
                Join the waitlist
              </button>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-[10px] text-slate-500 font-bold uppercase tracking-wider z-10">
                Secure your priority access spot
              </span>
            </div>
          </div>
        </div>

        {/* Technical Label for the Visual */}
        <div className="mt-12 md:mt-16 -mb-4 text-center px-4">
          <p className="text-xs md:text-base font-black text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.25em]">
            Agentic Checkout in Action
          </p>
        </div>

        {/* Visual Connectivity Hub Replacement */}
        <div className="mt-8">
          <ExplainerVideo />
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200">
           <p className="text-center text-[9px] md:text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-[0.2em]">Interfacing with the AI Grid</p>
           <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-24 gap-y-6 md:gap-y-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 px-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" 
                alt="ChatGPT" 
                className="h-8 md:h-14 w-auto object-contain max-w-[100px] md:max-w-none" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" 
                alt="Gemini" 
                className="h-8 md:h-14 w-auto object-contain max-w-[100px] md:max-w-none" 
              />
              <img 
                src="https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg" 
                alt="Shopify" 
                className="h-6 md:h-12 w-auto object-contain max-w-[100px] md:max-w-none" 
              />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;