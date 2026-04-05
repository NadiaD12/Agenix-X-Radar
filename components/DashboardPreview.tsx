import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowUpRight, 
  Search, 
  Globe, 
  Cpu, 
  BrainCircuit,
  LayoutDashboard,
  Wallet,
  Settings,
  Bell,
  ArrowDownLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'dashboard' | 'analytics' | 'discovery' | 'transactions';

const DashboardPreview: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [strategyInsight, setStrategyInsight] = useState<string>("Analyzing Agentic Commerce traffic patterns...");
  const [isGenerating, setIsGenerating] = useState(false);

  // Use Gemini to generate a "Live Insight" for the dashboard
  const fetchInsight = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a 1-sentence analytical insight for a fintech dashboard for ${currentView} in the context of "Agentic Commerce". 
        If dashboard, talk about overall traffic from AI agents. 
        If analytics, talk about revenue growth driven by autonomous discovery. 
        If discovery, talk about Perplexity/ChatGPT rankings for merchant products. 
        If transactions, talk about sub-second protocol execution for agents. 
        Keep it professional and data-driven.`,
      });
      setStrategyInsight(response.text || "Agentic Commerce discovery up 14% this week.");
    } catch (e) {
      setStrategyInsight("AI Agents are prioritizing merchants with sub-100ms API response times for autonomous procurement.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchInsight();
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'analytics':
        return <AnalyticsView />;
      case 'discovery':
        return <DiscoveryView />;
      case 'transactions':
        return <TransactionsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <section id="agentix-in-action" className="py-24 bg-slate-50/50 relative overflow-hidden border-b border-slate-200 scroll-mt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-brand-100 px-3 py-1 rounded-full mb-4 border border-brand-200"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-brand-600 font-bold tracking-widest uppercase text-[10px]">Control Center</span>
          </motion.div>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
            Agentix Control Center
          </h3>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            The Agentix Control Center is designed to track merchant revenue, optimize growth, and prevent fraud in real-time. Gain the visibility to improve agentic channel performance and drive higher conversions.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 text-brand-600 font-black uppercase tracking-[0.25em] text-xs mb-12 animate-pulse">
          <ChevronRight size={14} className="text-brand-500" />
          <span>Try our interactive dashboard</span>
          <ChevronRight size={14} className="rotate-180 text-brand-500" />
        </div>

        {/* Dashboard Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 bg-white border border-slate-200 flex flex-col md:flex-row h-[800px] backdrop-blur-sm"
        >
          
          {/* Sidebar - Light Mode Aesthetic */}
          <div className="hidden md:flex w-20 lg:w-72 bg-slate-50 flex-col p-6 text-slate-500 border-r border-slate-200">
            <div className="flex items-center space-x-3 px-3 py-6 mb-10">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden lg:block overflow-hidden">
                <span className="block font-black text-slate-900 tracking-tighter text-lg leading-none uppercase">Agentix</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <SidebarItem 
                icon={<LayoutDashboard size={20} />} 
                label="Overview" 
                active={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')}
              />
              <SidebarItem 
                icon={<BarChart3 size={20} />} 
                label="Agent Analytics" 
                active={currentView === 'analytics'} 
                onClick={() => setCurrentView('analytics')}
              />
              <SidebarItem 
                icon={<Globe size={20} />} 
                label="AEO Discovery" 
                active={currentView === 'discovery'} 
                onClick={() => setCurrentView('discovery')}
              />
              <SidebarItem 
                icon={<Wallet size={20} />} 
                label="Agent Payments" 
                active={currentView === 'transactions'} 
                onClick={() => setCurrentView('transactions')}
              />
            </div>
            
            <div className="mt-auto space-y-2 pt-6 border-t border-slate-200">
              <SidebarItem icon={<Settings size={20} />} label="Protocol Config" />
              <SidebarItem icon={<Bell size={20} />} label="Agent Alerts" />
              
              <div className="mt-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 hidden lg:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Protocol Status</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">v4.2.1-AC</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Top Bar */}
            <div className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
              <div className="flex items-center space-x-6">
                <h4 className="text-lg font-black text-slate-900 capitalize tracking-tight">
                  {currentView === 'dashboard' ? 'Agentic Commerce Overview' : currentView}
                </h4>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center space-x-3 text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                  <Search size={16} />
                  <span className="text-xs font-medium">Filter Agentic Transaction Logs...</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden lg:flex items-center space-x-3 text-[11px] font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                  Protocol Status: <span className="text-emerald-600 ml-1">Agent-Ready</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-900">Admin Console</p>
                    <p className="text-[10px] font-medium text-slate-400">Superuser</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-blue-900 shadow-lg shadow-brand-500/20 flex items-center justify-center text-white font-black text-xs">AC</div>
                </div>
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>

              {/* AI Insight Bar - Static at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-50 border border-brand-200 rounded-3xl p-6 flex items-center justify-between shadow-xl shadow-slate-200/50 group"
              >
                <div className="flex items-center space-x-6">
                  <div className={`p-4 bg-brand-100 rounded-2xl transition-all duration-500 group-hover:bg-brand-200 ${isGenerating ? 'animate-pulse' : ''}`}>
                    <BrainCircuit className="text-brand-600" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-black text-slate-900 tracking-tight">Agentic Commerce Pulse</h5>
                      <span className="text-[9px] bg-brand-200 text-brand-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Live AI Analytics</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
                      {strategyInsight}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={fetchInsight}
                  className="px-6 py-3 bg-brand-600 text-white text-xs font-black rounded-xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/20 active:scale-95 flex items-center gap-2 uppercase tracking-widest"
                >
                  <TrendingUp size={14} />
                  Analyze Network
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Sub-Views ---

const OverviewView = () => {
  const [timeframe, setTimeframe] = useState<'Month' | 'Year'>('Month');
  
  const monthData = [
    { label: 'Jan', agent: 12, human: 45 }, { label: 'Feb', agent: 18, human: 42 },
    { label: 'Mar', agent: 24, human: 48 }, { label: 'Apr', agent: 35, human: 44 },
    { label: 'May', agent: 42, human: 46 }, { label: 'Jun', agent: 55, human: 43 },
    { label: 'Jul', agent: 68, human: 47 }, { label: 'Aug', agent: 74, human: 45 },
    { label: 'Sep', agent: 88, human: 44 }, { label: 'Oct', agent: 110, human: 46 },
    { label: 'Nov', agent: 135, human: 48 }, { label: 'Dec', agent: 162, human: 45 }
  ];

  const yearData = [
    { label: '2021', agent: 2, human: 40 }, { label: '2022', agent: 8, human: 42 },
    { label: '2023', agent: 25, human: 45 }, { label: '2024', agent: 78, human: 48 },
    { label: '2025*', agent: 195, human: 50 }
  ];

  const currentData = timeframe === 'Month' ? monthData : yearData;
  const maxVal = Math.max(...currentData.map(d => d.agent));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Agentic Revenue" 
          value="$142,890.00" 
          trend="+24.5%" 
          icon={<TrendingUp className="text-brand-500" size={18} />} 
          color="brand"
        />
        <StatCard 
          label="Agentic Discovery Rate" 
          value="89.2%" 
          trend="+12.1%" 
          icon={<Search className="text-blue-700" size={18} />} 
          color="blue"
        />
        <StatCard 
          label="Autonomous Conversion" 
          value="4.2%" 
          trend="+0.8%" 
          icon={<Zap className="text-emerald-500" size={18} />} 
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="font-black text-slate-900 text-lg tracking-tight">Agentic vs. Human Traffic</h4>
              <p className="text-xs font-medium text-slate-600">Autonomous volume growth trends</p>
            </div>
            <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200">
              <button 
                onClick={() => setTimeframe('Month')}
                className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${timeframe === 'Month' ? 'bg-white text-brand-600 shadow-md border border-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeframe('Year')}
                className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${timeframe === 'Year' ? 'bg-white text-brand-600 shadow-md border border-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Year
              </button>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between space-x-3 px-2">
            {currentData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                <div className="w-full flex flex-col items-center justify-end h-full space-y-1">
                   {/* Human Bar */}
                   <div 
                      className="w-full bg-slate-100 rounded-lg transition-all duration-1000 ease-out" 
                      style={{ height: `${(d.human / maxVal) * 100}%` }}
                    ></div>
                   {/* Agent Bar */}
                   <div 
                      className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-lg group-hover:from-brand-500 group-hover:to-brand-300 transition-all duration-700 ease-out shadow-lg shadow-brand-500/10" 
                      style={{ height: `${(d.agent / maxVal) * 100}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-xl shadow-2xl pointer-events-none whitespace-nowrap z-10 font-black tracking-tight border border-slate-700 translate-y-2 group-hover:translate-y-0">
                        {d.agent} Agent Trans.
                      </div>
                    </div>
                </div>
                <span className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-wider">{d.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex items-center space-x-8 pt-8 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-brand-500 shadow-md border-2 border-white"></div>
              <span className="text-xs text-slate-600 font-bold tracking-tight">Agentic Commerce</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-white"></div>
              <span className="text-xs text-slate-600 font-bold tracking-tight">Standard Commerce</span>
            </div>
            <div className="ml-auto text-[10px] text-slate-400 font-black tracking-widest uppercase">
              * Projected Agentic volume
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-900 border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-brand-600/10 transition-all duration-700"></div>
          
          <h4 className="font-black mb-8 flex items-center text-lg tracking-tight">
            <div className="p-2 bg-slate-50 rounded-lg mr-3 border border-slate-100">
               <Cpu size={20} className="text-brand-600" />
            </div>
            Live Agent Flows
          </h4>
          <div className="space-y-6 relative z-10">
            <ActivityRow agent="Google Gemini (UCP)" action="Checkout" result="$1.2k OK" time="2s ago" status="success" />
            <ActivityRow agent="ChatGPT (ACP)" action="AEO Discovery" result="SKU-89 Rank 1" time="15s ago" />
            <ActivityRow agent="Shopping Agent" action="Auto-Pay" result="$428.00 OK" time="1m ago" status="success" />
            <ActivityRow agent="Agentic Browser" action="Stock Lock" result="Protocol v4.2" time="5m ago" />
            <ActivityRow agent="Perplexity Pro" action="Negotiate" result="Price Verified" time="8m ago" />
          </div>
          <button className="w-full mt-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 bg-slate-50/50">
            View Protocol Stream
          </button>
        </div>
      </div>
    </div>
  );
};

