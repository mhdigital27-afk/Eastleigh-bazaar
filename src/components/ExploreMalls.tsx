import { SectionHeading } from "./SectionHeading";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, MapPin } from "lucide-react";

const malls = [
  { name: "BBS Mall", businesses: "2,000+", floors: "6 Floors", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80" },
  { name: "Amal Mall", businesses: "800+", floors: "4 Floors", image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80" },
  { name: "Yusuf Haji Mall", businesses: "1,200+", floors: "5 Floors", image: "https://images.unsplash.com/photo-1583024026354-14cc330757bd?auto=format&fit=crop&q=80" },
];

export function ExploreMalls() {
  return (
    <section className="py-28 bg-[#020617] text-white border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Responsive Heading Layout */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-16">
          <SectionHeading 
            title="Explore the Malls" 
            subtitle="Navigate the world's most dense shopping district with precision."
          />
          <Link 
            to="/malls" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-amber-500 hover:text-amber-400 group transition-colors flex-shrink-0 self-start sm:self-auto"
          >
            <span>View All 500+ Malls</span> 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* High-End Dark Cards Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {malls.map((mall) => (
            <div 
              key={mall.name} 
              className="group bg-white/[0.01] hover:bg-white/[0.02] rounded-[2rem] overflow-hidden transition-all duration-500 border border-white/5 hover:border-amber-500/20 shadow-2xl flex flex-col justify-between"
            >
              <div className="flex flex-col">
                {/* Visual Window Layer */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-white/5">
                  <img 
                    src={mall.image} 
                    alt={mall.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                    loading="lazy"
                  />
                  {/* Subtle Shadow Scrim Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                {/* Info Text Block Content */}
                <div className="p-8 pb-4">
                  <h3 className="text-xl font-bold text-slate-100 tracking-tight uppercase tracking-wide group-hover:text-amber-500 transition-colors duration-300">
                    {mall.name}
                  </h3>
                  <div className="flex items-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-widest mt-3">
                    <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5">
                      <Building2 size={12} className="text-amber-500" /> 
                      {mall.floors}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5">
                      <MapPin size={12} className="text-amber-500" />
                      {mall.businesses} Merchants
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Trigger Area */}
              <div className="p-8 pt-4">
                <Link 
                  to="/malls" 
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white/[0.02] border border-white/5 text-slate-300 rounded-xl font-black uppercase text-[10px] tracking-wider group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500 transition-all duration-300 shadow-md"
                >
                  Browse Floor Map
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
