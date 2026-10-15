import { SectionHeading } from "./SectionHeading";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronRight } from "lucide-react";

// This structure is ready for when you link it to your 'news' or 'blog' table in Supabase
interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export function MarketNews() {
  // We keep this data block isolated so you can easily replace it with a Supabase fetch later
  const news: NewsItem[] = [
    { 
      id: "1", 
      title: "BBS Mall Modernization: New Trade Routes Open", 
      date: "July 4, 2026", 
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80",
      excerpt: "New infrastructure projects are set to double the capacity of Eastleigh's premier shopping destination..."
    },
    { 
      id: "2", 
      title: "Understanding Export Logistics to Mogadishu", 
      date: "July 2, 2026", 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
      excerpt: "A complete guide for merchants looking to expand their footprint in the Horn of Africa region."
    },
    { 
      id: "3", 
      title: "Gold Trading Policies Updated for 2026", 
      date: "June 28, 2026", 
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80",
      excerpt: "Verified gold merchants must now display real-time pricing as per the new market transparency act."
    }
  ];

  return (
    <section className="py-24 bg-[#020617] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Market News & Intelligence" 
          subtitle="Stay ahead with the latest updates from the commercial heart of the region."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {news.map((item) => (
            <article 
              key={item.id} 
              className="group bg-white/[0.02] backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/5 hover:border-amber-500/20 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div className="flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2 border border-white/10">
                    <Calendar size={10} className="text-amber-500" />
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{item.date}</span>
                  </div>
                </div>

                <div className="p-6 md:p-8 pb-4">
                  <h3 className="text-lg font-black text-white leading-tight uppercase italic group-hover:text-amber-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed mt-3 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Read Article <ChevronRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
