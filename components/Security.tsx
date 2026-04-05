import React from 'react';
import { Lock, FileCheck, Server, ShieldCheck } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <section id="security" className="py-24 bg-white border-y border-slate-200 text-slate-900 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-8">
              <ShieldCheck size={14} className="text-blue-600" />
              <span className="text-[10px] font-bold text-blue-700 tracking-widest uppercase">Bank-Grade Security</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-[1.1] text-slate-900">
              Uncompromising protection for your assets.
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-xl">
              We understand that trust is the currency of finance. Agentix is built from the ground up with a security-first architecture that exceeds industry standards.
            </p>

            <div className="space-y-10">
              <SecurityItem 
                icon={<Lock className="text-emerald-600" />}
                title="End-to-End Encryption"
                description="All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your financial data is never exposed."
              />
              <SecurityItem 
                icon={<FileCheck className="text-blue-600" />}
                title="SOC2 Type II Certified"
                description="We undergo rigorous annual audits to ensure our controls and processes meet the highest standards."
              />
              <SecurityItem 
                icon={<Server className="text-blue-700" />}
                title="Isolated Tenant Infrastructure"
                description="Each customer's data is logically and physically separated, ensuring zero leakage between environments."
              />
            </div>
          </div>

          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-wider">security_audit.log</div>
              </div>
              
              <div className="p-8 font-mono text-[11px] md:text-xs min-h-[320px] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <span className="text-slate-400">10:42:01</span>
                    <span className="text-emerald-600 font-bold">[PASS] AES-256 Encryption verification</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-400">10:42:02</span>
                    <span className="text-emerald-600 font-bold">[PASS] MFA Challenge enforcement active</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-400">10:42:05</span>
                    <span className="text-emerald-600 font-bold">[PASS] Penetration test automated scan</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-400">10:42:15</span>
                    <span className="text-blue-600 font-bold">[INFO] SOC2 Compliance monitor active</span>
                  </div>
                  <div className="flex space-x-4 opacity-50">
                    <span className="text-slate-400">...</span>
                    <span className="text-slate-500">Monitoring active sessions...</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <div className="text-[11px] text-slate-500 font-bold tracking-wider">
                    Status: <span className="text-emerald-600 uppercase">Secure</span>
                  </div>
                  <div className="bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                    <ShieldCheck className="text-emerald-600 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SecurityItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex items-start space-x-5 group">
    <div className="mt-1 p-3 bg-slate-800/80 rounded-xl border border-slate-700/50 shadow-sm group-hover:border-blue-500/30 transition-colors">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 20 }) : icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default Security;