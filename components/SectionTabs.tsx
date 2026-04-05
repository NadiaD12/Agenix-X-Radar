import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'protocol', label: 'Protocol' },
  { id: 'security', label: 'Security' },
  { id: 'what-agentix-enables', label: 'Why Agentix' },
  { id: 'faq', label: 'FAQ' },
];

const SectionTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Special case: if why-agentix is visible, highlight what-agentix-enables tab
          if (entry.target.id === 'why-agentix') {
            setActiveTab('what-agentix-enables');
          } else {
            setActiveTab(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections including why-agentix
    const sectionIds = [...tabs.map(t => t.id), 'why-agentix'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex justify-center py-3 pointer-events-none">
      <nav className="pointer-events-auto inline-flex p-1 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full shadow-xl shadow-slate-200/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={cn(
                "relative px-4 py-1.5 text-xs md:text-sm font-medium transition-colors duration-200 rounded-full outline-none whitespace-nowrap",
                isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-slate-100 border border-slate-200 shadow-sm rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SectionTabs;