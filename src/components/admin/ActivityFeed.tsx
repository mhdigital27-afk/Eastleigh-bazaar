import { Package, UserPlus, ShieldCheck, MessageSquare, Megaphone, Zap, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  action_type: string;
  actor_name: string;
  description: string;
  created_at: string;
}

const iconMap: Record<string, any> = {
  registration: { icon: UserPlus, color: 'text-blue-400 bg-blue-500/10' },
  upgrade: { icon: Zap, color: 'text-amber-400 bg-amber-500/10' },
  product_added: { icon: Package, color: 'text-emerald-400 bg-emerald-500/10' },
  review_received: { icon: MessageSquare, color: 'text-purple-400 bg-purple-500/10' },
  verified: { icon: ShieldCheck, color: 'text-blue-500 bg-blue-500/10' },
  report: { icon: AlertTriangle, color: 'text-rose-400 bg-rose-500/10' },
};

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="space-y-6 relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />
      
      {activities.length > 0 ? activities.map((item) => {
        const config = iconMap[item.action_type] || { icon: Clock, color: 'text-slate-400 bg-slate-500/10' };
        return (
          <div key={item.id} className="flex gap-6 relative animate-in fade-in slide-in-from-left-4">
            <div className={cn("w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center shrink-0 z-10 bg-slate-900", config.color)}>
              <config.icon size={14} />
            </div>
            <div className="flex-1 pb-6 border-b border-white/5">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[11px] font-black text-white uppercase tracking-tight">
                  <span className="text-amber-500">{item.actor_name}</span> {item.description}
                </h4>
                <span className="text-[8px] font-bold text-slate-600 uppercase whitespace-nowrap">
                  {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      }) : (
        <div className="py-20 text-center opacity-20">
           <Activity size={32} className="mx-auto mb-4" />
           <p className="text-[10px] font-black uppercase tracking-widest">Awaiting platform pulse...</p>
        </div>
      )}
    </div>
  );
}
