import { ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminSettings } from "@/lib/admin-settings";
import { toast } from "sonner";

export function SafeBuyButton({ businessName }: { businessName: string }) {
  const { data: s } = useAdminSettings();

  const handleEscrowClick = () => {
    toast.info(`Paying via Eastleigh Bazaar Safe-Buy...`, {
      description: `Send funds to Till: ${s?.mpesa_till || '582104'}. We hold the money until you get your goods.`,
      duration: 6000,
    });
  };

  return (
    <div className="bg-green-50 border-2 border-green-200 p-4 rounded-2xl space-y-3 shadow-sm">
      <div className="flex items-center gap-2 text-green-700">
        <ShieldCheck className="w-5 h-5 fill-green-700 text-white" />
        <span className="font-black text-xs uppercase tracking-widest">Safe-Buy Enabled</span>
      </div>
      <p className="text-[10px] text-green-600 font-bold leading-tight">
        Pay securely via our Admin Escrow. We only release payment to <span className="underline">{businessName}</span> once your Mbeba confirms delivery.
      </p>
      <Button 
        onClick={handleEscrowClick}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] py-6 rounded-xl gap-2"
      >
        <Smartphone className="w-4 h-4" />
        Secure Checkout (M-Pesa)
      </Button>
    </div>
  );
}
