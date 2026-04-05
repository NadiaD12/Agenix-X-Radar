import React from 'react';
import { Network, Search, ShoppingCart, Lock, ArrowRight } from 'lucide-react';

interface FeaturesProps {
  onOpenSignup: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onOpenSignup }) => {
  return (
    <section id="why-agentix" className="py-24 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Agentix</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Infrastructure for AI-Driven Commerce
          </h3>
          <p className="text-lg text-slate-600">
            Agentix provides the infrastructure ecommerce platforms and ISVs need to power AI visibility, autonomous checkout, and agent-driven payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <FeatureCard 
            icon={<Network className="text-brand-600" />}
            title="Agentic Connectivity"
            description="Integrate once at the platform level and instantly make all downstream merchants accessible to AI agents."
          />
          
          <FeatureCard 
            icon={<Search className="text-amber-600" />}
            title="AI Visibility Optimization"
            description="Structure product data so AI assistants like ChatGPT, Perplexity, and Gemini can discover and recommend products."
          />
          
          <FeatureCard 
            icon={<ShoppingCart className="text-emerald-600" />}
            title="Agentic Transaction Protocol"
            description="Enable AI agents to negotiate and complete purchases through standardized AI-to-merchant payment flows."
          />
          
          <FeatureCard 
            icon={<Lock className="text-blue-700" />}
            title="Agent Verification & Safety"
            description="Verify AI agents and transaction liquidity before checkout to ensure secure autonomous commerce."
          />

        </div>
        
        <div className="mt-20 rounded-3xl bg-white backdrop-blur-md border border-slate-200 text-slate-900 p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-2xl md:text-3xl font-bold mb-4">Lead the Agentic Commerce Revolution</h4>
            <p className="text-slate-600 mb-8 text-lg">
              By 2026, over 20% of all eCommerce transactions will be initiated by non-human agents. Agentix is the only infrastructure that makes merchants ready today.
            </p>
            <button 
              onClick={onOpenSignup}
              className="inline-flex items-center text-slate-900 font-bold hover:text-brand-600 transition-colors decoration-brand-600 decoration-2 underline-offset-4 group"
            >
              Integrate the Agentic API <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Decorative mesh */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-50 to-transparent opacity-50"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-500 rounded-full blur-[80px] opacity-10"></div>
        </div>

      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group p-6 rounded-2xl bg-white backdrop-blur-sm border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 bg-slate-50 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24 }) : icon}
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-600 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default Features;