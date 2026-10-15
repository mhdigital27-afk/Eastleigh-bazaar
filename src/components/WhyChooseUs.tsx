import { ShieldCheck, Search, MessageCircle, Users } from "lucide-react";

const features = [
  { title: "Verified Businesses", icon: ShieldCheck, desc: "Every merchant undergoes physical inspection to ensure authentic trading." },
  { title: "Smart Discovery", icon: Search, desc: "Find specific products or stalls across 500+ malls in milliseconds." },
  { title: "Direct Contact", icon: MessageCircle, desc: "Connect directly with owners via WhatsApp. No middlemen or commissions." },
  { title: "Trusted Community", icon: Users, desc: "Join the largest verified digital network for East African trade." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <div key={i} className="space-y-6 text-center lg:text-left">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#D4AF37] shadow-sm shadow-slate-200 mx-auto lg:mx-0">
                <f.icon size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{f.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-tighter">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