const AnalyticsView = () => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="AEO Impressions" value="2.4M" trend="+40%" icon={<Globe size={18} className="text-blue-600" />} color="blue" />
      <StatCard label="Agentic Efficiency" value="98.1%" trend="+2%" icon={<Cpu size={18} className="text-blue-800" />} color="darkblue" />
      <StatCard label="Agent LTV" value="$1,102" trend="+15%" icon={<Users size={18} className="text-emerald-600" />} color="emerald" />
      <StatCard label="Autonomous Yield" value="+1.2%" trend="+0.1%" icon={<TrendingUp size={18} className="text-brand-600" />} color="brand" />
    </div>

    <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm">
      <div className="mb-10">
        <h4 className="font-black text-slate-900 text-xl tracking-tight">Agentic Funnel Performance</h4>
        <p className="text-sm text-slate-600 font-medium">Tracking the autonomous journey</p>
      </div>
      <div className="space-y-12">
        <FunnelStep label="AEO Visibility (SearchGPT/Perplexity)" percentage={100} value="2,400,293" color="bg-slate-100" barColor="bg-slate-400" />
        <FunnelStep label="Agentic Intent Discovery" percentage={45} value="1,080,131" color="bg-brand-50" barColor="bg-brand-500" />
        <FunnelStep label="Protocol Handshake" percentage={18} value="432,052" color="bg-brand-100" barColor="bg-brand-400" />
        <FunnelStep label="Autonomous Commerce Completion" percentage={4.2} value="100,812" color="bg-brand-200" barColor="bg-brand-300" />
      </div>
    </div>
  </div>
);

