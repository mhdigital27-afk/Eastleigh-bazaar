import { useState } from "react";
import { Search, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Hero() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/search", search: { q: query } });
    }
  };

  const trendingTags = [
    { label: "Turkish Suits", sector: "fashion" },
    { label: "Solar Inverters", sector: "electronics" },
    { label: "Wholesale Bales", sector: "wholesale" },
    { label: "Oud Perfumes", sector: "beauty" },
  ];

  return (
    <section className="relative pt-24 pb-28 md:pt-36 md:pb-44 overflow-hidden bg-[#020617]">
      {/* Precision Visual Depth Layers */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-amber-500/5 rounded-full blur-[140px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Compact Utility Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-xl mb-6 animate-in fade-in slide-in-from-top-2 duration-700">
          <ShieldCheck size={14} className="text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Trade Infrastructure V2.0</span>
        </div>

        {/* Condensed Typography Scale */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter uppercase italic mb-6">
          Bazaar <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600">Authority.</span>
        </h1>

        <p className="text-sm md:text-base text-slate-400 max-w-2xl font-medium leading-relaxed mb-10 px-4">
          Direct wholesale access to 10,000+ verified merchants across 500+ shopping complexes in the regional commercial capital.
        </p>

        {/* High-Density Tactile Search */}
        <div className={cn(
          "w-full max-w-2xl bg-white/[0.02] backdrop-blur-3xl p-1.5 rounded-xl md:rounded-2xl border transition-all duration-500 shadow-2xl",
          isFocused ? "border-amber-500/50 bg-white/[0.04] shadow-[0_0_50px_rgba(245,158,11,0.12)] scale-[1.005]" : "border-white/10"
        )}>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-1.5">
            <div className="flex-1 flex items-center gap-3 px-4 w-full">
              <Search className={cn("transition-colors duration-300 w-5 h-5 flex-shrink-0", isFocused ? "text-amber-500" : "text-slate-500")} />
              <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search products, stalls, or malls..."
                className="w-full h-11 md:h-12 bg-transparent outline-none text-white font-medium text-sm md:text-base placeholder:text-slate-500 tracking-tight"
              />
            </div>
            <button type="submit" className="w-full md:w-auto bg-amber-500 text-slate-950 px-8 h-11 md:h-12 rounded-lg md:rounded-xl font-black uppercase text-xs tracking-wider hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group flex-shrink-0">
              Search <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Dense Sourcing Chips */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8 animate-in fade-in duration-1000 delay-300">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1 flex items-center gap-1.5">
            <TrendingUp size={12} className="text-slate-500" /> Trending:
          </span>
          {trendingTags.map(tag => (
            <Link 
              key={tag.label} 
              to="/search" 
              search={{ q: tag.label }}
              className="px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all shadow-sm duration-200"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Low Opacity Watermark Layout */}
      <div className="absolute bottom-0 right-0 p-8 opacity-[0.01] pointer-events-none hidden lg:block select-none">
        <h1 className="text-[15rem] font-black italic -mb-20 tracking-tighter text-white">BAZAAR</h1>
      </div>
    </section>
  );
}
