import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, MessageCircle, User, Plus, ShieldCheck, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";

const rfqSearchSchema = z.object({
  admin: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/rfqs/')({
  validateSearch: (search) => rfqSearchSchema.parse(search),
  component: RFQMarketplaceComponent,
});

function RFQMarketplaceComponent() {
  const { admin } = Route.useSearch();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: rfqs, isLoading } = useQuery({
    queryKey: ["live_rfq_stream", admin],
    queryFn: async () => {
      let query = supabase
        .from("rfqs")
        .select(`*, profiles:creator_id (display_name, phone_number)`)
        .order("created_at", { ascending: false });

      if (admin !== "true") query = query.eq("status", "open");
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const filteredRFQs = useMemo(() => {
    if (!rfqs) return [];
    return rfqs.filter((rfq) => 
      `${rfq.title} ${rfq.category}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rfqs, searchTerm]);

  return (
    <div className="bg-[#020617] text-white min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Responsive Header Grid Component */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-16">
          <div>
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.25em]">B2B Sourcing Terminal</span>
            <h1 className="text-4xl font-black text-slate-100 mt-2 tracking-tighter uppercase leading-none">
              Live Wholesale <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600 italic">Requests</span>
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-2">Precision tracking platform for Eastleigh merchant supply pipelines.</p>
          </div>
          <Link 
            to="/rfq/new" 
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-wider transition-all shadow-xl active:scale-[0.99] self-start sm:self-auto"
          >
            <Plus size={14} className="stroke-[3]" /> Post Sourcing Requirement
          </Link>
        </div>

        {/* Search Input Filter Panel */}
        <div className="relative group mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors duration-300" size={18} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sourcing requirements or categories..."
            className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 pl-16 pr-8 text-sm font-semibold text-white shadow-inner focus:border-amber-500/20 outline-none transition-all duration-300 placeholder:text-slate-600"
          />
        </div>

        {/* Requests Render Loop */}
        <div className="space-y-6">
          {isLoading ? (
            [1, 2, 3].map((i) => <Skeleton key={i} className="h-56 w-full rounded-[2rem] bg-white/[0.02]" />)
          ) : filteredRFQs.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-[2rem]">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">No matching requirements located</p>
            </div>
          ) : filteredRFQs.map((rfq) => {
            const cleanPhone = rfq.profiles?.phone_number ? rfq.profiles.phone_number.replace(/\D/g, "") : "";
            
            return (
              <div key={rfq.id} className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-amber-500/20 transition-all duration-300 shadow-2xl flex flex-col lg:flex-row justify-between gap-10 group">
                
                {/* Information Core Column */}
                <div className="flex-1 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/5 text-amber-500 px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border border-amber-500/10 flex items-center gap-1">
                      <Tag size={10} /> {rfq.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight group-hover:text-amber-500 transition-colors duration-300">
                    {rfq.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-3xl">
                    {rfq.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-12 pt-4 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Target Volume</p>
                      <p className="text-lg font-black text-slate-200 font-mono">
                        {typeof rfq.quantity === 'number' ? rfq.quantity.toLocaleString() : rfq.quantity} units
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Target Budget Allocation</p>
                      <p className="text-lg font-black text-slate-100 font-mono">
                        {typeof rfq.budget === 'number' ? `KES ${rfq.budget.toLocaleString()}` : rfq.budget || 'Negotiable'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sourcing Action Terminal Column */}
                <div className="w-full lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10 flex flex-col justify-between gap-6">
                  <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                      <User size={16} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-slate-200 font-bold text-xs truncate uppercase tracking-wide">
                        {rfq.profiles?.display_name || 'Verified Buyer'}
                      </h4>
                      <div className="flex items-center gap-1 text-amber-500 text-[8px] font-black uppercase tracking-wider mt-0.5">
                        <ShieldCheck size={11} /> Identity Encrypted
                      </div>
                    </div>
                  </div>

                  <a 
                    href={cleanPhone ? `https://wa.me/${cleanPhone}?text=Hi,%20I%20can%20supply%20your%20requirement%20for%20${encodeURIComponent(rfq.title || "this requirement")}` : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 h-14 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-wider transition-all shadow-lg active:scale-[0.99]"
                  >
                    <MessageCircle size={14} className="fill-current" /> 
                    <span>Submit Quotes</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
