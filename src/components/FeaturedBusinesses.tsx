import { Link } from "@tanstack/react-router";
import { ShieldCheck, MapPin, Star, ArrowRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BusinessListing {
  id: string;
  name: string;
  sector: string;
  mall_name: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  membership_tier: string | null;
  is_verified: boolean | null;
  is_open: boolean | null;
  floor_number: string | null;
}

interface FeaturedBusinessesProps {
  businesses: BusinessListing[];
  isLoading: boolean;
}

export function FeaturedBusinesses({ businesses, isLoading }: FeaturedBusinessesProps) {
  // Graceful interceptor handling loading infrastructure state
  if (isLoading) return <FeaturedBusinessesSkeleton />;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-[1px] bg-amber-500/50 rounded-full" />
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em]">Verified Partners</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-tight">
            Elite Trade Stalls.
          </h2>
        </div>
        <Link 
          to="/category/retail" 
          className="group flex items-center gap-3 bg-white/[0.02] border border-white/5 px-5 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest text-slate-400 hover:text-amber-500 hover:border-amber-500/20 transition-all duration-300"
        >
          Full Directory <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {businesses.map((biz, idx) => (
          <div 
            key={biz.id} 
            className={cn(
              "group relative bg-[#020617]/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-amber-500/20 transition-all duration-500 shadow-2xl flex flex-col justify-end",
              idx <= 1 ? "sm:col-span-2 aspect-[16/9] md:aspect-[21/9]" : "sm:col-span-1 aspect-[4/5] md:aspect-[3/4]"
            )}
          >
            {/* Visual Frame Core */}
            <div className="absolute inset-0 z-0">
              <img 
                src={biz.cover_image_url || biz.logo_url || ""} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" 
                alt={biz.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
            </div>

            {/* Status Header Overlay */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
              <div className="flex gap-1.5">
                <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5 flex items-center gap-1.5">
                  <div className={cn("w-1 h-1 rounded-full", biz.is_open ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" : "bg-slate-500")} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">
                    {biz.is_open ? "LIVE" : "CLOSED"}
                  </span>
                </div>
                {biz.is_verified && (
                  <div className="bg-black/40 backdrop-blur-md text-emerald-500 p-1 rounded-md border border-white/5">
                    <ShieldCheck size={12} />
                  </div>
                )}
              </div>
              {biz.membership_tier === 'gold' && <Crown className="text-amber-500 fill-amber-500/10" size={14} />}
            </div>

            {/* Content Context Plate */}
            <div className="p-6 md:p-8 space-y-4 relative z-10 w-full">
              <div className="space-y-1 text-left">
                <span className="inline-block px-1.5 py-0.5 bg-amber-500/5 text-amber-500 rounded text-[8px] font-black uppercase tracking-widest border border-amber-500/10 mb-1">
                  {biz.sector}
                </span>
                <h3 className={cn(
                  "font-black text-slate-100 uppercase italic tracking-tighter leading-none group-hover:text-amber-500 transition-colors duration-300",
                  idx <= 1 ? "text-xl md:text-3xl" : "text-lg md:text-xl"
                )}>
                  {biz.name}
                </h3>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[9px] tracking-widest truncate">
                  <MapPin size={11} className="text-amber-500 shrink-0" /> 
                  <span className="truncate">{biz.mall_name} {biz.floor_number && `• Flr ${biz.floor_number}`}</span>
                </div>
                <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 shrink-0">
                  <Star size={10} className="text-amber-500 fill-amber-500" />
                  <span className="text-[9px] font-black font-mono text-slate-200">4.9</span>
                </div>
              </div>

              <Link 
                to="/business/$id" 
                params={{ id: biz.id }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/[0.02] border border-white/5 text-slate-300 rounded-xl font-black uppercase text-[9px] tracking-wider hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300"
              >
                Enter Showroom <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturedBusinessesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 animate-pulse">
      <div className="flex flex-col gap-2 mb-10 text-left">
        <div className="h-2 w-24 bg-white/5 rounded" />
        <div className="h-8 w-48 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="sm:col-span-2 aspect-[16/9] md:aspect-[21/9] bg-white/[0.01] rounded-[2rem] border border-white/5" />
        <div className="sm:col-span-2 aspect-[16/9] md:aspect-[21/9] bg-white/[0.01] rounded-[2rem] border border-white/5" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] md:aspect-[3/4] bg-white/[0.01] rounded-[2rem] border border-white/5" />
        ))}
      </div>
    </div>
  );
}
