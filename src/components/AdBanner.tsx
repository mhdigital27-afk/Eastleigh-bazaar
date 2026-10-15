import { Megaphone, ChevronRight } from "lucide-react";
import { AdPlacement } from "./AdPlacement";

export function AdBanner() {
  return (
    <div className="w-full h-[300px] md:h-[450px] bg-primary-deep relative overflow-hidden shadow-2xl border-b-4 border-accent">
      <AdPlacement 
        id="homepage_hero"
        className="w-full h-full"
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 bg-slate-950">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
              <Megaphone className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h2 className="text-white text-3xl font-black italic uppercase tracking-tighter">Promote Your Stall</h2>
              <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs mt-2">Reach 100,000+ Verified Buyers Globally</p>
            </div>
            <button onClick={() => window.location.href='/merchant/ads'} className="border-2 border-accent text-accent px-10 py-3 rounded-full font-black uppercase text-[10px] hover:bg-accent hover:text-primary-deep transition-all">
              Book This Space
            </button>
          </div>
        }
      />
      <div className="absolute bottom-0 right-0 p-8 opacity-10 pointer-events-none">
        <h1 className="text-9xl font-black text-white italic">EB</h1>
      </div>
    </div>
  );
}
