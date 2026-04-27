import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Security: React.FC = () => {
  const [activeLabel, setActiveLabel] = useState(0);
  const labels = [
    "End-to-End Encryption",
    "SOC2 Type II Certified",
    "Isolated Tenant Infrastructure"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLabel((prev) => (prev + 1) % labels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="security" className="py-32 bg-[#092C4C] text-white relative overflow-hidden scroll-mt-20">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-8"
          >
            <ShieldCheck size={14} className="text-brand-400" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Bank-Grade Security</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] uppercase"
          >
            Uncompromising <br/> protection.
          </motion.h2>
        </div>

        <div className="relative h-[500px] md:h-[700px] flex items-center justify-center">
          {/* Slanted Map Container */}
          <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
            <motion.div 
              initial={{ rotateX: 45, rotateZ: -15, y: 50, opacity: 0 }}
              whileInView={{ rotateX: 45, rotateZ: -15, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full max-w-5xl aspect-video"
            >
              {/* Stylized World Map (Dots) */}
              <WorldMapDots />

              {/* Security Labels with Dots */}
              <SecurityPoint 
                x="25%" y="35%" 
                label={labels[0]} 
                isActive={activeLabel === 0} 
              />
              <SecurityPoint 
                x="55%" y="25%" 
                label={labels[1]} 
                isActive={activeLabel === 1} 
              />
              <SecurityPoint 
                x="75%" y="55%" 
                label={labels[2]} 
                isActive={activeLabel === 2} 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorldMapDots = () => {
  // Generate random dots for the map background
  const dots = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 opacity-20">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const SecurityPoint = ({ x, y, label, isActive }: { x: string, y: string, label: string, isActive: boolean }) => (
  <div 
    className="absolute flex flex-col items-center" 
    style={{ left: x, top: y }}
  >
    {/* The Dot */}
    <div className="relative">
      <motion.div 
        animate={{ scale: isActive ? [1, 1.5, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`w-4 h-4 rounded-full ${isActive ? 'bg-brand-400 shadow-[0_0_20px_rgba(56,83,230,0.8)]' : 'bg-white/40'} transition-colors duration-500`}
      />
      {isActive && (
        <motion.div 
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-brand-400 rounded-full"
        />
      )}
    </div>

    {/* The Label */}
    <div className="mt-4 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={isActive ? 'active' : 'inactive'}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ 
            opacity: isActive ? 1 : 0.4, 
            y: 0, 
            scale: isActive ? 1.2 : 0.9,
            color: isActive ? '#60a5fa' : '#94a3b8'
          }}
          transition={{ duration: 0.5 }}
          className="whitespace-nowrap font-black uppercase tracking-widest text-xs md:text-sm text-center"
        >
          {label}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

export default Security;