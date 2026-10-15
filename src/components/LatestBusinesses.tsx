import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, ArrowRight, Building2 } from "lucide-react";

export function LatestBusinesses() {
  const { data: latest = [] } = useQuery({
    queryKey: ["latest_merchants"],
    queryFn: async () => {
      const { data } = await supabase
        .from("business_listings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      return data || [];
    },
  });

  return (
    <section className="py-28 bg-[#020617] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-center">
          
          {/* Section Left Title Column */}
          <div className="lg:col-span-1 flex flex-col justify-between h-full">
            <div>
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.25em]">New Arrivals</span>
              <h2 className="text-3xl font-black text-slate-100 mt-3 mb-4 tracking-tighter uppercase leading-[1.1]">
                Newly Joined <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600 italic">Verified Stalls</span>
              </h2>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8">
                Fresh merchant inventory and new trade routes are opening across the marketplace daily.
              </p>
            </div>
            <Link 
              to="/category/retail" 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-amber-500 hover:text-amber-400 group transition-colors"
            >
              <span>Browse Directory</span> 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Display Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-stretch">
            {latest.map((biz) => {
              const displayName = biz.name || "Verified Merchant";
              const mallLocation = biz.mall_name || "Commercial Complex";
              const sectorCategory = biz.sector || "General Wholesale";

              return (
                <Link 
                  key={biz.id} 
                  to="/business/$id" 
                  params={{ id: biz.id }} 
                  className="group p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-amber-500/20 transition-all duration-300 shadow-2xl flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Brand Image Node */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center mb-6 overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:border-amber-500/30 flex-shrink-0 shadow-inner">
                      {biz.logo_url ? (
                        <img src={biz.logo_url} className="w-full h-full object-cover" alt={`${displayName} Logo`} loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-amber-500/5 flex items-center justify-center">
                          <Building2 className="text-amber-500/60 group-hover:text-amber-500 transition-colors" size={20} />
                        </div>
                      )}
                    </div>

                    {/* Merchant Verification Label & Micro Metadata Stack */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-1.5 max-w-full">
                        <h3 className="font-bold text-slate-100 tracking-tight text-base truncate uppercase group-hover:text-amber-500 transition-colors duration-300">
                          {displayName}
                        </h3>
                        <BadgeCheck size={15} className="text-amber-500 flex-shrink-0" />
                      </div>
                      
                      <div className="h-px w-8 bg-white/5 group-hover:w-16 transition-all duration-500" />
                      
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate pt-1">
                        {mallLocation} <span className="text-slate-700 mx-1">•</span> {sectorCategory}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