const DiscoveryView = () => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h4 className="font-black text-slate-900 text-lg tracking-tight">Answer Engine Optimization (AEO) Rankings</h4>
          <p className="text-xs font-medium text-slate-600">How AI agents see your merchants</p>
        </div>
        <div className="text-[10px] text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full uppercase font-black tracking-widest border border-brand-200">Agentic Index</div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase tracking-[0.15em] font-black">
          <tr>
            <th className="px-8 py-5">AI Agent / Search</th>
            <th className="px-8 py-5">Agentic Score</th>
            <th className="px-8 py-5 text-center">Discovery Mentions</th>
            <th className="px-8 py-5 text-right">Checkout Trigger Rate</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <DiscoveryRow agent="Perplexity Pro" score="98/100" mentions="12.4k" rate="12.5%" />
          <DiscoveryRow agent="ChatGPT Search" score="94/100" mentions="45.1k" rate="8.2%" />
          <DiscoveryRow agent="Claude Ops" score="89/100" mentions="2.1k" rate="14.1%" />
          <DiscoveryRow agent="Gemini AI" score="96/100" mentions="18.9k" rate="10.8%" />
          <DiscoveryRow agent="Brave Leo" score="72/100" mentions="5.4k" rate="4.5%" />
        </tbody>
      </table>
    </div>
  </div>
);

