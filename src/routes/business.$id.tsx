import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, MapPin, Star, Package, Image as ImageIcon, MessageSquare, ChevronLeft, Share2, Crown, Store, ArrowRight, Clock, Phone, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute('/business/$id')({
  component: BusinessDetailComponent,
});

function BusinessDetailComponent() {
  const { id } = Route.useParams();
  const [activeTab, setActiveTab] = useState<'catalog' | 'gallery' | 'reviews'>('catalog');

  const { data: business, isLoading: bizLoading } = useQuery({
    queryKey: ["business_terminal", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("business_listings").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["business_items", id],
    enabled: !!business,
    queryFn: async () => {
      const { data } = await supabase.from("catalog_items").select("*").eq("business_id", id).eq("status", "active");
      return data || [];
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["business_sentiment", id],
    enabled: !!business,
    queryFn: async () => {
      const { data } = await supabase.from("business_reviews").select("*").eq("business_id", id).order("created_at", { ascending: false });
      return data || [];
    },
  });

  useEffect(() => {
    if (id) supabase.rpc('track_business_event', { target_biz_id: id, event_type: 'profile_view' });
  }, [id]);

  if (bizLoading) return <div className="container mx-auto p-8"><Skeleton className="h-[400px] w-full rounded-[3rem] bg-white/5" /></div>;
  if (!business) return <div className="py-20 text-center text-white font-black uppercase italic">Stall Offline</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[80vh]">
      <section className="bg-card-blue border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl mb-12">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 rounded-l-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-10">
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-[2.5rem] bg-primary-deep p-2 border-2 border-white/5 shrink-0 shadow-2xl">
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 flex items-center justify-center">
              {business.logo_url ? <img src={business.logo_url} className="w-full h-full object-cover" /> : <Store size={60} className="text-slate-800" />}
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1 rounded-full bg-accent text-primary-deep text-[10px] font-black uppercase tracking-widest">{business.sector}</span>
              {business.is_verified && <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-blue-500/20"><ShieldCheck size={12}/> Verified</span>}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">{business.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-white/40 font-bold uppercase text-[10px] tracking-widest">
                <span className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> {business.mall_name} • Floor {business.floor_number} • Stall {business.stall_number}</span>
                <span className="flex items-center gap-1 text-accent"><Star size={12} fill="currentColor" /> 4.9 Score</span>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto">
             <WhatsAppButton variant="inline" label="Chat Trade" className="w-full md:w-auto h-16 px-10 rounded-2xl shadow-xl font-black uppercase" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-card-blue border border-white/5 rounded-[2.5rem] p-10 shadow-xl">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-6">About Merchant</p>
              <p className="text-slate-300 text-lg font-medium leading-relaxed italic">"{business.description || 'Verified Bazaar trade partner in Eastleigh.'}"</p>
           </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
           <div className="flex gap-2 bg-slate-900/50 p-1.5 rounded-2xl w-max">
              {(['catalog', 'gallery', 'reviews'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={cn("px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === t ? "bg-accent text-primary-deep shadow-lg" : "text-slate-500 hover:text-white")}>{t}</button>
              ))}
           </div>
           <div className="pt-4">
              {activeTab === 'catalog' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                   {items.map(item => (
                     <div key={item.id} className="bg-card-blue border border-white/5 rounded-[2rem] p-6 flex gap-6 hover:border-accent/40 transition-all">
                        <div className="w-24 h-24 rounded-2xl bg-primary-deep overflow-hidden shrink-0 border border-white/5">
                           <img src={item.image_url || ''} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                           <h4 className="font-black text-white uppercase text-sm italic leading-tight truncate">{item.item_name}</h4>
                           <div>
                              <p className="text-[8px] font-bold text-slate-500 uppercase">Retail/Wholesale</p>
                              <p className="text-2xl font-black text-accent tracking-tighter">KES {item.price_rate}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              )}
              {activeTab !== 'catalog' && <div className="py-20 text-center bg-card-blue/20 rounded-[3rem] border-2 border-dashed border-white/5 text-slate-700 font-black uppercase text-xs tracking-widest">Section under sync</div>}
           </div>
        </div>
      </div>
    </div>
  );
}
