import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Megaphone, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdPlacementProps {
  id: 'homepage_hero' | 'homepage_side' | 'category_banner' | 'search_sponsored';
  className?: string;
  fallback?: React.ReactNode;
}

export function AdPlacement({ id, className, fallback }: AdPlacementProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['ad_campaigns', id],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('ad_campaigns')
        .select('*, business_listings(name, id)')
        .eq('placement_id', id)
        .eq('status', 'active')
        .lte('start_date', today)
        .gte('end_date', today);
      return data || [];
    },
    refetchInterval: 300000, // Refresh every 5 mins
  });

  const activeAd = ads[currentAdIndex];

  // Track Impression
  useEffect(() => {
    if (activeAd) {
      supabase.rpc('track_ad_event', { 
        target_campaign_id: activeAd.id, 
        event_type: 'view' 
      });
    }
  }, [activeAd?.id]);

  // Handle Rotation
  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  const handleClick = async () => {
    if (!activeAd) return;
    await supabase.rpc('track_ad_event', { 
      target_campaign_id: activeAd.id, 
      event_type: 'click' 
    });
    if (activeAd.target_url) {
        window.open(activeAd.target_url, '_blank');
    } else {
        window.location.href = `/business/${activeAd.business_id}`;
    }
  };

  if (isLoading) return <div className={cn("bg-slate-900 animate-pulse rounded-3xl", className)} />;
  
  if (!activeAd) return <>{fallback || null}</>;

  return (
    <div 
      onClick={handleClick}
      className={cn("group cursor-pointer relative overflow-hidden transition-all", className)}
    >
      <img 
        src={activeAd.image_url} 
        alt="Advertisement" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
         <div className="flex items-center gap-3 bg-amber-500 text-slate-950 px-4 py-2 rounded-xl font-black uppercase text-[10px]">
            <Megaphone size={14} /> Sponsored by {activeAd.business_listings?.name} <ExternalLink size={12} />
         </div>
      </div>
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-black uppercase text-white/60 tracking-widest border border-white/10">
        Ad
      </div>
    </div>
  );
}
