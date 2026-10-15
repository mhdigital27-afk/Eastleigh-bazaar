import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "./SectionHeading";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { useEffect } from "react";

export function TrendingProducts() {
  const { data: products = [] } = useQuery({
    queryKey: ["trending_products_v2"],
    queryFn: async () => {
      const { data } = await supabase
        .from("catalog_items")
        .select("*, business_listings(name, contact_phone)")
        .eq("status", "active")
        .limit(8);
      return data || [];
    },
  });

  useEffect(() => {
    if (products.length > 0) {
      const bizIds = [...new Set(products.map((p: any) => p.business_id))].filter(Boolean);
      bizIds.forEach(id => {
        supabase.rpc("track_business_event", { target_biz_id: id, event_type: "impression" });
      });
    }
  }, [products]);

  return (
    <section className="py-28 bg-[#020617] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Trending in the Market" 
          subtitle="Discover the most sought-after products from verified local stalls."
          align="center"
          badge="Live Catalog"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {products.map((product: any) => {
            const business = product?.business_listings;
            const businessName = business?.name || "Verified Merchant";
            const cleanPhone = business?.contact_phone ? business.contact_phone.replace(/\D/g, "") : "";

            return (
              <div key={product.id} className="group flex flex-col bg-white/[0.01] border border-white/5 p-4 rounded-[2rem] hover:border-amber-500/20 transition-all duration-300">
                {/* Visual Window */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/5 mb-5">
                  <img 
                    src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80"} 
                    alt={product.item_name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => supabase.rpc("track_business_event", { target_biz_id: product.business_id, event_type: "favorite" })} className="p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white hover:text-amber-500">
                      <Heart size={14} />
                    </button>
                    <button onClick={() => supabase.rpc("track_business_event", { target_biz_id: product.business_id, event_type: "share" })} className="p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white hover:text-amber-500">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1 px-1">
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] truncate">{businessName}</p>
                  <h3 className="text-sm font-bold text-slate-100 truncate uppercase">{product.item_name}</h3>
                  <div className="pt-2">
                    <span className="text-[8px] font-black text-slate-500 uppercase">Retail </span>
                    <span className="text-sm font-mono font-black text-white ml-2">KES {Number(product.price_rate || 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* Action */}
                <a 
                  href={cleanPhone ? `https://wa.me/${cleanPhone}?text=Hi,%20I%20am%20interested%20in%20${product.item_name}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-white/[0.03] border border-white/10 hover:border-amber-500/50 text-slate-200 rounded-xl font-black uppercase text-[10px] tracking-widest hover:text-amber-500 transition-all"
                >
                  <MessageCircle size={12} /> WhatsApp Inquiry
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
