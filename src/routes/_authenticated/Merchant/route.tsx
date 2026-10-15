import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { MerchantLayout } from "@/components/merchant/MerchantLayout";

export const Route = createFileRoute("/_authenticated/Merchant")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/login" });
  },
  component: MerchantLayout,
});
