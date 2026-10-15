import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ProductForm({ businessId, onSuccess }: { businessId: string, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase
      .from("catalog_items")
      .insert({
        business_id: businessId,
        // Add other fields as defined in your table structure...
      });

    if (!error) {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
      <h3 className="text-white font-bold">Add New Product</h3>
      {/* Add your inputs here: Name, Price, Stock, etc. */}
      <button 
        disabled={loading}
        className="w-full bg-amber-500 text-black font-bold py-2 rounded-xl"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
