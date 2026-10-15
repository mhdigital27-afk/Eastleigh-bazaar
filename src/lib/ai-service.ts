export interface AIInsight {
  type: 'growth' | 'alert' | 'marketing' | 'task';
  message: string;
  impact: string;
}

export const aiService = {
  generateInsights: (analytics: any, products: any[], business: any): AIInsight[] => {
    const insights: AIInsight[] = [];
    if (!business?.cover_image_url) {
      insights.push({
        type: 'task',
        message: "Your showroom lacks a high-fidelity cover photo.",
        impact: "Increases trust by 40%"
      });
    }
    const recentlyAdded = products?.filter(p => {
      const added = new Date(p.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return added > weekAgo;
    }) || [];
    if (recentlyAdded.length === 0) {
      insights.push({
        type: 'growth',
        message: "No new inventory listed this week.",
        impact: "Boosts search ranking"
      });
    }
    if ((analytics?.profile_views || 0) > 100 && (analytics?.whatsapp_clicks || 0) < 5) {
      insights.push({
        type: 'alert',
        message: "High views but low WhatsApp conversion.",
        impact: "Check your pricing/descriptions"
      });
    }
    return insights;
  },
  generateProductSEO: async (itemName: string, category: string) => {
    return {
      title: `${itemName} - Premium ${category} | Eastleigh Bazaar`,
      description: `Discover high-quality ${itemName}. Verified merchant in Eastleigh. Best retail and wholesale prices. Direct WhatsApp trade available.`,
      tags: `${category}, Eastleigh, Wholesale, Kenya, Trading`
    };
  },
  generateMarketing: async (businessName: string, item: string) => {
    return {
      whatsapp: `*NEW ARRIVAL at ${businessName}* 🚀\n\nCheck out our latest ${item} on Eastleigh Bazaar!`,
      instagram: `The best trade deals in the city. 📍 Located in Eastleigh. Shop our new ${item} now! #EastleighBazaar #Trade #Kenya`
    };
  }
};
