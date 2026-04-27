import React from 'react';
import Logo from './Logo';

interface NavbarProps {
  onOpenDemo: () => void;
  onViewChange: (view: 'home' | 'radar' | 'nexus' | 'faq') => void;
  currentView: 'home' | 'radar' | 'nexus';
}

const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onViewChange, currentView }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 shrink-0 cursor-pointer"
            onClick={() => onViewChange('home')}
          >
            <Logo />
            <span className="font-bold text-xl tracking-tight text-slate-900">Agentix</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => {
                onViewChange('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'home' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Home
            </button>
            <button 
              onClick={() => {
                onViewChange('radar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'radar' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Radar
            </button>
            <button 
              onClick={() => {
                onViewChange('nexus');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'nexus' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Nexus
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="mailto:Hello@agentixpay.ai"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-bold rounded-full text-slate-900 bg-white hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
            >
              Contact Us
            </a>
            <div className="relative group">
              {/* Intensified Glowing Effect */}
              <div className="absolute inset-[-12px] bg-brand-500/20 blur-2xl rounded-full transition-opacity duration-500 group-hover:opacity-100 group-hover:bg-brand-500/40"></div>
              <div className="absolute inset-[-4px] bg-brand-400/30 blur-xl rounded-full"></div>
              <div className="absolute inset-[-2px] bg-cyan-300/20 blur-md rounded-full"></div>
              
              <button 
                onClick={onOpenDemo}
                className="relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-lg hover:shadow-xl z-10"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;