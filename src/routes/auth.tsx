import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck, Chrome, ChevronLeft, Building2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute('/auth')({ component: AuthPage });

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, businessId } = useAuth();
  const navigate = useNavigate();

  // Automatic redirect if already logged in
  useEffect(() => {
    if (user) {
      if (businessId) navigate({ to: "/merchant/dashboard" });
      else navigate({ to: "/merchant/profile" }); // Send to onboarding/profile setup
    }
  }, [user, businessId, navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/merchant/dashboard`,
      },
    });
    if (error) toast.error("Google Auth Error: " + error.message);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { full_name: email.split('@')[0] }
        }
      });
      if (error) toast.error(error.message);
      else { 
        toast.success("Account created! Check your email for verification."); 
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("Check your credentials and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#051435]">
      <div className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] hover:text-[#051435] transition-colors">
          <ChevronLeft size={16}/> Back to Market
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pb-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
             <div className="w-20 h-20 bg-[#051435] rounded-[1.8rem] flex items-center justify-center mx-auto shadow-2xl mb-6 rotate-3">
                <Building2 className="w-10 h-10 text-[#FFAA00] -rotate-3" />
             </div>
             <h1 className="text-3xl font-black italic uppercase tracking-tighter">Bazaar Portal</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">Executive Access</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-12 space-y-8">
              <button onClick={handleGoogleLogin} className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50 flex items-center justify-center gap-4 font-bold text-sm hover:border-[#FFAA00] transition-all">
                <Chrome size={20} className="text-blue-500" /> <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center"><div className="flex-grow border-t"></div><span className="mx-4 text-[9px] font-black text-slate-300 uppercase">or use email</span><div className="flex-grow border-t"></div></div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#051435] font-bold outline-none" />
                <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#051435] font-bold outline-none" />
                <button disabled={loading} type="submit" className="w-full h-18 bg-[#051435] text-white rounded-2xl font-black uppercase flex items-center justify-center gap-3 shadow-xl mt-4">
                  {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? "Join Market" : "Enter Portal")} <ArrowRight size={20} className="text-[#FFAA00]" />
                </button>
                <button type="button" onClick={()=>setIsSignUp(!isSignUp)} className="w-full text-center text-[10px] font-black uppercase text-slate-400 hover:text-[#051435] mt-4">{isSignUp ? "Already registered? Login" : "New Merchant? Create Account"}</button>
              </form>
            </div>
            <div className="bg-[#051435] p-6 text-center flex items-center justify-center gap-3">
              <ShieldCheck size={16} className="text-[#FFAA00]" />
              <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Authorized Trade Terminal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
    return <Activity className={cn("animate-spin", className)} />;
}

function Activity({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
