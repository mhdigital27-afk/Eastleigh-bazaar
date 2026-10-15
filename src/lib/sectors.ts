export const SECTORS = [
  { id: 'retail', label: 'Retail & Wholesale', icon: 'ShoppingBag' },
  { id: 'forex', label: 'Forex Bureaus', icon: 'Landmark' },
  { id: 'realestate', label: 'Property & Stalls', icon: 'Home' },
  { id: 'transport', label: 'Logistics/Mbeba', icon: 'Truck' },
  { id: 'hotel', label: 'Hotels & Lodging', icon: 'Bed' },
  { id: 'hospital', label: 'Hospitals/Clinics', icon: 'HeartPulse' },
] as const;

export const EASTLEIGH_MALLS = [
  { name: "BBS Mall (Business Bay Square)", gps: "https://maps.app.goo.gl/yV9nLp9x8XG7X7W7" },
  { name: "Amal Mall", gps: "https://maps.app.goo.gl/AmalMallLink" },
  { name: "Yusuf Haji Mall", gps: "https://maps.app.goo.gl/YusufHajiLink" },
  { name: "Garissa Lodge", gps: "https://maps.app.goo.gl/GarissaLodgeLink" },
  { name: "Sunrise Shopping Hall", gps: "https://maps.app.goo.gl/SunriseLink" },
  { name: "Olympic Mall", gps: "" },
  { name: "Bangkok Mall", gps: "" },
  { name: "Kilimanjaro Mall", gps: "" },
  { name: "Madina Mall", gps: "" },
  { name: "Hong Kong Mall", gps: "" },
  { name: "United Mall", gps: "" },
  { name: "Dubai Mansion", gps: "" },
  { name: "Al-Mubarak Mall", gps: "" },
  { name: "Beijing Shopping Mall", gps: "" },
  { name: "Iftin Mall", gps: "" },
  { name: "Star Mall", gps: "" },
  { name: "Grand Corner", gps: "" },
  { name: "Jamia Mall (Eastleigh)", gps: "" },
  { name: "Yare Plaza", gps: "" },
  { name: "Moonlight Mall", gps: "" },
  { name: "Hodan Plaza", gps: "" },
  { name: "Premier Mall", gps: "" },
  { name: "First Avenue Mall", gps: "" },
  { name: "CityMark Shopping Centre", gps: "" },
  { name: "Darul Salam Centre", gps: "" },
  { name: "Somane Plaza", gps: "" },
  { name: "Taqwa Mall", gps: "" },
  { name: "Dayah Plaza", gps: "" },
  { name: "Istanbul Mall", gps: "" },
  { name: "General Shopping Mall", gps: "" },
  { name: "Al-Amin Plaza", gps: "" },
  { name: "Nomad Hotel Mall", gps: "" },
  { name: "Other / Street Shop", gps: "" }
];

export const PRODUCT_SUGGESTIONS: Record<string, string[]> = {
  retail: [
    "Turkish Suits (Men)", "Turkish Suits (Women)", "Diraas (Somali Dress)", "Abayas (Premium)", 
    "Official Shirts", "Men's Blazers", "Kids Wear (Sets)", "Baby Shawls", 
    "Leather Shoes (Turkish)", "Designer Sneakers", "Oud Perfumes", 
    "Uunsi / Bakhoor", "Textile Bales (Cotton)", "Textile Bales (Silk)", "Curtain Fabrics", 
    "Bedding Sets", "Duvets (Wholesale)", "Persian Rugs", "Mobile Phones", 
    "Solar Panels", "Solar Inverters", "CCTV Camera Kits", "Kitchenware", "Hijabs (Wholesale)"
  ],
  realestate: [
    "Commercial Stall (Ground Floor)", "Commercial Stall (Upper Floor)", "Basement Store", 
    "Corner Stall (Prime)", "Office Space", "Warehouse / Godown", "Bedsitter / Studio", 
    "1 Bedroom Apartment", "2 Bedroom Apartment", "3 Bedroom Apartment"
  ],
  transport: [
    "Garissa Route", "Wajir Route", "Mandera Route", "Mogadishu Route", 
    "Hargeisa Route", "Mombasa Route", "Small Parcel Delivery", "Bulk Cargo Trucking"
  ],
  hotel: ["Single Room", "Double Room", "Executive Suite", "Family Suite", "Conference Hall"],
  hospital: ["General Consultation", "Dental Clinic", "Optical / Eye Checkup", "Laboratory", "Pharmacy", "Maternity"]
};
