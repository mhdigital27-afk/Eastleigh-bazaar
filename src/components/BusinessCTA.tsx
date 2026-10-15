import { Link } from "@tanstack/react-router";
import { Megaphone, TrendingUp } from "lucide-react";

export function BusinessCTA() {
  return (
    <section className="py-24 px-6 bg-[#020617] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/30 to-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16 border border-white/5 shadow-2xl">
          
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/5 rounded-l-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Core Content Presentation Box */}
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <TrendingUp size={12} /> Global Growth Pipeline
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-[1.1] uppercase">
              Grow Your Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600 italic">Digitally.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-10 font-medium max-w-xl">
              Join Eastleigh's leading business directory. Get your stall listed, showcase your inventory to global buyers, and start receiving direct WhatsApp leads.
            </p>
            
            {/* High-Contrast Interactive Triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full">
              <Link 
                to="/auth" 
                className="w-full sm:w-auto px-10 h-14 bg-amber-500 text-slate-950 rounded-xl font-black uppercase text-xs tracking-wider hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center shadow-lg"
              >
                Register Business
              </Link>
              <Link 
                to="/pricing" 
                className="w-full sm:w-auto px-10 h-14 bg-white/[0.03] border border-white/10 text-white rounded-xl font-black uppercase text-xs tracking-wider hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
              >
                <Megaphone size={14} className="text-amber-500" /> Advertise With Us
              </Link>
            </div>
          </div>

          {/* Kinetic Metrics Matrix Block */}
          <div className="relative z-10 hidden lg:flex flex-col gap-4 w-72">
            <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-xl border border-white/5 shadow-xl hover:border-amber-500/20 transition-all duration-300 transform hover:-translate-x-1">
              <p className="text-amber-500 text-2xl font-black italic tracking-tight uppercase">100k+</p>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1">Monthly Visitors</p>
            </div>
            <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-xl border border-white/5 shadow-xl hover:border-amber-500/20 transition-all duration-300 transform translate-x-6 hover:translate-x-5">
              <p className="text-amber-500 text-2xl font-black italic tracking-tight uppercase">500+</p>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1">Verified Malls</p>
            </div>
            <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-xl border border-white/5 shadow-xl hover:border-amber-500/20 transition-all duration-300 transform hover:-translate-x-1">
              <p className="text-amber-500 text-2xl font-black italic tracking-tight uppercase">Direct</p>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1">WhatsApp Trade</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
