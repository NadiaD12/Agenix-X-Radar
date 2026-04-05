import React from 'react';
import { Search, ShieldCheck, Store, CreditCard } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "AI Agents Discover Products",
      text: "Customers use AI to search for the best product",
      icon: <Search className="text-brand-600 w-10 h-10" />,
      color: "bg-brand-100"
    },
    {
      title: "With Agentix your products are more visible",
      text: "Customers are shown your products thanks to high AEO score",
      icon: <ShieldCheck className="text-blue-600 w-10 h-10" />,
      color: "bg-blue-100"
    },
    {
      title: "Merchant Stores Become Accessible",
      text: "Ecommerce platforms integrate Agentix so their merchants are visible to AI agents.",
      icon: <Store className="text-emerald-600 w-10 h-10" />,
      color: "bg-emerald-100"
    },
    {
      title: "Autonomous Checkout Happens",
      text: "AI agents complete secure purchases through Agentix payment rails.",
      icon: <CreditCard className="text-purple-600 w-10 h-10" />,
      color: "bg-purple-100"
    }
  ];

  return (
    <section id="protocol" className="py-24 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">The Protocol</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            How Agentix Powers AI Commerce
          </h3>
          <p className="text-lg text-slate-600 font-medium">
            Agentix provides the infrastructure that allows AI agents to discover products and complete secure transactions.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-brand-500/30 to-slate-200 w-full z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center mb-8 relative z-10">
                  <div className={`absolute inset-0 ${step.color} rounded-2xl transform transition-transform group-hover:rotate-6 -z-10`}></div>
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-black text-sm border-4 border-white">{index + 1}</div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
