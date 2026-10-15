import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAdminSettings() {
  return useQuery({
    queryKey: ["admin_settings"],
    queryFn: async () => {
      // Direct pull from Row 1 - No fallbacks allowed. 
      // If you change it in Admin, this will show the change.
      const { data } = await supabase.from("admin_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
    refetchInterval: 10000, // Syncs every 10 seconds
  });
}

export function whatsappLink(number: string | null | undefined, message?: string): string {
  const digits = (number || "254140655969").replace(/[^\d]/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