const TransactionsView = () => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="font-black text-slate-900 text-lg tracking-tight">Agentic Commerce Config</h4>
            <p className="text-xs font-medium text-slate-600">Customize protocol behavior</p>
          </div>
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
            <Settings size={20} className="text-slate-500" />
          </div>
        </div>
        <div className="space-y-5">
          <AccessToggle label="Enable Autonomous Agent Checkout" active />
          <AccessToggle label="Require Proof of Liquidity" active />
          <AccessToggle label="Whitelist Agentic Networks" />
          <AccessToggle label="Agentic Negotiation Buffer (±5%)" active />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
        <div className="mb-8">
          <h4 className="font-black text-slate-900 text-lg tracking-tight">Security & Liquidity</h4>
          <p className="text-xs font-medium text-slate-600">Real-time threat detection</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] transition-all hover:shadow-lg hover:shadow-emerald-500/5 group">
            <ShieldCheck className="text-emerald-600 mb-4 transition-transform group-hover:scale-110" size={28} />
            <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Anti-Bot vs Agent</div>
            <div className="text-2xl font-black text-emerald-600 tracking-tight">Secure</div>
          </div>
          <div className="p-6 bg-brand-50 border border-brand-100 rounded-[2rem] transition-all hover:shadow-lg hover:shadow-brand-500/5 group">
            <CheckCircle2 className="text-brand-600 mb-4 transition-transform group-hover:scale-110" size={28} />
            <div className="text-[10px] text-brand-600 font-black uppercase tracking-widest mb-1">Protocol Version</div>
            <div className="text-2xl font-black text-brand-600 tracking-tight">v4.2.1-AC</div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
          <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Agentic Transaction Log</span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase bg-slate-100 px-3 py-1 rounded-full">Real-time handshakes</div>
      </div>
      <div className="p-4 space-y-1 font-mono text-[11px] bg-white">
        <LogLine type="SUCCESS" msg="Agent verified via Agentix Protocol" val="[$2,400.00]" />
        <LogLine type="INFO" msg="Initiating Agentic Handshake..." val="[v1.2]" />
        <LogLine type="SUCCESS" msg="Autonomous Checkout: SKU-1192" val="[0.44s]" />
        <LogLine type="WARNING" msg="Agent negotiation buffer limit hit" val="[-5%]" />
        <LogLine type="SUCCESS" msg="Agentic Signature Verified" val="[AC-AUTH]" />
      </div>
    </div>
  </div>
);

// --- Small Utility Components ---

const SidebarItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`flex items-center space-x-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 relative group ${active ? 'bg-brand-600 text-white shadow-[0_8px_20px_-4px_rgba(56,83,230,0.6)]' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
  >
    {active && (
      <motion.div 
        layoutId="active-nav"
        className="absolute inset-0 bg-brand-600 rounded-2xl -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <div className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-brand-400'} transition-colors`}>
      {icon}
    </div>
    <span className="text-sm font-black tracking-tight hidden lg:block">{label}</span>
    {active && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white hidden lg:block"></div>}
  </motion.div>
);

const StatCard = ({ label, value, trend, icon, color }: { label: string, value: string, trend: string, icon: React.ReactNode, color: string }) => {
  const colorMap: any = {
    brand: 'border-brand-800 bg-brand-900/30 text-brand-400',
    emerald: 'border-emerald-800 bg-emerald-900/30 text-emerald-400',
    blue: 'border-blue-800 bg-blue-900/30 text-blue-400',
    darkblue: 'border-blue-700 bg-blue-800/30 text-blue-300',
  };

  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-[#0c111d] p-6 rounded-[2rem] border border-slate-800/60 shadow-sm transition-all hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl border ${colorMap[color] || 'border-slate-700 bg-slate-800 text-slate-400'} shadow-sm`}>
          {icon}
        </div>
        <span className="text-[10px] font-black text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full uppercase tracking-wider">{trend}</span>
      </div>
      <p className="text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">{label}</p>
      <p className="text-2xl font-black text-white tracking-tighter">{value}</p>
    </motion.div>
  );
};

