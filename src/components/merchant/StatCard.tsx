import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
      <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <h4 className="text-xl font-black text-white">{value}</h4>
      </div>
    </div>
  );
}
