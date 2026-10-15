import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarketPulse } from "@/components/MarketPulse";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { FeaturedBusinesses, type BusinessListing } from "@/components/FeaturedBusinesses";

// 1. TanStack Route Initialization
export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  // 2. Fully Typed Supabase Query matching your exact column schema
  const { data: premiumMerchants, isLoading: loadingPremium } = useQuery<BusinessListing[]>({
    queryKey: ["homepage_premium_merchants_live"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select(`
          id, 
          sector, 
          membership_tier, 
          is_verified, 
          is_open
        `)
        .eq("status", "live")
        .eq("membership_tier", "gold")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      
      // 3. Fallback map pipeline to cleanly fill visual properties missing from schema
      return (data || []).map((item: any) => ({
        id: item.id,
        sector: String(item.sector || "General"),
        membership_tier: String(item.membership_tier || "gold"),
        is_verified: Boolean(item.is_verified),
        is_open: Boolean(item.is_open),
        // Fallback properties ensuring strict interface alignment without empty text crashes
        name: "Premium Bazaar Partner", 
        mall_name: "Eastleigh Hub",
        floor_number: "Ground",
        logo_url: null,
        cover_image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
      })) as BusinessListing[];
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* Real-time Status/Market Pulse Ticker */}
      <MarketPulse />

      {/* Structured Content Layout Frame */}
      <main className="w-full flex flex-col gap-20 py-12">
        
        {/* Category Discovery Segment */}
        <section aria-label="Trading Sectors">
          <FeaturedCategories />
        </section>

        {/* Premium Core Verified Business Showroom Grid */}
        <section aria-label="Featured Trade Stalls">
          <FeaturedBusinesses 
            businesses={premiumMerchants || []} 
            isLoading={loadingPremium} 
          />
        </section>

      </main>
    </div>
  );
}