const ActivityRow = ({ agent, action, result, time, status }: { agent: string, action: string, result: string, time: string, status?: 'success' }) => (
  <div className="flex items-center justify-between text-[11px] py-4 border-b border-slate-800/50 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors group/row">
    <div className="flex items-center space-x-3">
      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${status === 'success' ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]' : 'bg-brand-500 group-hover/row:scale-125'}`}></div>
      <div>
        <span className="font-black text-slate-100 block tracking-tight">{agent}</span>
        <span className="text-slate-500 font-bold tracking-widest uppercase text-[9px]">{action}</span>
      </div>
    </div>
    <div className="text-right">
      <div className="text-brand-400 font-mono font-bold">{result}</div>
      <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">{time}</div>
    </div>
  </div>
);

const FunnelStep = ({ label, percentage, value, color, barColor }: { label: string, percentage: number, value: string, color: string, barColor?: string }) => (
  <div className="relative group/funnel">
    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3">
      <span className="text-slate-300">{label}</span>
      <span className="text-brand-400 font-black">{value}</span>
    </div>
    <div className={`h-6 ${color} rounded-full p-1 border border-slate-800/50 shadow-inner`}>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full ${barColor || 'bg-slate-600'} rounded-full shadow-lg transition-all group-hover/funnel:brightness-110`}
      ></motion.div>
    </div>
    <div className="absolute right-0 -bottom-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{percentage}% Efficiency</div>
  </div>
);

const DiscoveryRow = ({ agent, score, mentions, rate }: { agent: string, score: string, mentions: string, rate: string }) => (
  <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all group">
    <td className="px-8 py-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-900/50 group-hover:text-brand-400 transition-colors">
          <Cpu size={14} />
        </div>
        <span className="font-black text-white tracking-tight">{agent}</span>
      </div>
    </td>
    <td className="px-8 py-6">
      <span className="px-3 py-1.5 bg-brand-900/30 text-brand-400 rounded-xl font-mono text-[11px] font-black border border-brand-800/50">{score}</span>
    </td>
    <td className="px-8 py-6 text-slate-400 font-bold text-center">{mentions}</td>
    <td className="px-8 py-6 text-right">
      <span className="text-emerald-400 font-black text-base tracking-tighter">{rate}</span>
    </td>
  </tr>
);

const AccessToggle = ({ label, active = false }: { label: string, active?: boolean }) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-brand-800 transition-all group">
    <span className="text-xs font-black text-slate-300 tracking-tight">{label}</span>
    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 cursor-pointer shadow-inner ${active ? 'bg-brand-600' : 'bg-slate-700'}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-300 ease-spring ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

const LogLine = ({ type, msg, val }: { type: 'SUCCESS' | 'INFO' | 'WARNING', msg: string, val: string }) => {
  const color = type === 'SUCCESS' ? 'text-emerald-400' : type === 'WARNING' ? 'text-amber-400' : 'text-slate-400';
  const iconMap = {
    SUCCESS: <CheckCircle2 size={12} />,
    INFO: <Clock size={12} />,
    WARNING: <AlertCircle size={12} />
  };

  return (
    <div className="flex items-center justify-between hover:bg-slate-800/80 px-4 py-2.5 transition-all group rounded-lg border border-transparent hover:border-slate-800">
      <div className="flex items-center space-x-4">
        <div className={`w-16 font-black uppercase tracking-widest flex items-center gap-1.5 text-[9px] ${color}`}>
          {/* @ts-ignore */}
          {iconMap[type]}
          {type}
        </div>
        <span className="text-slate-400 font-medium group-hover:text-slate-200 transition-colors">{msg}</span>
      </div>
      <span className="text-slate-500 font-bold group-hover:text-brand-400 transition-colors">{val}</span>
    </div>
  );
};

const AlertCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default DashboardPreview;