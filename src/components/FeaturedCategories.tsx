import { SectionHeading } from "./SectionHeading";
import { Link } from "@tanstack/react-router";
import { 
  ShoppingBag, Laptop, Smartphone, Utensils, 
  Gem, Sparkles, Home, Box 
} from "lucide-react";

const cats = [
  { id: "fashion", name: "Fashion", icon: ShoppingBag, count: "2.4k+ Stalls" },
  { id: "electronics", name: "Electronics", icon: Laptop, count: "1.2k+ Shops" },
  { id: "phones", name: "Phones", icon: Smartphone, count: "850+ Outlets" },
  { id: "restaurants", name: "Restaurants", icon: Utensils, count: "300+ Eateries" },
  { id: "jewellery", name: "Jewellery", icon: Gem, count: "450+ Gold Shops" },
  { id: "beauty", name: "Beauty", icon: Sparkles, count: "600+ Salons" },
  { id: "home", name: "Home & Decor", icon: Home, count: "900+ Shops" },
  { id: "wholesale", name: "Wholesale", icon: Box, count: "1.5k+ Bales" },
];

export function FeaturedCategories() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* Dynamic Section Heading Structure */}
      <SectionHeading 
        title="Trading Categories" 
        subtitle="Explore the high-density wholesale and retail hubs powering the Eastleigh Bazaar pipeline."
      />

      {/* Symmetric Category Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {cats.map((cat) => (
          <Link
            key={cat.id}
            to="/category/$sector"
            params={{ sector: cat.id }}
            className="group p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 transition-all duration-300 hover:border-amber-500/20 shadow-2xl flex flex-col items-start text-left"
          >
            {/* Ambient Monochromatic Icon Core */}
            <div className="w-14 h-14 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shrink-0 text-amber-500">
              <cat.icon size={22} className="stroke-[1.75]" />
            </div>
            
            {/* Structural Typography Elements */}
            <h3 className="text-base font-black text-slate-100 uppercase tracking-tight group-hover:text-amber-500 transition-colors duration-300 mb-1">
              {cat.name}
            </h3>
            
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">
              {cat.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
