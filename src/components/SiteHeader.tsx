import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { 
  Menu, Search, LogOut, ShieldCheck, LayoutDashboard, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { ForexTicker } from "@/components/ForexTicker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, role, businessId, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const navLinks = [
    { label: "Malls", path: "/malls" },
    { label: "Categories", path: "/#categories" },
    { label: "RFQ Market", path: "/rfq" },
    { label: "Real Estate", path: "/real-estate" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[200]">
      {/* Top Utility Bar with Ticker */}
      <ForexTicker />
      
      <header className={cn(
        "transition-all duration-500 border-b",
        isScrolled 
          ? "bg-[#020617]/80 backdrop-blur-md py-3 shadow-2xl border-white/5" 
          : "bg-[#020617] py-5 border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center font-black text-amber-500 italic text-xl transition-transform group-hover:scale-105 shadow-xl">
              EB
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter text-white uppercase leading-none">
                Eastleigh<span className="text-amber-500">Bazaar</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-500 mt-1">
                Version 2.0 Connect
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.path} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-amber-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <Link to="/search" className="p-2 text-slate-400 hover:text-white transition-colors hidden md:block">
              <Search size={18} />
            </Link>

            <div className="h-4 w-px bg-white/10 mx-2 hidden lg:block" />

            {!loading && (
              <div className="hidden lg:flex items-center gap-5">
                {user ? (
                  <div className="flex items-center gap-3">
                    {role === 'super_admin' ? (
                      <Link to="/super-admin" className="flex items-center gap-2 bg-white/[0.03] text-white border border-white/10 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider hover:border-amber-500/30 transition-all shadow-lg">
                        <ShieldCheck size={13} className="text-amber-500" /> Authority Hub
                      </Link>
                    ) : (
                      <Link to="/merchant/dashboard" className="flex items-center gap-2 bg-white/[0.03] text-white border border-white/10 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider hover:border-amber-500/30 transition-all shadow-lg">
                        <LayoutDashboard size={13} className="text-amber-500" /> {businessId ? 'Dashboard' : 'Setup Shop'}
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="text-slate-500 hover:text-red-400 transition-colors p-2"
                      title="Sign Out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/auth" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors">
                      Login
                    </Link>
                    <Link 
                      to="/auth" 
                      className="bg-amber-500 text-slate-950 px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-amber-400 active:scale-[0.98] transition-all shadow-md"
                    >
                      Open Stall
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-white hover:text-amber-500 transition-colors">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#020617] text-white border-l border-white/5 flex flex-col justify-between">
                <div>
                  <SheetHeader className="text-left pb-6 border-b border-white/5">
                    <SheetTitle className="text-white font-black italic text-xl uppercase tracking-tight">
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-5 mt-8">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.label} 
                        to={link.path} 
                        className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pb-8 border-t border-white/5 pt-6">
                  {!loading && user ? (
                    <Link to="/merchant/dashboard" className="w-full block bg-amber-500 text-slate-950 p-3.5 rounded-xl font-black text-center uppercase text-xs tracking-wider">
                      Go to Dashboard
                    </Link>
                  ) : (
                    <Link to="/auth" className="w-full block bg-white/[0.03] border border-white/10 text-white p-3.5 rounded-xl font-black text-center uppercase text-xs tracking-wider hover:border-amber-500/30 transition-all">
                      Register Business
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
