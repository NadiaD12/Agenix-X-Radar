import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Zap, Shield, Globe, Cpu, Database, Network, Link2, 
  TrendingUp, BarChart3, CheckCircle2, ArrowRight, 
  ChevronDown, DollarSign, Clock, Activity, CreditCard
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

const DashboardOverview = () => (
  <div className="w-full">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 mb-6"
    >
      <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
        <Database size={16} />
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Nexus Banking Dashboard</h4>
        <p className="text-[10px] text-slate-500 font-medium">Agent transaction monitoring & settlement</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      {[
        { label: 'Platform Revenue', value: '$161.68', trend: '+18.2%', icon: <DollarSign size={14} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Total GMV', value: '$5,574.57', trend: '+12.3%', icon: <TrendingUp size={14} />, color: 'text-brand-500', bg: 'bg-brand-50' },
        { label: 'Pending Settlement', value: '$553.86', trend: '5 txns', icon: <Clock size={14} />, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Success Rate', value: '98.7%', trend: '+0.2%', icon: <Activity size={14} />, color: 'text-purple-500', bg: 'bg-purple-50' }
      ].map((stat, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <span className={`text-[10px] font-bold ${stat.color.includes('amber') ? 'text-amber-600' : stat.color}`}>{stat.trend}</span>
          </div>
          <p className="text-xl font-black text-slate-900 mb-0.5">{stat.value}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ProtocolBreakdown = () => (
  <div className="w-full">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-900 rounded-2xl p-6 text-white mb-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full"></div>
      <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Revenue by Protocol</h5>
      
      <div className="flex gap-8 mb-8">
        {[
          { label: 'ACP', value: '26%', txns: '10 txns', color: 'bg-brand-500' },
          { label: 'UCP', value: '37%', txns: '14 txns', color: 'bg-purple-500' },
          { label: 'MCP', value: '37%', txns: '14 txns', color: 'bg-orange-500' }
        ].map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
              <span className="text-xs font-black">{p.label}</span>
            </div>
            <p className="text-2xl font-black">{p.value}</p>
            <p className="text-[10px] opacity-40 font-bold uppercase">{p.txns}</p>
          </motion.div>
        ))}
      </div>

      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '26%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-brand-500"
        ></motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '37%' }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-purple-500"
        ></motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '37%' }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="h-full bg-orange-500"
        ></motion.div>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="border border-slate-100 rounded-2xl p-4"
    >
      <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Protocol Health</h5>
      <div className="space-y-3">
        {['UCP v1.2 Active', 'ACP Handshake Stable', 'MCP Node Syncing'].map((text, i) => (
          <div key={i} className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-600 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {text}
            </span>
            <span className="text-emerald-600">ONLINE</span>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

const TransactionLedger = () => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Transaction Ledger</h5>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
      </div>
    </div>

    <div className="overflow-hidden border border-slate-100 rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Agent</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-[10px] font-medium text-slate-600">
          {[
            { time: '17:32:56', agent: 'Claude-Shop-2', amount: '$284.20', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { time: '17:32:51', agent: 'Claude-Shop-2', amount: '$190.52', status: 'PENDING', color: 'text-amber-600', bg: 'bg-amber-50' },
            { time: '17:32:46', agent: 'GPT-Store', amount: '$46.40', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { time: '17:32:41', agent: 'Gemini-Buy', amount: '$114.03', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { time: '17:32:36', agent: 'Gemini-Buy', amount: '$19.10', status: 'PENDING', color: 'text-amber-600', bg: 'bg-amber-50' }
          ].map((row, i) => (
            <motion.tr 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-slate-400">{row.time}</td>
              <td className="px-4 py-3 font-bold text-slate-900">{row.agent}</td>
              <td className="px-4 py-3 font-black text-slate-900">{row.amount}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${row.bg} ${row.color}`}>
                  {row.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SettlementFlow = () => (
  <div className="w-full">
    <div className="grid grid-cols-1 gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
      >
        <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Payment Flow (Last Txn)</h5>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <CreditCard size={14} className="text-slate-400" /> Customer Payment
            </span>
            <span className="text-xs font-black text-slate-900">$184.26</span>
          </div>
          <div className="pl-6 space-y-2 border-l-2 border-slate-100">
            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between text-[10px] font-medium"
            >
              <span className="text-emerald-600">Agentix Platform Fee (2.9%)</span>
              <span className="text-emerald-600">$5.34</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between text-[10px] font-medium"
            >
              <span className="text-slate-400">Processing (2.6% + $0.30)</span>
              <span className="text-slate-400">$5.09</span>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-2 border-t border-slate-50 flex justify-between items-center"
          >
            <span className="text-xs font-black text-slate-900">Merchant Net</span>
            <span className="text-xs font-black text-brand-600">$173.83</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
      >
        <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Settlement Schedule</h5>
        <div className="space-y-3">
          {[
            { date: 'Apr 11 (Today)', amount: '$17,144.36', status: 'Processing' },
            { date: 'Apr 12', amount: '$6,973.87', status: 'Scheduled' },
            { date: 'Apr 13', amount: '$12,752.92', status: 'Scheduled' }
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                <span className="text-[10px] font-bold text-slate-600">{s.date}</span>
              </div>
              <span className="text-[10px] font-black text-slate-900">{s.amount}</span>
            </motion.div>
          ))}
          <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase">Total Pending</span>
            <span className="text-xs font-black text-slate-900">$49,723.88</span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const STEPS = [
  {
    id: 'overview',
    number: "01",
    tag: "OVERVIEW",
    title: "Real-time Agentic Monitoring.",
    description: "The Nexus Banking Dashboard provides a unified view of all AI-driven commerce activity. Monitor platform revenue, total GMV, and success rates across all agentic channels in real-time.",
    content: <DashboardOverview />
  },
  {
    id: 'protocol',
    number: "02",
    tag: "PROTOCOL",
    title: <>Revenue by <span className="text-brand-600">Protocol.</span></>,
    description: "Agentix supports multiple agentic protocols. Nexus breaks down your revenue by UCP, ACP, and MCP — giving you deep insights into which AI grids are driving the most value for your business.",
    content: <ProtocolBreakdown />
  },
  {
    id: 'ledger',
    number: "03",
    tag: "LEDGER",
    title: "Deep Transaction Visibility.",
    description: "Every agentic transaction is logged with granular detail. Track which specific AI agents (Claude, GPT, Gemini) are interacting with which merchants, including real-time settlement status.",
    content: <TransactionLedger />
  },
  {
    id: 'settlement',
    number: "04",
    tag: "SETTLEMENT",
    title: <>Automated <br/> <span className="text-brand-600">Settlement.</span></>,
    description: "Nexus handles the complex flow of funds between customers, AI agents, and merchants. View detailed payment breakdowns and automated settlement schedules to manage your agentic cash flow.",
    content: <SettlementFlow />
  }
];

const Nexus: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-[#092C4C] flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-none whitespace-nowrap">
            From Prompt to payment.
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-transform">
              View Dashboard
            </button>
            <button className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-500 transition-colors">
              Join the waitlist
            </button>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="flex flex-col items-center gap-2 text-slate-500 mt-16"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to explore the dashboard</span>
            <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4">The Nexus Infrastructure</p>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
            Settlement at the <br/> speed of thought.
          </h2>
        </motion.div>
      </section>

      {/* Sticky Scroll Section */}
      <section ref={containerRef} className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-0">
          
          {/* Left Side: Scrolling Text */}
          <div className="w-full lg:w-1/2">
            {STEPS.map((step, index) => (
              <StepContent 
                key={step.id} 
                step={step} 
                index={index} 
                onInView={() => setActiveStep(index)} 
              />
            ))}
          </div>

          {/* Right Side: Sticky Browser */}
          <div className="hidden lg:flex w-1/2 sticky top-32 h-[calc(100vh-8rem)] items-center justify-center z-40">
            <div className="w-full max-w-2xl p-4 md:p-8 bg-slate-50 rounded-[3rem] shadow-inner relative overflow-hidden flex items-center justify-center border border-slate-100">
              <div className="absolute top-4 right-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Step {activeStep + 1} / 4</div>
              <BrowserChrome url="agentixpay-dashboard.fly.dev/nexus">
                <div className="relative min-h-[450px] w-full min-w-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      {STEPS[activeStep].content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </BrowserChrome>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-[#092C4C] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12 leading-none">
            Scale your <br/> <span className="text-brand-400">Agentic Revenue.</span>
          </h2>
          <div className="flex justify-center gap-6">
            <button className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-brand-500 transition-colors">
              Get Started
            </button>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const StepContent = ({ step, index, onInView }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col justify-center py-20 relative">
      <div className="relative pl-8 md:pl-12">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-600 via-purple-400 to-transparent rounded-full opacity-50"></div>
        <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-6">{step.number} — {step.tag}</p>
        <h3 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">{step.title}</h3>
        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-md mb-12">{step.description}</p>
        
        {/* Mobile Mockup (Only visible on small screens) */}
        <div className="lg:hidden bg-slate-50 p-6 rounded-[2rem] shadow-inner mb-12">
          <BrowserChrome url="agentixpay-dashboard.fly.dev/nexus">
            {step.content}
          </BrowserChrome>
        </div>
      </div>
    </div>
  );
};

export default Nexus;

