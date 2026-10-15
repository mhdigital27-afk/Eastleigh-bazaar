import { Send } from "lucide-react";

export function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation ready for subscription pipeline integration
  };

  return (
    <section className="py-24 bg-[#020617] text-white border-b border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Ambient Top Icon Badge */}
        <div className="w-14 h-14 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
          <Send size={20} className="text-amber-500 translate-x-[-1px] translate-y-[1px]" />
        </div>
        
        {/* Core Narrative Elements */}
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-4">
          Stay Connected <br className="sm:hidden" /> to the Market
        </h2>
        <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-xl mb-10">
          Join 50,000+ traders. Get regional price indices and verified merchant deployment alerts sent directly to your inbox.
        </p>

        {/* High-Density Tactile Input Bar */}
        <form 
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row gap-2 p-1.5 bg-white/[0.02] backdrop-blur-3xl rounded-xl md:rounded-2xl border border-white/10 shadow-2xl focus-within:border-amber-500/40 transition-all duration-300"
        >
          <input 
            type="email" 
            placeholder="Enter your professional email address" 
            className="flex-1 bg-transparent px-4 py-3 md:py-4 outline-none text-white text-sm font-medium placeholder:text-slate-500 tracking-tight"
            required
          />
          <button 
            type="submit" 
            className="h-11 md:h-12 bg-amber-500 text-slate-950 px-8 rounded-lg md:rounded-xl font-black uppercase text-xs tracking-wider hover:bg-amber-400 active:scale-[0.99] transition-all duration-200 shadow-md flex-shrink-0"
          >
            Subscribe Now
          </button>
        </form>

        {/* Footnote Micro-Typography */}
        <p className="mt-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
          Secure Infrastructure. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
