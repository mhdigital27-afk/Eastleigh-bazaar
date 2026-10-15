import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/Merchant/products")({
  component: MerchantProducts,
});

function MerchantProducts() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Inventory Management</h2>
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-12 text-center">
        <p className="text-slate-500">Your product list will appear here.</p>
      </div>
    </div>
  );
}
