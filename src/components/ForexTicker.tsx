import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Play, Pause, ChevronLeft, ChevronRight, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export function ForexTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: rates = [] } = useQuery({
    queryKey: ["forex_running_ticker"],
    queryFn: async () => {
      const { data } = await supabase
        .from("forex_rates")
        .select("currency, buy_rate, sell_rate, business_listings(name)")
        .limit(10);
      return data || [];
    },
    refetchInterval: 60000,
  });

  // Manual step scroll buttons
  const manualScroll = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += amount;
    }
  };

  if (rates.length === 0) return null;

  return (
    <div className="bg-[#020617] border-b border-white/5 py-1.5 overflow-hidden h-8 flex items-center shadow-2xl relative select-none">
      
      {/* Dynamic Action Controls Panel */}
      <div className="bg-[#0b0f19] border-r border-white/5 text-amber-500 h-full px-4 flex items-center gap-3 z-20 text-[9px] font-black uppercase tracking-widest flex-shrink-0">
        <span className="flex items-center gap-1.5 italic text-white">
          <Coins size={11} className="text-amber-500 animate-pulse" /> Live Forex
        </span>
        <div className="h-3 w-px bg-white/10 mx-0.5" />
        <div className="flex items-center gap-1.5 text-slate-400">
          <button 
            type="button"
            onClick={() => { setDirection("right"); setIsPaused(false); manualScroll(-100); }}
            className={cn("hover:text-amber-500 transition-colors p-0.5", direction === "right" && !isPaused && "text-amber-500")}
            title="Rewind / Scroll Left"
          >
            <ChevronLeft size={12} />
          </button>
          <button 
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="hover:text-amber-500 transition-colors p-0.5"
            title={isPaused ? "Play Autoscroll" : "Pause Autoscroll"}
          >
            {isPaused ? <Play size={10} className="fill-current" /> : <Pause size={10} className="fill-current" />}
          </button>
          <button 
            type="button"
            onClick={() => { setDirection("left"); setIsPaused(false); manualScroll(100); }}
            className={cn("hover:text-amber-500 transition-colors p-0.5", direction === "left" && !isPaused && "text-amber-500")}
            title="Fast Forward / Scroll Right"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Main Scroller Pipeline Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto no-scrollbar relative scroll-smooth h-full flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={cn(
            "flex whitespace-nowrap gap-16 items-center pr-16",
            isPaused ? "animate-none" : direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
          )}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {rates.map((r: any, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[10px] text-slate-300 font-medium tracking-tight flex-shrink-0">
              <span className="text-amber-500 font-black tracking-wider uppercase bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/5">
                {r.currency}
              </span>
              <span>Buy <span className="font-mono text-white font-bold">{r.buy_rate}</span></span>
              <span className="text-white/10">|</span>
              <span>Sell <span className="font-mono text-white font-bold">{r.sell_rate}</span></span>
              {r.business_listings?.name && (
                <span className="text-[9px] text-slate-500 font-medium">({r.business_listings.name})</span>
              )}
            </div>
          ))}

          {/* Seamless loop duplication fallback logic */}
          {rates.map((r: any, i) => (
            <div key={`${i}-loop`} className="flex items-center gap-2.5 text-[10px] text-slate-300 font-medium tracking-tight flex-shrink-0">
              <span className="text-amber-500 font-black tracking-wider uppercase bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/5">
                {r.currency}
              </span>
              <span>Buy <span className="font-mono text-white font-bold">{r.buy_rate}</span></span>
              <span className="text-white/10">|</span>
              <span>Sell <span className="font-mono text-white font-bold">{r.sell_rate}</span></span>
              {r.business_listings?.name && (
                <span className="text-[9px] text-slate-500 font-medium">({r.business_listings.name})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS Injector to strip standard scrollbars out of the layout wrapper safely */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
