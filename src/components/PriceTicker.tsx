import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function PriceTicker() {
  const { data: prices } = useQuery({
    queryKey: ["commodity_prices"],
    queryFn: async () => {
      const { data } = await supabase.from("commodity_prices").select("*");
      return data || [];
    },
  });

  if (!prices || prices.length === 0) return null;

  return (
    <div className="bg-primary-deep text-white border-y border-accent/30 py-1 overflow-hidden h-8 flex items-center shadow-lg">
      <div className="flex whitespace-nowrap animate-marquee gap-10 items-center">
        {prices.map((p: any) => (
          <div key={p.id} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <span className="text-accent-soft">{p.item_name}:</span>
            <span>{p.current_price}</span>
            <span className={p.trend === 'up' ? 'text-red-400' : 'text-green-400'}>
              {p.trend === 'up' ? '▲' : '▼'}
            </span>
          </div>
        ))}
        {/* Repeat the list once for seamless scrolling */}
        {prices.map((p: any) => (
          <div key={`${p.id}-2`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <span className="text-accent-soft">{p.item_name}:</span>
            <span>{p.current_price}</span>
            <span className={p.trend === 'up' ? 'text-red-400' : 'text-green-400'}>
              {p.trend === 'up' ? '▲' : '▼'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
