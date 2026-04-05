import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { saveLead, testDatabaseConnection } from '../services/dbService';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES = [
  'ISV / Software Vendor',
  'PSP / Payment Processor',
  'Merchant / Retailer',
  'AI Developer',
  'Investor',
  'Other'
];

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    role: '',
    newsletter: true 
  });
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestedSql, setSuggestedSql] = useState<string | null>(null);
  
  // Diagnostic State (Kept internally for dev awareness via console, but hidden from public UI)
  const [diagStatus, setDiagStatus] = useState<'IDLE' | 'CHECKING' | 'PASS' | 'FAIL'>('IDLE');

  useEffect(() => {
    if (isOpen) {
      runDiagnostic();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const runDiagnostic = async () => {
    setDiagStatus('CHECKING');
    const result = await testDatabaseConnection();
    if (result.success) {
      setDiagStatus('PASS');
    } else {
      setDiagStatus('FAIL');
      console.warn("Agentix Protocol Sync Status:", result.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      setStatus('ERROR');
      setErrorMessage('Please select your professional role.');
      return;
    }

    setStatus('SUBMITTING');
    const result = await saveLead({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: formData.role,
      newsletter_opt_in: formData.newsletter
    });
    
    if (result.success) {
      setStatus('SUCCESS');
      setTimeout(() => {
        onClose();
        setStatus('IDLE');
        setFormData({ name: '', email: '', company: '', role: '', newsletter: true });
      }, 4000);
    } else {
      setStatus('ERROR');
      setErrorMessage(result.error || 'Secure connection failed.');
      if (result.sql) setSuggestedSql(result.sql);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-[2rem] text-left overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-slate-200">
          
          {status === 'SUCCESS' ? (
            <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-8 text-brand-600 shadow-inner border border-brand-100">
                <ShieldCheck size={48} className="animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Welcome to the future of agentic commerce
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium px-4">
                The Agentix team will reach out soon to discuss your integration.
              </p>
            </div>
          ) : (
            <div className="p-0">
              <div className="bg-slate-50 px-8 py-8 flex justify-between items-center relative overflow-hidden border-b border-slate-200">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Secure Early Access</h3>
                  <p className="text-slate-600 text-xs mt-1 font-medium">Join the agentic commerce protocol</p>
                </div>
                <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors relative z-10 p-1">
                  <X size={24} />
                </button>
                {/* Visual subtle indicator of live status */}
                <div className="absolute top-0 right-0 p-4 opacity-20">
                   <div className={`w-2 h-2 rounded-full ${diagStatus === 'PASS' ? 'bg-emerald-500' : 'bg-brand-500 animate-pulse'}`}></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {status === 'ERROR' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start space-x-3 text-red-600 text-sm">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span className="font-semibold">{errorMessage}</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 mb-8">
                  <div className="group relative">
                    <input
                      type="text"
                      required
                      disabled={status === 'SUBMITTING'}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none font-medium transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand-500 outline-none font-medium transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Professional Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand-500 outline-none font-medium transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div className="relative">
                    <select
                      required
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium appearance-none focus:border-brand-500 transition-all cursor-pointer text-slate-900"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="" className="bg-white text-slate-400">Select Professional Focus...</option>
                      {ROLES.map(role => <option key={role} value={role} className="bg-white">{role}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                       <X size={16} className="rotate-45" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'SUBMITTING'}
                  className="w-full flex justify-center items-center px-6 py-5 border border-transparent text-lg font-black rounded-2xl text-white bg-brand-600 hover:bg-brand-500 shadow-xl transition-all disabled:opacity-70 uppercase tracking-widest active:scale-95 group"
                >
                  {status === 'SUBMITTING' ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      <span>Secure Access</span>
                      <ShieldCheck size={20} className="ml-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>

                <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
                  Bank-Grade Encryption Enabled
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;