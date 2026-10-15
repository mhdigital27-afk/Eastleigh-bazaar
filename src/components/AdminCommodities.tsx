import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export function AdminCommodities() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  async function fetchPrices() {
    const { data } = await supabase.from("commodity_prices").select("*");
    if (data) setItems(data);
  }

  async function updatePrice(id: string, newPrice: string) {
    const { error } = await supabase.from("commodity_prices").update({ current_price: newPrice }).eq("id", id);
    if (!error) toast.success("Price Updated");
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border p-8 space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <ShoppingBag className="text-accent w-6 h-6" />
        <h2 className="font-black text-xl uppercase italic">Morning Price Index</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 flex items-center justify-between">
            <span className="font-black text-xs uppercase tracking-tighter text-slate-500">{item.item_name}</span>
            <div className="flex gap-2">
              <Input 
                className="w-32 font-bold text-right" 
                defaultValue={item.current_price} 
                onBlur={(e) => updatePrice(item.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-bold text-slate-400 italic text-center">Prices update on the homepage marquee instantly.</p>
    </div>
  );
}
