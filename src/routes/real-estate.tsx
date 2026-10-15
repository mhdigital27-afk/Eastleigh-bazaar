import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarketPulse } from "@/components/MarketPulse";
import { MessageCircle, MapPin, Building2, Search, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute('/real-estate')({
  component: RealEstatePage,
})

function RealEstatePage() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["real_estate_terminal"],
    queryFn: async () => {
      const { data } = await supabase.from("real_estate").select("*").eq("is_available", true);
      return data || [];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[70vh]">
      <MarketPulse />
      
      <div className="mt-12 mb-16 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
          Commercial <span className="text-accent">Properties</span>
        </h1>
        <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed uppercase tracking-widest opacity-70">
          Premium stalls, shop floor leases, and commercial warehouses across verified Eastleigh mall locations.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 w-full rounded-[3rem] bg-white/5" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((item: any) => (
            <div key={item.id} className="bg-card-blue rounded-[2.5rem] overflow-hidden shadow-xl border border-white/5 group hover:border-accent/40 transition-all">
              <div className="aspect-video bg-slate-900 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-accent text-primary-deep text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">{item.type}</div>
                <img src={`https://images.unsplash.com/photo-1582213726893-edc10ff091d1?auto=format&fit=crop&q=80&sig=${item.id}`} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="font-black text-2xl text-white uppercase italic tracking-tighter">{item.title}</h3>
                <p className="text-accent font-black text-xl mt-2 tracking-tighter">{item.price}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <MapPin size={14} className="text-accent" /> {item.location_detail}
                  </div>
                  <a href={`https://wa.me/${item.whatsapp_contact}`} target="_blank" className="bg-live-green text-white p-3 rounded-xl shadow-lg hover:scale-110 transition-transform"><MessageCircle className="w-5 h-5" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
