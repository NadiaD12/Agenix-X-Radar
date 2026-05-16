import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ArrowLeft, Search } from 'lucide-react';

interface FAQPageProps {
  onBack: () => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    { 
      question: "What is Agentic Commerce?", 
      answer: "Agentic Commerce is a new paradigm where autonomous AI agents act as the primary shoppers. Unlike traditional eCommerce, it focuses on machine-readable data and sub-second protocol execution rather than human-centric UI/UX." 
    },
    { 
      question: "What is AI Commerce?", 
      answer: "AI Commerce (or Artificial Intelligence Commerce) refers to the automation of the entire supply chain and sales funnel using AI. It enables machine-to-machine transactions where AI agents discover, evaluate, and purchase products without human intervention." 
    },
    { 
      question: "What is AEO?", 
      answer: "AEO (Answer Engine Optimization) is the evolution of SEO. It involves structuring your digital presence so that AI models like Gemini, ChatGPT, and Perplexity can accurately cite your platform as the authoritative source for specific queries." 
    },
    { 
      question: "Is Agentix a new payment processor?", 
      answer: "No. Agentix is a protocol layer that sits on top of existing processors (Stripe, Adyen, etc.). We provide the agent-friendly identity layer and secure mandates that allow agents to transact on legacy rails." 
    },
    { 
      question: "How do AI agents discover my merchants?", 
      answer: "Agentix re-indexes inventory into a semantic format. When an AI agent (like Perplexity or ChatGPT) searches for a solution, our protocol ensures your merchants' products are presented as machine-transactable options." 
    },
    { 
      question: "What is the Agentix Radar?", 
      answer: "Radar is our proprietary visibility engine that scans the AI web to determine how well your products are indexed by major LLMs and shopping agents. It provides a real-time 'Discovery Score' for your store." 
    },
    { 
      question: "How secure is the autonomous checkout?", 
      answer: "Extremely. We use bank-grade encryption, SOC2 Type II certified infrastructure, and isolated tenant environments. Every transaction requires a cryptographically signed mandate from the agent." 
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 pt-16 md:pt-20 pb-20 md:pb-24"
    >
      <div className="max-w-3xl mx-auto px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Overview</span>
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex p-4 bg-brand-100 rounded-3xl mb-6">
            <HelpCircle className="text-brand-600" size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
            Frequently Asked <br/> Questions
          </h1>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            Everything you need to know about the Agentic Commerce Protocol and the future of AI-driven shopping.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[2rem] pl-16 pr-8 py-6 text-slate-900 shadow-sm focus:outline-none focus:border-brand-500 transition-all text-lg"
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </AnimatePresence>
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200">
              <p className="text-slate-400 font-bold">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        <div className="mt-20 p-12 bg-[#092C4C] rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <h3 className="text-2xl font-black mb-4 relative z-10">Still have questions?</h3>
          <p className="text-slate-300 mb-8 relative z-10">Our team is here to help you navigate the transition to the agentic economy.</p>
          <button className="px-8 py-4 bg-brand-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg shadow-brand-500/20 hover:bg-brand-500 transition-all relative z-10">
            Contact Support
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="border border-slate-200 rounded-[2rem] bg-white overflow-hidden transition-all hover:shadow-md hover:border-slate-300"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-8 py-8 flex items-center justify-between text-left"
      >
        <span className="text-xl font-black text-slate-900 tracking-tight">{question}</span>
        <div className={`p-2 rounded-full bg-slate-50 transition-transform ${isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : 'text-slate-400'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium text-lg border-t border-slate-50 pt-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQPage;
