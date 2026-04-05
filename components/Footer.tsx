import React from 'react';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const SubstackLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.539 8.242H1.46V5.406h21.079v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.079V0z" />
  </svg>
);

interface FooterProps {
  onViewChange?: (view: 'home' | 'radar') => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <span className="font-bold text-lg text-slate-900">Agentix</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Agentix is a merchant enablement solution that makes thousands of existing merchants instantly ready for Agentic Commerce, so AI agents can actually discover, shop, and pay across the open web.
            </p>
            
            {/* Substack Button */}
            <a 
              href="https://agentixpay.substack.com/p/agentixpay-white-paper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-4 py-2.5 bg-[#FF6719] hover:bg-[#e65c16] text-white rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group"
            >
              <SubstackLogo className="w-5 h-5" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Read our</span>
                <span className="text-sm font-extrabold">Whitepaper</span>
              </div>
              <ExternalLink size={14} className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <button 
                  onClick={() => {
                    onViewChange?.('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-brand-600 transition-colors"
                >
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onViewChange?.('radar');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-brand-600 transition-colors"
                >
                  Radar
                </button>
              </li>
              <li><a href="#protocol" className="hover:text-brand-600 transition-colors">Integrations</a></li>
              <li><a href="#security" className="hover:text-brand-600 transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="https://agentixpay.substack.com" target="_blank" className="hover:text-brand-600 transition-colors">Substack Blog</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Agentix Financial Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 items-center">
            <a 
              href="https://agentixpay.substack.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-[#FF6719] transition-colors"
              aria-label="Substack"
            >
              <SubstackLogo className="w-5 h-5" />
            </a>
            <a 
              href="https://x.com/agentixpay" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-900"><Github size={20} /></a>
            <a 
              href="https://www.linkedin.com/company/agentix-pay/?viewAsMember=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;