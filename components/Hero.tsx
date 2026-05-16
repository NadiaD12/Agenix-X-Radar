import React, { useState, useEffect } from 'react';
import { FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AgenticChatAnimation from './AgenticChatAnimation';

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
    <section id="overview" className="relative pt-4 pb-4 md:pt-10 md:pb-8 scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50/80 -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-4 md:mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur border border-slate-200 rounded-full px-3 py-1 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
            <span className="text-[10px] md:text-xs font-medium text-slate-600 tracking-wide uppercase">Fintech Infrastructure for AI</span>
          </div>
          
          <h1 className="font-[900] text-slate-900 tracking-tighter mb-2 leading-[1.1] md:leading-[1.0]">
            <span className="text-lg md:text-3xl block mb-1 opacity-90" style={{ color: '#1e40af' }}>AI Agents Are Starting to Shop for Customers.</span>
            <div className="h-[30px] md:h-[60px] overflow-hidden relative flex justify-center items-center">
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
                  className="text-xl md:text-4xl block absolute whitespace-nowrap font-bold"
                  style={{ color: '#092C4C' }}
                >
                  Power Your Store for AI {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          
          {/* Main CTA */}
          <div className="flex justify-center mb-10 md:mb-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDemo}
              className="px-8 py-3 bg-[#092C4C] text-white text-xs font-black rounded-2xl transition-all uppercase tracking-widest shadow-xl shadow-brand-500/10 hover:shadow-brand-500/20"
            >
              Request a demo
            </motion.button>
          </div>
        </div>

        {/* Technical Label for the Visual */}
        <div className="mt-8 md:mt-12 text-center px-4 relative z-30">
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.25em]">
            Agentic Checkout in Action
          </p>
        </div>

        {/* Visual Connectivity Hub Replacement */}
        <div className="mt-12 scale-[0.6] md:scale-[0.75] lg:scale-[0.65] origin-top h-[480px] md:h-[600px] flex items-start justify-center overflow-visible relative z-10">
          <div className="w-full flex justify-center">
            <AgenticChatAnimation />
          </div>
        </div>

        {/* AI Visibility Search Bar Section */}
        <div className="max-w-xl mx-auto w-full mt-4 mb-12">
          <p className="text-center text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] mb-3">
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
                className="w-full bg-white backdrop-blur border border-slate-200 rounded-2xl px-6 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500/50 transition-all shadow-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#061d33" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-2 px-6 py-2 bg-[#092C4C] text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg hover:shadow-brand-500/20"
              >
                Check score
              </motion.button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 overflow-hidden">
           <p className="text-center text-[9px] md:text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">Interfacing with the AI Grid</p>
           
           <div className="relative w-full overflow-hidden group/carousel">
             {/* Gradient Overlays */}
             <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
             
             <motion.div 
               className="flex whitespace-nowrap py-4"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             >
               {[
                 { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
                 { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
                 { name: "Shopify", logo: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
                 { name: "Perplexity", logo: "https://www.vectorlogo.zone/logos/perplexityai/perplexityai-icon.svg" },
                 { name: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Claude_AI_logo.svg" }
               ].concat([
                 { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
                 { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
                 { name: "Shopify", logo: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
                 { name: "Perplexity", logo: "https://www.vectorlogo.zone/logos/perplexityai/perplexityai-icon.svg" },
                 { name: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Claude_AI_logo.svg" }
               ]).concat([
                 { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
                 { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
                 { name: "Shopify", logo: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
                 { name: "Perplexity", logo: "https://www.vectorlogo.zone/logos/perplexityai/perplexityai-icon.svg" },
                 { name: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Claude_AI_logo.svg" }
               ]).map((brand, i) => (
                 <div 
                   key={i} 
                   className="flex items-center gap-4 mx-12 md:mx-20 opacity-20 hover:opacity-100 transition-all duration-300 cursor-default grayscale hover:grayscale-0"
                 >
                   <img 
                     src={brand.logo} 
                     alt={brand.name} 
                     className="h-6 md:h-10 w-auto object-contain" 
                   />
                   <span className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">
                     {brand.name}
                   </span>
                 </div>
               ))}
             </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;