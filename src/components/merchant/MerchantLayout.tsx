import { Outlet, Link, useLocation } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Package, 
  LogOut, 
  Store,
  Bell
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Updated paths to match the "Merchant" folder structure
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/Merchant/dashboard" },
  { icon: Package, label: "Products", path: "/Merchant/products" },
];

export function MerchantLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between bg-[#020617]/50 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-10 text-amber-500 font-black tracking-tighter uppercase">
            <Store size={20} />
            <span>Vendor Hub</span>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === item.path 
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <button 
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-500 transition-colors font-bold text-[10px] uppercase tracking-widest"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-black text-white capitalize tracking-tight">
            {location.pathname.split('/').pop()}
          </h1>
          <button className="p-2 border border-white/10 rounded-xl text-slate-400 hover:text-amber-500 transition-colors">
            <Bell size={18} />
          </button>
        </header>
        
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
