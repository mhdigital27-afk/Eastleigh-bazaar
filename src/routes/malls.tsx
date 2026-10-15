import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
import { Building2, MapPin, ChevronRight, Search, Store, FilterX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute('/malls')({
  component: MallsExplorerComponent,
});

function MallsExplorerComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: malls, isLoading } = useQuery({
    queryKey: ["malls_directory_aggregator"],
    queryFn: async () => {
      const { data: listings, error } = await supabase
        .from("business_listings")
        .select("mall_name")
        .eq("status", "live");

      if (error) throw error;

      const counts: Record<string, number> = {};
      listings.forEach((item) => {
        if (item.mall_name) {
          counts[item.mall_name] = (counts[item.mall_name] || 0) + 1;
        }
      });

      return Object.entries(counts).map(([name, count]) => ({
        name,
        count,
        image: `https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&sig=${name}`
      })).sort((a, b) => b.count - a.count);
    },
  });

  const filteredMalls = useMemo(() => {
    if (!malls) return [];
    return malls.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [malls, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[70vh]">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
          Mall <span className="text-accent">Directory</span>
        </h1>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
          Physical Trade Hubs in Eastleigh, Nairobi
        </p>
      </div>

      <div className="relative group mb-10">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter complexes by name..."
          className="w-full bg-card-blue/40 border-2 border-white/5 rounded-3xl py-6 pl-16 pr-8 text-lg font-bold text-white shadow-inner focus:border-accent/50 outline-none transition-all placeholder:text-slate-600"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-[2.5rem] bg-white/5" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMalls.map((mall) => (
            <Link
              key={mall.name}
              to="/search"
              search={{ mall: mall.name }}
              className="group bg-card-blue rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                <img src={mall.image} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={mall.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep to-transparent" />
                <div className="absolute bottom-6 left-8">
                   <div className="flex items-center gap-2 bg-accent text-primary-deep px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest mb-2 shadow-xl">
                      <Store size={12} /> {mall.count} Verified Merchants
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{mall.name}</h3>
                </div>
              </div>
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                   <MapPin size={14} className="text-accent" /> Nairobi, Kenya
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-deep transition-all">
                   <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
