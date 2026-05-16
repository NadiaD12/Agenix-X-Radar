import React from 'react';
import { Network, Search, ShoppingCart, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturesProps {
  onOpenSignup: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onOpenSignup }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="why-agentix" className="py-16 md:py-20 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-700 font-semibold tracking-wide uppercase text-sm mb-3"
          >
            Why Agentix
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            Infrastructure for AI-Driven Commerce
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Agentix provides the infrastructure ecommerce platforms and ISVs need to power AI visibility, autonomous checkout, and agent-driven payments.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
        >
          <motion.div variants={itemVariants} className="h-full">
            <FeatureCard 
              icon={<Network className="text-brand-600" />}
              title="Agentic Connectivity"
              description="Integrate once at the platform level and instantly make all downstream merchants accessible to AI agents."
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="h-full">
            <FeatureCard 
              icon={<Search className="text-amber-600" />}
              title="AI Visibility Optimization"
              description="Structure product data so AI assistants like ChatGPT, Perplexity, and Gemini can discover and recommend products."
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="h-full">
            <FeatureCard 
              icon={<ShoppingCart className="text-emerald-600" />}
              title="Agentic Transaction Protocol"
              description="Enable AI agents to negotiate and complete purchases through standardized AI-to-merchant payment flows."
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="h-full">
            <FeatureCard 
              icon={<Lock className="text-blue-700" />}
              title="Agent Verification & Safety"
              description="Verify AI agents and transaction liquidity before checkout to ensure secure autonomous commerce."
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group p-6 rounded-2xl bg-white backdrop-blur-sm border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
    <div className="w-12 h-12 bg-slate-50 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24 }) : icon}
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-600 leading-relaxed text-sm flex-1">
      {description}
    </p>
  </div>
);

export default Features;