import { useState } from "react";
import { MessageSquare, Send, X, Bot, MessageCircle, Coins, Landmark } from "lucide-react";
import { useAdminSettings, whatsappLink } from "@/lib/admin-settings";

export function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: admin } = useAdminSettings();

  const chatLink = whatsappLink(admin?.whatsapp_number, "Hi, I need help with Eastleigh Bazaar Connect.");

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 h-[450px] rounded-[2.5rem] shadow-2xl border-2 border-[#FFAA00] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6">
          <div className="bg-[#051435] p-6 text-white flex justify-between items-center border-b-4 border-[#FFAA00]">
            <div className="flex items-center gap-3">
              <Bot className="text-[#FFAA00]" />
              <p className="font-black text-xs uppercase tracking-widest">Bazaar AI</p>
            </div>
            <X className="w-5 h-5 cursor-pointer opacity-50" onClick={() => setIsOpen(false)} />
          </div>

          <div className="flex-1 p-5 overflow-y-auto bg-slate-50 space-y-4 text-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border text-[11px] font-bold">
              "How can I help you in Eastleigh today?"
            </div>
            
            <a 
                href={chatLink}
                target="_blank"
                className="bg-[#25D366] text-white w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform mt-10"
            >
                <MessageCircle size={18} />
                <span className="font-black uppercase text-[10px] tracking-widest">Chat on WhatsApp</span>
            </a>
            <p className="text-[8px] font-black text-slate-300 uppercase">Direct line to verified support</p>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-[#051435] w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all border-b-4 border-[#FFAA00]">
          <MessageSquare className="text-[#FFAA00]" />
        </button>
      )}
    </div>
  );
}
