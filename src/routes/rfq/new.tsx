import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FileText, ArrowRight, Calendar, MapPin, Loader2, ShieldCheck, ChevronLeft, DollarSign, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { SECTORS } from '@/lib/sectors';

export const Route = createFileRoute('/rfq/new')({
  component: NewRFQPage,
});

function NewRFQPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'retail',
    description: '',
    quantity: 1,
    budget: '',
    location: '',
    deadline: '',
    visibility: 'public' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        toast.error("Please login to post a request");
        setLoading(false);
        return;
    }

    try {
      const { error } = await supabase.from('rfqs').insert({
        ...formData,
        creator_id: user.id
      });
      if (error) throw error;
      toast.success("Request Broadcasted Successfully!");
      navigate({ to: '/rfqs' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back Link Component */}
        <button 
          onClick={() => navigate({ to: '/rfqs' })} 
          className="inline-flex items-center gap-2 text-slate-500 font-black uppercase text-[9px] tracking-[0.2em] hover:text-amber-500 transition-colors mb-10"
        >
           <ChevronLeft size={14} className="stroke-[3]"/> Back to Sourcing Terminal
        </button>

        {/* Form Container Panel */}
        <div className="bg-white/[0.01] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
          
          {/* Header Block Component */}
          <div className="bg-slate-950 p-10 text-white flex items-center justify-between border-b border-white/5">
             <div>
                 <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.25em]">Direct Procurement Terminal</span>
                 <h1 className="text-2xl font-black uppercase tracking-tight text-slate-100 mt-1">Post Sourcing Request</h1>
             </div>
             <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-amber-500">
               <FileText size={22} />
             </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
             
             {/* Title Form Segment */}
             <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Sourcing Requirement / Title</label>
                <input 
                  required 
                  type="text"
                  placeholder="e.g. Sourcing 200 Egyptian Cotton Bedsheets"
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl p-5 font-bold text-sm text-white outline-none focus:border-amber-500/20 transition-all duration-300 placeholder:text-slate-700" 
                />
             </div>

             {/* Double Column Grid Row */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Layers size={11}/> Market Category</label>
                   <div className="relative">
                     <select 
                       value={formData.category} 
                       onChange={e => setFormData({...formData, category: e.target.value})}
                       className="w-full bg-slate-950 border border-white/5 rounded-xl p-5 font-bold text-sm text-slate-200 outline-none focus:border-amber-500/20 appearance-none transition-all duration-300"
                     >
                        {SECTORS.map(s => <option key={s.id} value={s.id} className="bg-[#020617] text-white">{s.label}</option>)}
                     </select>
                   </div>
                </div>
                
                <div className="space-y-2.5">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Quantity Required</label>
                   <input 
                     type="number" 
                     required 
                     min="1"
                     value={formData.quantity} 
                     onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                     className="w-full bg-slate-950 border border-white/5 rounded-xl p-5 font-mono font-bold text-sm text-white outline-none focus:border-amber-500/20 transition-all duration-300" 
                   />
                </div>
             </div>

             {/* Textarea Description Segment */}
             <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Detailed Description & Specifications</label>
                <textarea 
                  rows={4} 
                  placeholder="Provide precise details regarding materials, sizing, bulk packaging, or expected delivery targets..."
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-950/40 border border-white/5 rounded-2xl p-5 font-medium text-sm text-slate-300 outline-none resize-none focus:border-amber-500/20 transition-all duration-300 placeholder:text-slate-700" 
                />
             </div>

             {/* Triple Column Context Details Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2.5">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><DollarSign size={11} className="text-slate-500"/> Target Budget</label>
                   <input 
                     value={formData.budget} 
                     onChange={e => setFormData({...formData, budget: e.target.value})}
                     className="w-full bg-slate-950 border border-white/5 rounded-xl p-5 font-bold text-sm text-white outline-none focus:border-amber-500/20 transition-all duration-300 placeholder:text-slate-700" 
                     placeholder="e.g. 50,000 - 100,000"
                   />
                </div>
                
                <div className="space-y-2.5">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><MapPin size={11} className="text-slate-500"/> Delivery Location</label>
                   <input 
                     required 
                     value={formData.location} 
                     onChange={e => setFormData({...formData, location: e.target.value})}
                     className="w-full bg-slate-950 border border-white/5 rounded-xl p-5 font-bold text-sm text-white outline-none focus:border-amber-500/20 transition-all duration-300 placeholder:text-slate-700" 
                     placeholder="e.g. Eastleigh Section III"
                   />
                </div>
                
                <div className="space-y-2.5">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Calendar size={11} className="text-slate-500"/> Sourcing Deadline</label>
                   <input 
                     type="date" 
                     required
                     value={formData.deadline} 
                     onChange={e => setFormData({...formData, deadline: e.target.value})}
                     className="w-full bg-slate-950 border border-white/5 rounded-xl p-5 font-bold text-sm text-slate-300 outline-none focus:border-amber-500/20 transition-all duration-300 invert-calendar-icon" 
                   />
                </div>
             </div>

             {/* Premium Verification Information Block */}
             <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-start gap-4 text-slate-300">
                <ShieldCheck className="shrink-0 text-amber-500 mt-0.5" size={18}/>
                <p className="text-[10px] font-semibold uppercase tracking-wider leading-relaxed">
                  Your broadcast will be routed straight to all <span className="text-amber-500 font-bold underline">Verified Merchants</span> across Eastleigh Bazaar. Incoming supply offers will stream directly into your hub dashboard.
                </p>
             </div>

             {/* Action Fire Trigger Button */}
             <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 h-16 rounded-xl font-black uppercase text-[10px] tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-40 active:scale-[0.99]"
             >
                {loading ? (
                  <Loader2 className="animate-spin text-slate-950" size={16} />
                ) : (
                  <>
                    <span>Broadcast Sourcing Request</span> 
                    <ArrowRight size={14} className="stroke-[3]" />
                  </>
                )}
             </button>
          </form>
        </div>
      </div>

      {/* Embedded Native Inversion Styles for Dark Date Fields */}
      <style>{`
        .invert-calendar-icon::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
