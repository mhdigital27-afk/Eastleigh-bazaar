import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, ShieldCheck, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute('/staff')({
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: '/auth' });

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (roleData?.role !== 'staff' && roleData?.role !== 'super_admin') {
      throw redirect({ to: '/' });
    }
  },
  component: AssistantPage,
});

function AssistantPage() {
  const [pending, setPending] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("business_listings").select("*").eq("status", "pending_review").then(({data}) => setPending(data || []));
  }, []);

  const approve = async (id: string) => {
    const { error } = await supabase.from("business_listings").update({ status: 'live' }).eq("id", id);
    if (!error) { 
      setPending(pending.filter(p => p.id !== id)); 
      toast.success("Shop Approved!"); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-20">
      <div className="w-full md:w-80 bg-white border-r h-screen p-6 space-y-6">
        <h2 className="font-black text-slate-900 uppercase italic text-xl border-b-4 border-amber-500 pb-2">Staff Hub</h2>
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tasks</h3>
          <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-blue-500 shadow-sm">
            <p className="font-black text-xs uppercase text-slate-900">Verification Engine</p>
            <p className="text-[10px] text-slate-500 italic">Moderating new listing submissions</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 space-y-8">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border">
          <div className="bg-[#051435] p-4 flex items-center gap-2 text-white text-xs font-black uppercase">
            <ShieldCheck className="w-4 h-4 text-amber-500" /> Pending Approvals ({pending.length})
          </div>
          <div className="p-2 text-slate-900">
            {pending.length === 0 ? (
              <p className="p-10 text-center opacity-30 italic">No shops waiting for approval</p>
            ) : (
              pending.map(p => (
                <div key={p.id} className="p-4 border-b flex justify-between items-center hover:bg-slate-50">
                  <span className="font-bold text-sm uppercase">{p.name}</span>
                  <div className="flex gap-2">
                    <CheckCircle onClick={() => approve(p.id)} className="w-6 h-6 text-green-500 cursor-pointer" />
                    <XCircle className="w-6 h-6 text-red-400 cursor-pointer" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
