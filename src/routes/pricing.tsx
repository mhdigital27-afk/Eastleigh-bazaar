import { createFileRoute, Link } from '@tanstack/react-router';
import { Crown, ShieldCheck, Check, Zap, Globe, Users, BarChart3 } from "lucide-react";

export const Route = createFileRoute('/pricing')({ component: PricingPage });

function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[70vh]">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">Market <span className="text-accent">Growth</span> Plans</h1>
        <p className="text-slate-400 font-medium uppercase tracking-[0.3em] text-xs">Professional digital solutions for physical stalls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <PlanCard title="Silver" price="1,000" icon={<Zap size={24} />} perks={["Growth Badge", "Rank above Free", "50 Products"]} color="slate" />
        <PlanCard title="Gold" price="2,500" icon={<Crown size={24} />} perks={["Premium Badge", "#1 Search Rank", "Unlimited Products", "Home Page Feature"]} color="amber" featured />
        <PlanCard title="Verified" price="2,000" icon={<ShieldCheck size={24} />} perks={["Physical Inspection", "Blue Checkmark", "Escrow Enabled", "Anti-Fraud Status"]} color="blue" />
      </div>

      <div className="bg-card-blue border border-white/5 rounded-[4rem] p-16 text-center">
         <h2 className="text-3xl font-black uppercase text-white mb-12">The Digital twin of your physical stall</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4"><Globe className="text-accent" /><h3 className="font-bold text-white uppercase">Global Reach</h3><p className="text-slate-500 text-sm leading-relaxed">Your products seen by customers in London, Dubai, and Mogadishu while you sit in Eastleigh.</p></div>
            <div className="space-y-4"><Users className="text-accent" /><h3 className="font-bold text-white uppercase">Direct Leads</h3><p className="text-slate-500 text-sm leading-relaxed">Customers start a WhatsApp chat with you immediately. No middle-men or high platform commissions.</p></div>
            <div className="space-y-4"><BarChart3 className="text-accent" /><h3 className="font-bold text-white uppercase">Market Insights</h3><p className="text-slate-500 text-sm leading-relaxed">Advanced analytics showing view counts and interest trends for your inventory daily.</p></div>
         </div>
      </div>
    </div>
  );
}

function PlanCard({ title, price, icon, perks, featured }: any) {
  return (
    <div className={cn("bg-card-blue border rounded-[3rem] p-12 flex flex-col justify-between", featured ? "border-accent shadow-2xl scale-105" : "border-white/5 shadow-xl")}>
       <div>
          <div className="w-12 h-12 bg-primary-deep rounded-2xl flex items-center justify-center text-accent mb-8 shadow-inner">{icon}</div>
          <h2 className="text-3xl font-black uppercase text-white italic mb-2 tracking-tighter">{title}</h2>
          <p className="text-2xl font-black text-white mb-10">KES {price} <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{title === 'Verified' ? '/ One Time' : '/ Mo'}</span></p>
          <div className="space-y-4 mb-12">
            {perks.map((p: string) => <div key={p} className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-tight"><Check size={14} className="text-accent" /> {p}</div>)}
          </div>
       </div>
       <Link to="/auth" className={cn("w-full py-5 rounded-2xl font-black uppercase text-center transition-all", featured ? "bg-accent text-primary-deep shadow-xl" : "bg-white/5 text-white hover:bg-white/10")}>Choose {title}</Link>
    </div>
  );
}
