import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search as SearchIcon, MapPin, Building2, 
  X, MessageCircle, ShieldCheck, 
  SlidersHorizontal, ArrowRight, LayoutGrid,
  FilterX, Layers, Navigation, Star, Loader2,
  Info
} from "lucide-react";
import { SECTORS, EASTLEIGH_MALLS } from "@/lib/sectors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || '',
    sector: (search.sector as string) || '',
    mall: (search.mall as string) || '',
    floor: (search.floor as string) || '',
  }),
  component: SearchComponent,
});

function SearchComponent() {
  const { q, sector, mall, floor } = Route.useSearch();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'tier' | 'newest'>('tier');

  const { data: businesses, isLoading } = useQuery({
    queryKey: ["directory_advanced_search", q, sector, mall, floor, sortBy],
    queryFn: async () => {
      let query = supabase
        .from("business_listings")
        .select("*")
        .eq("status", "live");

      if (q) {
        query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,stall_number.ilike.%${q}%`);
      }

      if (sector) query = query.eq("sector", sector);
      if (mall) query = query.eq("mall_name", mall);
      if (floor) query = query.eq("floor_number", floor);

      if (sortBy === 'tier') {
        query = query.order("membership_tier", { ascending: false }).order("name", { ascending: true });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data || [];
    },
  });

  const updateFilter = (updates: any) => {
    navigate({
      to: "/search",
      search: (prev) => ({ ...prev, ...updates }),
    });
  };

  const clearFilters = () => {
    navigate({ to: "/search", search: { q: "", sector: "", mall: "", floor: "" } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[70vh]">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-card-blue border border-white/5 rounded-[2.5rem] p-8 shadow-sm space-y-8 sticky top-32">
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <span className="flex items-center gap-2 font-black uppercase text-[11px] tracking-widest text-white">
                <SlidersHorizontal size={16} className="text-accent" /> Filters
              </span>
              <button onClick={clearFilters} className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase transition-colors">
                Reset
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sector</label>
                <select 
                  value={sector}
                  onChange={(e) => updateFilter({ sector: e.target.value })}
                  className="w-full bg-primary-deep border-2 border-white/5 rounded-2xl p-4 text-xs font-bold text-white outline-none appearance-none"
                >
                  <option value="">All Categories</option>
                  {SECTORS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Mall</label>
                <select 
                  value={mall}
                  onChange={(e) => updateFilter({ mall: e.target.value })}
                  className="w-full bg-primary-deep border-2 border-white/5 rounded-2xl p-4 text-xs font-bold text-white outline-none appearance-none"
                >
                  <option value="">All Malls</option>
                  {EASTLEIGH_MALLS.map((m) => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          <div className="relative group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={24} />
            <input 
              defaultValue={q}
              onKeyDown={(e) => e.key === 'Enter' && updateFilter({ q: e.currentTarget.value })}
              placeholder="Search products or stalls..."
              className="w-full bg-card-blue border-2 border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-lg font-bold text-white shadow-inner focus:border-accent/50 outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-64 w-full rounded-[2.5rem] bg-white/5" />)
            ) : businesses?.map((biz) => (
              <div key={biz.id} className="bg-card-blue border border-white/5 p-8 rounded-[2.5rem] hover:border-accent/30 transition-all group">
                <div className="flex gap-6 items-start">
                   <div className="w-20 h-20 rounded-2xl bg-primary-deep overflow-hidden border border-white/5 shrink-0 flex items-center justify-center">
                      {biz.logo_url ? <img src={biz.logo_url} className="w-full h-full object-cover" /> : <Building2 className="text-slate-800" />}
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-white uppercase italic truncate group-hover:text-accent transition-colors">{biz.name}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{biz.mall_name} • Floor {biz.floor_number}</p>
                      <p className="text-slate-400 text-xs line-clamp-2 mt-3 italic">"{biz.description || 'Verified Eastleigh Merchant'}"</p>
                   </div>
                </div>
                <div className="mt-8 flex gap-3">
                   <Link to="/business/$id" params={{ id: biz.id }} className="flex-1 bg-white/5 text-white h-14 rounded-2xl flex items-center justify-center font-black uppercase text-[10px] tracking-widest hover:bg-accent hover:text-primary-deep transition-all">View Shop</Link>
                   <a href={`https://wa.me/${biz.contact_phone}`} target="_blank" className="w-14 h-14 bg-live-green text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"><MessageCircle size={24} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
