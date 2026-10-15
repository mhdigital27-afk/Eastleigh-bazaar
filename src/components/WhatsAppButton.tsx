import { useAdminSettings, whatsappLink } from "@/lib/admin-settings";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  message?: string;
  variant?: "floating" | "inline";
  label?: string;
  className?: string;
};

export function WhatsAppButton({ message, variant = "floating", label, className }: Props) {
  const { data: settings } = useAdminSettings();
  const href = whatsappLink(settings?.whatsapp_number, message);

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-lg hover:bg-[#1ebe57] transition-all hover:scale-105",
          className,
        )}
      >
        <MessageCircle className="w-5 h-5" />
        {label ?? "Chat on WhatsApp"}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Eastleigh Bazaar on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-[#25D366]/30 hover:scale-110 active:scale-95 transition-transform",
        className,
      )}
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </a>
  );
}
