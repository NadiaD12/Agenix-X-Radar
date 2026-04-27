import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Globe, Truck, BarChart, ShieldCheck, Sparkles } from 'lucide-react';

const ComingSoon: React.FC = () => {
  const features = [
    {
      icon: <Truck className="text-blue-500" />,
      title: "Agent-Native Logistics",
      description: "Automated shipping negotiation and fulfillment orchestration for AI agents.",
      status: "Q3 2026"
    },
    {
      icon: <Globe className="text-emerald-500" />,
      title: "Cross-Border Settlement",
      description: "Instant global payments and currency conversion for international agentic commerce.",
      status: "Q4 2026"
    },
    {
      icon: <BarChart className="text-purple-500" />,
      title: "Predictive Inventory",
      description: "AI-driven stock management based on emerging agentic demand signals.",
      status: "Q1 2027"
    },
    {
      icon: <ShieldCheck className="text-orange-500" />,
      title: "Agent Identity (AID)",
      description: "Decentralized identity verification for autonomous shopping agents.",
      status: "Research"
    }
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-500/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <Rocket size={14} className="text-brand-600" />
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">The Future of Agentix</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-none"
          >
            Building the <span className="text-brand-600">Next Frontier.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            We're not just building a protocol; we're building the infrastructure for a fully autonomous economy. Here's what's on our roadmap.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="inline-flex items-center px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                {feature.status}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Teaser Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-brand-400" size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Early Access</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Be the first to test the <br/> Agentix Logistics Engine.</h3>
              <p className="text-slate-400 font-medium">Join our developer beta to start building agent-native fulfillment flows today.</p>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-brand-50 transition-colors shadow-xl">
              Join the Beta
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
