import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bot, CheckCircle2, ShoppingCart, CreditCard, 
  Truck, Zap, Search, PlusCircle, LayoutGrid, 
  Layers, Share2, MoreHorizontal, Sparkles,
  ChevronRight, ArrowRight
} from 'lucide-react';

const AgenticChatAnimation: React.FC = () => {
    const [step, setStep] = useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current;
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [step]);

    useEffect(() => {
        const sequence = [
            { step: 1, delay: 500 },
            { step: 1.5, delay: 1200 },
            { step: 2, delay: 2800 },
            { step: 3, delay: 5500 },
            { step: 4, delay: 6800 },
            { step: 5, delay: 8500 },
            { step: 0, delay: 15000 }, 
        ];

        let timeouts: number[] = [];
        
        const runSequence = () => {
            sequence.forEach((s) => {
                const t = window.setTimeout(() => setStep(s.step), s.delay);
                timeouts.push(t);
            });
        };

        runSequence();
        const interval = setInterval(() => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
            runSequence();
        }, 15000);

        return () => {
            clearInterval(interval);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden flex h-[700px]">
            {/* Sidebar (Minimalist Left Panel) */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-6 hidden md:flex">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                        <Zap size={18} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    <button className="flex items-center gap-3 w-full text-slate-500 hover:text-slate-900 transition-colors">
                        <PlusCircle size={18} />
                        <span className="text-sm font-medium">New chat</span>
                    </button>
                    <button className="flex items-center gap-3 w-full text-slate-500 hover:text-slate-900 transition-colors">
                        <Search size={18} />
                        <span className="text-sm font-medium">Search</span>
                    </button>
                    <button className="flex items-center gap-3 w-full text-slate-500 hover:text-slate-900 transition-colors">
                        <LayoutGrid size={18} />
                        <span className="text-sm font-medium">Images</span>
                    </button>
                    <button className="flex items-center gap-3 w-full text-slate-500 hover:text-slate-900 transition-colors">
                        <Layers size={18} />
                        <span className="text-sm font-medium">Apps</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header (Top Navigation) */}
                <div className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-6">
                        <MoreHorizontal size={20} className="text-slate-400" />
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1 rounded-full overflow-hidden">
                             <div className={`p-1.5 rounded-full transition-all duration-500 ${step === 1.5 ? 'bg-white shadow-sm border border-slate-100' : 'opacity-40'}`}>
                                 <Sparkles size={14} className="text-brand-600" />
                             </div>
                             <div className={`p-1.5 rounded-full transition-all duration-500 ${step === 1.5 ? 'bg-white shadow-sm border border-slate-100' : 'opacity-40'}`}>
                                 <Bot size={14} className="text-teal-600" />
                             </div>
                             <div className={`p-1.5 rounded-full transition-all duration-500 ${step === 1.5 ? 'bg-white shadow-sm border border-slate-100' : 'opacity-40'}`}>
                                 <Search size={14} className="text-blue-600" />
                             </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
                            <Zap size={10} fill="currentColor" /> Pro Mode
                        </div>
                        <button className="text-slate-500 hover:text-slate-900">
                             <Share2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Chat Display Area */}
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-8 md:px-20 py-12 space-y-12 bg-white"
                >
                    {/* Centered Initial Search State */}
                    {step === 0 && (
                        <div className="h-full flex flex-col items-center justify-center -mt-20">
                            <h2 className="text-2xl font-medium text-slate-900 mb-8">What can I find for you today?</h2>
                            <div className="w-full max-w-xl relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Search size={20} />
                                </div>
                                <input 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-14 pr-24 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                                    placeholder="Looking for a complete trail running outfit"
                                    disabled
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2">
                                     <Sparkles size={14} /> Ask AI
                                </button>
                            </div>
                        </div>
                    )}

                    <AnimatePresence mode="popLayout">
                        {step >= 1 && (
                            <motion.div 
                                key="user-request-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-end"
                            >
                                <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-[2rem] shadow-sm">
                                    <p className="text-base text-slate-900 font-medium">I want to buy a blue sports hat.</p>
                                </div>
                            </motion.div>
                        )}

                        {step === 1.5 && (
                            <motion.div 
                                key="interfacing-1.5"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 text-slate-400 mb-4 px-2">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-brand-500 rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1 h-1 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">Interfacing with AI Grid</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {/* Claude Node */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-slate-50 border border-slate-200 rounded-3xl p-5 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
                                            <motion.div 
                                                className="h-full bg-teal-500" 
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                                                <Bot size={16} />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900 tracking-tight">Claude 3.5 Sonnet</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                <div className="h-full w-2/3 bg-teal-400 rounded-full"></div>
                                            </div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Model: Analyzing Merchants</p>
                                        </div>
                                    </motion.div>

                                    {/* Perplexity Node */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-slate-50 border border-slate-200 rounded-3xl p-5 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
                                            <motion.div 
                                                className="h-full bg-blue-500" 
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2.5, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                <Search size={16} />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900 tracking-tight">Perplexity Pro</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-blue-400 rounded-full animate-pulse"></div>
                                            </div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Real-time: Comparing Prices</p>
                                        </div>
                                    </motion.div>

                                    {/* GPT-4 Node */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-slate-50 border border-slate-200 rounded-3xl p-5 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
                                            <motion.div 
                                                className="h-full bg-brand-500" 
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                                                <Sparkles size={16} />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900 tracking-tight">GPT-4o</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                <div className="h-full w-3/4 bg-brand-400 rounded-full"></div>
                                            </div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Logic: Finalizing Selection</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {step >= 2 && (
                            <motion.div 
                                key="agent-options-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="max-w-2xl">
                                    <p className="text-base text-slate-900 font-medium leading-relaxed">
                                        I've identified the best options for <span className="text-brand-600">Blue Tech Sports Hats</span> currently available on the Agentix Protocol:
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Best Option - Highlighted */}
                                    <motion.div 
                                        key="product-1"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                        className="border-2 border-brand-500 rounded-3xl p-2 bg-white shadow-xl relative"
                                    >
                                        <div className="absolute -top-3 left-4 bg-brand-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest z-10">
                                            AGENT_DIRECT
                                        </div>
                                        <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-4 relative">
                                            <img 
                                               src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400" 
                                               className="w-full h-full object-cover"
                                               alt="Royal Blue Sport Cap"
                                            />
                                        </div>
                                        <div className="px-3 pb-4">
                                            <h4 className="text-sm font-bold text-slate-900">Royal Tech Cap</h4>
                                            <p className="text-[11px] text-slate-500 font-medium mb-3 uppercase tracking-tighter">Merchant: YOUR STORE</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-black">$24.00</span>
                                                <button className="bg-slate-50 border border-slate-200 text-slate-900 px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-slate-100 transition-colors">
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Option 2 */}
                                    <motion.div 
                                        key="product-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                        className="border border-slate-200 rounded-3xl p-2 bg-white shadow-sm flex flex-col"
                                    >
                                        <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-4">
                                            <img 
                                               src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&q=80&w=400" 
                                               className="w-full h-full object-cover"
                                               alt="Blue Corduroy Cap"
                                            />
                                        </div>
                                        <div className="px-3 pb-4 mt-auto">
                                            <h4 className="text-sm font-bold text-slate-700">Corduroy Classic</h4>
                                            <p className="text-[11px] text-slate-400 font-medium mb-3">Merchant: City Threads</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-black text-slate-700">$32.00</span>
                                                <button className="bg-slate-50 border border-slate-200 text-slate-400 px-3 py-1.5 rounded-full text-[10px] font-bold">
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Option 3 */}
                                    <motion.div 
                                        key="product-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 }}
                                        className="border border-slate-200 rounded-3xl p-2 bg-white shadow-sm flex flex-col"
                                    >
                                        <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-4">
                                            <img 
                                               src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" 
                                               className="w-full h-full object-cover"
                                               alt="Blue Jays Style Cap"
                                            />
                                        </div>
                                        <div className="px-3 pb-4 mt-auto">
                                            <h4 className="text-sm font-bold text-slate-700">Toronto Sports Edition</h4>
                                            <p className="text-[11px] text-slate-400 font-medium mb-3">Merchant: AeroFit</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-black text-slate-700">$21.99</span>
                                                <button className="bg-slate-50 border border-slate-200 text-slate-400 px-3 py-1.5 rounded-full text-[10px] font-bold">
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {step >= 3 && (
                            <motion.div 
                                key="user-confirm-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-end"
                            >
                                <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-[2rem] shadow-sm">
                                    <p className="text-base text-slate-900 font-medium">I'll go with the first one.</p>
                                </div>
                            </motion.div>
                        )}

                        {step >= 5 && (
                            <motion.div 
                                key="final-confirmation-5"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald-50 border border-emerald-200 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
                                
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900">Purchase Completed</h3>
                                        <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">Agentix Secure Protocol</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-xl border border-emerald-100 p-1 shrink-0">
                                                <img 
                                                   src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=200" 
                                                   className="w-full h-full object-cover rounded-lg"
                                                   alt="Confirmed Hat"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">Tech Sport Cap — Navy</p>
                                                <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-tight">Status: Shipped</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <Truck size={18} className="text-slate-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Shipping To</p>
                                                    <p className="text-xs font-bold text-slate-900">123 Main Street, Atlanta, GA 30303</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CreditCard size={18} className="text-slate-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Method</p>
                                                    <p className="text-xs font-bold text-slate-900">Mastercard ending in 1234</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/60 rounded-3xl p-6 border border-emerald-100 flex flex-col justify-center">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Total</span>
                                            <span className="text-sm font-black text-slate-900">$24.00</span>
                                        </div>
                                        <div className="flex justify-between mb-4">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery</span>
                                            <span className="text-[10px] font-black text-emerald-600 uppercase">Free 2-Day</span>
                                        </div>
                                        <div className="pt-4 border-t border-emerald-100">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Protocol Reference</p>
                                            <p className="text-[11px] font-mono font-bold text-slate-600 break-all">AXP_88392_LT_F77B2</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Area (Bottom) */}
                <div className="p-8 bg-white border-t border-slate-100">
                    <div className="max-w-3xl mx-auto relative">
                        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-[2rem] px-6 py-4 shadow-inner">
                            <PlusCircle size={20} className="text-slate-400" />
                            <div className="flex-1 bg-transparent text-sm text-slate-400 font-medium">
                                {step >= 3 ? "Wait for confirmation..." : "Message AI Agent..."}
                            </div>
                            <div className="flex gap-3">
                                <Search size={20} className="text-slate-300" />
                                <div className="w-px h-6 bg-slate-200"></div>
                                <button className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                                     <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgenticChatAnimation;
