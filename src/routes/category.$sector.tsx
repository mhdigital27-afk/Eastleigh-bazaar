import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, ShieldCheck, ChevronRight, Package, ArrowLeft, Star } from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/category/$sector")({
  component: CategoryComponent,
});

function CategoryComponent() {
  const { sector } = Route.useParams();
  const sectorInfo = SECTORS.find(s => s.id === sector) || { label: sector.toUpperCase(), id: sector };

  const { data: merchants, isLoading } = useQuery({
    queryKey: ["category_merchants", sector],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("sector", sector)
        .eq("status", "live")
        .order("membership_tier", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[70vh]">
      <div className="bg-card-blue border border-white/5 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden mb-12 shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-[0.3em] mb-10 hover:gap-4 transition-all">
              <ArrowLeft size={14} /> Back to Market
            </Link>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              {sectorInfo.label}
            </h1>
            <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-accent text-primary-deep text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} /> Verified Sector
              </div>
              <span className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                {merchants?.length || 0} Registered Stalls
              </span>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading ? (
          [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-80 w-full rounded-[2.5rem] bg-white/5" />)
        ) : merchants?.map((biz) => (
          <Link 
            key={biz.id} 
            to="/business/$id" 
            params={{ id: biz.id }}
            className="group bg-card-blue border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-accent/40 transition-all duration-500"
          >
            <div className="aspect-[4/3] bg-primary-deep overflow-hidden relative">
              <img 
                src={biz.cover_image_url || biz.logo_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80" 
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                 {biz.is_verified && <div className="p-2 bg-blue-500 text-white rounded-xl"><ShieldCheck size={14} /></div>}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-white uppercase italic truncate group-hover:text-accent transition-colors">
                {biz.name}
              </h3>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                <MapPin size={12} className="text-accent" /> {biz.mall_name}
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-1">
                    <Star size={12} fill="#f59e0b" className="text-accent" />
                    <span className="text-[10px] font-black text-white">4.9</span>
                 </div>
                 <ChevronRight size={18} className="text-slate-700 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
