import { createFileRoute } from "@tanstack/react-router";
import { StatCard } from "@/components/merchant/StatCard";
import { Eye, ShoppingBag, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_authenticated/Merchant/dashboard")({
  component: MerchantDashboard,
});

function MerchantDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Vendor Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Views" value="0" icon={Eye} />
        <StatCard label="Active Items" value="0" icon={ShoppingBag} />
        <StatCard label="Revenue" value="KES 0" icon={DollarSign} />
      </div>
    </div>
  );
}
