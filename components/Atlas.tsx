import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Map, Search, Crosshair, Pin, Navigation, 
  Layers, Package, ShoppingBag, Zap, ArrowRight,
  TrendingUp, Activity, LayoutGrid, Filter,
  Bell, Users, MessageSquare, Clock, ChevronRight,
  ShieldCheck, AlertTriangle
} from 'lucide-react';

// --- Helper Components ---

const BrowserChrome = ({ children, url }: any) => (
  <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-full max-w-2xl mx-auto">
    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
      </div>
      <div className="flex-1 bg-slate-200/50 rounded-lg px-3 py-1 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 font-mono truncate">{url}</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full border border-brand-500"></div>
          <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Agentix</span>
        </div>
      </div>
    </div>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </div>
);

import AwarenessMap from './AwarenessMap';

interface AtlasProps {
  onOpenWaitlist?: () => void;
  isEmbedded?: boolean;
}

const Atlas: React.FC<AtlasProps> = ({ onOpenWaitlist, isEmbedded }) => {
  const introRef = useRef<HTMLDivElement>(null);

  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      {!isEmbedded && (
        <section className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden px-4">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 font-black uppercase text-[10px] tracking-[0.2em] mb-12">
              <Globe size={12} /> Autonomous Commerce Intelligence
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] max-w-5xl mx-auto uppercase">
               Grounding intelligence for autonomous execution
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Provides real-time system context that ensures reliable execution across agent-driven workflows.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={scrollToIntro}
                  className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-500 transition-colors"
                >
                  Learn more
                </button>
                <button 
                  onClick={onOpenWaitlist}
                  className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-white/10 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest max-w-xs text-center leading-relaxed">
                There's lots of exciting things happening behind the scenes. <br/>
                <a href="mailto:hello@agentix.ai" className="text-brand-700 hover:text-brand-600 transition-colors underline underline-offset-4">Schedule a call now to get more info</a>
              </p>
            </div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="flex flex-col items-center gap-2 text-slate-500 mt-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to explore Atlas</span>
              <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Intro Section */}
      <section ref={introRef} className="py-20 md:py-24 bg-white px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4">Coming Soon: Atlas Grounding</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
              Grounding intelligence for <br/> <span className="text-brand-700">autonomous execution.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto italic">
              "Atlas is currently in private development. Sign up or you'll miss out on the first wave of autonomous commerce infrastructure."
            </p>
          </motion.div>
        </div>
      </section>

      {/* NEW Awareness Map Section */}
      <AwarenessMap />

      {/* Product Preview: Inventory Intelligence */}
      <section className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              Coming Soon: Multi-Grid Intelligence
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Enterprise Dashboard. <br/>
              <span className="text-slate-400">Project Atlas Early Preview.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            {/* The Dashboard Mockup */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden relative">
              
              {/* Dashboard Header */}
              <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AUDI CANADA · VANCOUVER</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-md border border-blue-100">B2B Enterprise</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[8px] font-black text-emerald-600 uppercase">Live</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                    <Search size={12} />
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                    <Bell size={12} />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-[9px] font-black">NA</div>
                </div>
              </div>

              {/* Dash Title & Subtitle */}
              <div className="px-8 pt-8 pb-4 bg-slate-50/50">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Inventory Intelligence</h3>
                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                  <span>Atlas detected a 2025 Audi S5 shortage</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Global B2B transfer initiated</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-brand-600 font-bold">12 units incoming from Munich</span>
                </div>
              </div>

              {/* Dash Content Area */}
              <div className="p-8 pt-4 bg-slate-50/50">
                {/* Alert Banner */}
                <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white shrink-0">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-amber-900 uppercase tracking-tight">Critical Inventory Alert — 2025 Audi S5 Sportback</h4>
                      <p className="text-[10px] text-amber-700 font-medium">Radar detected stock at <span className="font-bold">2 units</span> (threshold: 5). Atlas initiated global B2B scan across 14 Audi nodes.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Triggered Today · 8:42am</span>
                  </div>
                </div>

                {/* Metric Grid */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                  {[
                    { label: 'Vancouver Stock', value: '2', sub: 'units · critical', color: 'border-red-500 text-red-600' },
                    { label: 'Munich Surplus', value: '34', sub: 'units · sourced', color: 'border-blue-500 text-blue-600' },
                    { label: 'Transfer Init.', value: '12', sub: 'units incoming', color: 'border-brand-500 text-brand-600' },
                    { label: 'Leads Pushed', value: '8', sub: 'agents notified', color: 'border-emerald-500 text-emerald-600' },
                    { label: 'Est. Revenue', value: '$1.1M', sub: 'pipeline', color: 'border-purple-500 text-purple-600' },
                  ].map((stat, i) => (
                    <div key={i} className={`p-4 bg-white rounded-2xl border-l-[3px] border border-slate-100 shadow-sm ${stat.color.split(' ')[0]}`}>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{stat.label}</p>
                      <p className={`text-xl font-black ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                      <p className="text-[9px] text-slate-500 font-medium">{stat.sub}</p>
                      <div className="mt-3 flex items-center gap-1 text-[8px] font-black text-slate-300 uppercase cursor-default">
                        Tap to view <ArrowRight size={8} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-8 relative">
                  {/* Frosted Overlay */}
                  <div className="absolute inset-x-[-32px] bottom-[-32px] top-0 bg-white/40 backdrop-blur-md z-30 flex flex-col items-center justify-center border-t border-slate-200/50">
                    <div className="text-center p-8 max-w-sm">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-brand-600 mx-auto mb-6">
                        <ShieldCheck size={24} />
                      </div>
                      <p className="text-base font-black text-slate-900 tracking-tight mb-2">Sign up or you'll miss out</p>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                        The full Atlas suite including Agent-to-Agent negotiation and B2B transfer orchestration is currently in limited alpha.
                      </p>
                      <button 
                        onClick={onOpenWaitlist}
                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                      >
                        Sign up or you'll miss out
                      </button>
                    </div>
                  </div>

                  {/* Products Column (Partially Visible under blur) */}
                  <div className="col-span-8 space-y-6 opacity-50">
                    <div className="flex items-center justify-between">
                      <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Products being pushed to dealer agents</h5>
                      <span className="px-2 py-1 bg-brand-50 text-brand-600 text-[8px] font-black rounded-full uppercase tracking-tighter">3 active</span>
                    </div>

                    {[
                      { name: '2025 Audi S5 Sportback', meta: 'Quattro · Prestige · Glacier White', price: '$89,900', status: '12 incoming', badges: ['B2B', 'B2C'], icon: <Package className="text-blue-500" /> },
                      { name: '2025 Audi Q7 Prestige', meta: '3.0T · Mythos Black · 7-seat', price: '$112,500', status: '8 in stock', badges: ['B2B Fleet'], icon: <Package className="text-purple-500" /> },
                      { name: '2025 Audi Q8 e-tron', meta: 'Electric · Chronos Grey · 582km range', price: '$119,900', status: '5 in stock', badges: ['B2C EV'], icon: <Package className="text-emerald-500" /> }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 border border-slate-100">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h6 className="text-[12px] font-black text-slate-900">{item.name}</h6>
                          <p className="text-[10px] text-slate-500 font-medium">{item.meta}</p>
                          <div className="flex gap-2 mt-2">
                            {item.badges.map(b => (
                              <span key={b} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black rounded uppercase">{b}</span>
                            ))}
                            <span className="px-1.5 py-0.5 bg-red-50 text-red-500 text-[8px] font-black rounded uppercase">{item.status}</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <div>
                            <p className="text-[12px] font-black text-slate-900">{item.price}</p>
                            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">MSRP CAD</p>
                          </div>
                          <button className="px-3 py-1.5 bg-brand-600 text-white text-[9px] font-black rounded-lg uppercase tracking-widest hover:bg-brand-500">
                            Push to agents →
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Agent Negotiation */}
                    <div className="pt-8">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare size={14} className="text-slate-400" />
                        <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Agent-to-Agent Negotiation</h5>
                      </div>
                      <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full"></div>
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">AT</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-white">Atlas Flow</span>
                                <span className="text-[8px] font-bold text-white/30 tracking-tight">8:43am</span>
                              </div>
                              <div className="p-4 bg-brand-600/10 border border-brand-500/20 rounded-2xl rounded-tl-none">
                                <p className="text-[11px] text-brand-100 font-medium leading-relaxed">
                                  Initiating B2B request. Audi Vancouver requires 2025 S5 Sportback units. Scanning global Audi network.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-[10px] font-black shrink-0">DE</div>
                            <div className="flex-1 text-right">
                              <div className="flex items-center gap-2 mb-1 justify-end">
                                <span className="text-[8px] font-bold text-white/30 tracking-tight">8:43am</span>
                                <span className="text-[10px] font-black text-white">Audi Munich</span>
                              </div>
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tr-none text-left">
                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                                  Confirmed — 34 units of 2025 S5 Sportback at Munich logistics center. Available for B2B transfer.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar stats (Partially Visible under blur) */}
                  <div className="col-span-4 space-y-8 opacity-50">
                    {/* Live Inventory */}
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h6 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Live Inventory · S5 Sportback</h6>
                        <Activity size={14} className="text-slate-400" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-[10px]">🇨🇦 Vancouver (now)</div>
                          </div>
                          <span className="text-[12px] font-black text-red-600">2</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-[10px]">🇨🇦 Vancouver (incoming)</div>
                          </div>
                          <span className="text-[12px] font-black text-brand-600">+12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-[10px]">🇩🇪 Munich (remaining)</div>
                          </div>
                          <span className="text-[12px] font-black text-slate-900">22</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[9px] text-slate-400 font-black uppercase">ETA Vancouver:</span>
                        <span className="text-[10px] font-black text-brand-600">Apr 21–25, 2026</span>
                      </div>
                    </div>

                    {/* Leads Match */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h6 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Matched Consumer Leads</h6>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-full uppercase">8 matched</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'Michael S.', match: '94%', sub: 'Pre-approved', tags: ['Viewed again (3x)', 'Pre-approved financing'] },
                          { name: 'Amanda L.', match: '91%', sub: 'Test drive booked', tags: ['Saved configuration', 'Booked test drive'] },
                          { name: 'Ravi K.', match: '78%', sub: 'Interested', tags: ['Viewed S5', 'Saved config'] }
                        ].map((lead, i) => (
                          <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">{lead.name.split(' ')[0][0]}{lead.name.split(' ')[1][0]}</div>
                                <div>
                                  <p className="text-[11px] font-black text-slate-900">{lead.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold tracking-tight">{lead.sub}</p>
                                </div>
                              </div>
                              <span className="text-[11px] font-black text-brand-600">{lead.match}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {lead.tags.map(t => (
                                <span key={t} className="px-1.5 py-0.5 bg-slate-50 text-[8px] font-black text-slate-400 rounded-md flex items-center gap-1">
                                   {t.includes('Viewed') ? <Clock size={8} /> : (t.includes('Test') ? <Clock size={8} /> : <ShieldCheck size={8} />)}
                                   {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/10 blur-[80px] rounded-full -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-slate-900 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-12 leading-none">
            Ground your agents <br/> <span className="text-brand-700">Atlas is coming.</span>
          </h2>
          <div className="flex justify-center gap-6">
            <button 
              onClick={onOpenWaitlist}
              className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-brand-500 transition-colors"
            >
              Sign up or you'll miss out
            </button>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">
              Partner Program
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Atlas;
