import { Link } from "@tanstack/react-router";
import { 
  Facebook, Twitter, Instagram, Globe, 
  ShieldCheck, ArrowUpRight 
} from "lucide-react";
import { useAdminSettings } from "@/lib/admin-settings";

export function SiteFooter() {
  const { data: admin } = useAdminSettings();

  const sections = {
    explore: [
      { label: "Search Malls", href: "/malls" },
      { label: "B2B RFQ Marketplace", href: "/rfq" },
      { label: "Product Discovery", href: "/search" },
      { label: "Real Estate Listings", href: "/real-estate" },
    ],
    merchants: [
      { label: "Register Your Stall", href: "/auth" },
      { label: "Membership Tiers", href: "/pricing" },
      { label: "Ad Solutions", href: "/merchant/ads" },
      { label: "Verified Badge Info", href: "/pricing" },
    ],
    legal: [
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Anti-Fraud Policy", href: "/" },
      { label: "Trading Standards", href: "/" },
    ]
  };

  return (
    <footer className="bg-[#020617] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Identity Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center font-black text-amber-500 italic text-xl shadow-xl">
                EB
              </div>
              <div>
                <h2 className="font-bold text-xl tracking-tighter uppercase leading-none">Eastleigh Bazaar</h2>
                <p className="text-[8px] text-amber-500 font-black uppercase tracking-[0.3em] mt-1.5">Official Trade Hub</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-sm leading-relaxed">
              The primary digital infrastructure for the Horn of Africa's commercial capital. Connecting global trade to local verified merchants.
            </p>
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white/[0.02] rounded-xl text-slate-500 hover:text-amber-500 hover:bg-white/[0.05] transition-all border border-white/5">
                  <Icon size={16}/>
                </a>
              ))}
            </div>
          </div>

          {/* Directory Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-amber-500">Directory</h4>
            <ul className="space-y-3.5">
              {sections.explore.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-slate-400 text-xs font-bold uppercase tracking-wide hover:text-white transition-colors flex items-center gap-2">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Merchant Support Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-amber-500">For Merchants</h4>
            <ul className="space-y-3.5">
              {sections.merchants.map((link) => (
                <li key={link.label} className="group">
                  <Link to={link.href} className="text-slate-400 text-xs font-bold uppercase tracking-wide hover:text-white transition-colors flex items-center gap-1">
                    {link.label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Verification Info */}
          <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-amber-500">Support Line</h4>
            <div className="space-y-5">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">M-Pesa Till</span>
                <span className="text-lg font-black tracking-widest text-slate-200">{admin?.mpesa_till || "4942591"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Inquiries</span>
                <span className="text-xs font-bold text-slate-400 break-all leading-tight">{admin?.contact_email || "trade@eastleighbazaar.com"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.15em]">
              © 2026 EB Connect Infrastructure
            </p>
            <div className="hidden md:flex items-center gap-2 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
               <ShieldCheck size={12} className="text-amber-500" />
               <span className="text-[8px] font-black uppercase text-amber-500 tracking-widest">Verified Platform</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-2 text-slate-600 text-[9px] font-black uppercase tracking-widest">
              <Globe size={12} /> <span>Global Trade Node</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
               {sections.legal.map(l => (
                 <Link key={l.label} to={l.href} className="text-[9px] font-black text-slate-500 hover:text-white uppercase transition-colors tracking-wide">{l.label}</Link>
               ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
