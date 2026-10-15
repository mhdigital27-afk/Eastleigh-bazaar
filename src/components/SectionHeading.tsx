import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  badge?: string; // We added this to support the "Live Catalog" badge
}

export function SectionHeading({ title, subtitle, align = "left", className, badge }: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-12 space-y-4",
      align === "center" ? "text-center" : "text-left",
      className
    )}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest mb-4">
          {badge} <ArrowRight size={12} />
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight uppercase italic">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed uppercase tracking-widest opacity-70">
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1.5 w-16 bg-[#D4AF37] rounded-full mt-6",
        align === "center" ? "mx-auto" : "mr-auto"
      )} />
    </div>
  );
}
