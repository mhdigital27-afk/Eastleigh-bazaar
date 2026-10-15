import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: 'blue' | 'amber' | 'emerald' | 'rose' | 'purple' | 'slate';
  description?: string;
  trend?: string;
  trendUp?: boolean;
}

const colorMap = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  slate: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};

export function AdminStatCard({ icon: Icon, label, value, color, description, trend, trendUp }: AdminStatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[1.8rem] shadow-sm transition-all hover:border-slate-700 group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={cn("p-3 rounded-xl border transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn(
            "text-[9px] font-black px-2 py-1 rounded-lg",
            trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="space-y-1 relative z-10">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          {label}
        </p>
        <h3 className="text-3xl font-black text-white italic tracking-tighter tabular-nums">
          {value}
        </h3>
        {description && (
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-2">{description}</p>
        )}
      </div>

      <Icon size={120} className="absolute -right-8 -bottom-8 opacity-[0.03] text-white rotate-12 transition-transform group-hover:rotate-0" />
    </div>
  );
}
