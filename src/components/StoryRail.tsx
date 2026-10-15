import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function StoryRail() {
  const { data: stories = [] } = useQuery({
    queryKey: ["active_stories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("business_stories")
        .select("*, business_listings(name, logo_url)")
        .limit(10);
      return data || [];
    },
  });

  if (stories.length === 0) return null;

  return (
    <div className="flex gap-6 overflow-x-auto pb-2 pt-2 px-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden items-center">
      {stories.map((story: any) => {
        // Defensive coding: safeguard against missing data links
        const business = story?.business_listings;
        if (!business) return null;

        const displayName = business.name ? business.name.split(" ")[0] : "Merchant";
        const logoUrl = business.logo_url || "/placeholder.png";

        return (
          <div 
            key={story.id} 
            className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
          >
            {/* Glowing active story ring calibrated for a dark theme */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] border-2 border-amber-500/80 bg-slate-950 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400 group-active:scale-95">
              <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-slate-900/50">
                <img 
                  src={logoUrl} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={`${displayName} Story`}
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Micro typography optimized for legibility */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors duration-200">
              {displayName}
            </span>
          </div>
        );
      })}
    </div>
  );
}
