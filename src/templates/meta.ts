export type TemplateMeta = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  componentKey: string;
};

export const TEMPLATE_METAS: TemplateMeta[] = [
  {
    id: "cafe",
    name: "Warm Hearth Cafe",
    category: "Cafe / Bakery",
    description: "Cozy serif typography with cream tones for cafes and bakeries.",
    thumbnail: "/templates/cafe.svg",
    componentKey: "cafe",
  },
  {
    id: "salon",
    name: "Luxe Salon",
    category: "Salon / Spa",
    description: "Elegant dark neutrals and soft gold accents for beauty brands.",
    thumbnail: "/templates/salon.svg",
    componentKey: "salon",
  },
  {
    id: "trades",
    name: "Solid Trades",
    category: "Plumber / Trades",
    description: "Bold, trustworthy layout for plumbers, electricians, and trades.",
    thumbnail: "/templates/trades.svg",
    componentKey: "trades",
  },
  {
    id: "consulting",
    name: "Clear Counsel",
    category: "Law / Consulting",
    description: "Clean professional layout for lawyers and consultants.",
    thumbnail: "/templates/consulting.svg",
    componentKey: "consulting",
  },
  {
    id: "fitness",
    name: "Pulse Studio",
    category: "Fitness",
    description: "High-energy athletic design for gyms and studios.",
    thumbnail: "/templates/fitness.svg",
    componentKey: "fitness",
  },
  {
    id: "photography",
    name: "Frame & Light",
    category: "Photography",
    description: "Minimal gallery-forward layout for photographers.",
    thumbnail: "/templates/photography.svg",
    componentKey: "photography",
  },
  {
    id: "realestate",
    name: "Harbor Homes",
    category: "Real Estate",
    description: "Polished property-focused design for agents and brokerages.",
    thumbnail: "/templates/realestate.svg",
    componentKey: "realestate",
  },
  {
    id: "tutoring",
    name: "Bright Path",
    category: "Tutoring / Education",
    description: "Friendly academic look for tutors and learning centers.",
    thumbnail: "/templates/tutoring.svg",
    componentKey: "tutoring",
  },
  {
    id: "clinic",
    name: "Care Clinic",
    category: "Clinic / Healthcare",
    description: "Calm, reassuring design for clinics and wellness practices.",
    thumbnail: "/templates/clinic.svg",
    componentKey: "clinic",
  },
  {
    id: "retail",
    name: "Corner Boutique",
    category: "Retail",
    description: "Stylish boutique layout for shops and makers.",
    thumbnail: "/templates/retail.svg",
    componentKey: "retail",
  },
  {
    id: "landscaping",
    name: "Green Acre",
    category: "Landscaping",
    description: "Outdoor-inspired greens for landscapers and gardeners.",
    thumbnail: "/templates/landscaping.svg",
    componentKey: "landscaping",
  },
  {
    id: "autorepair",
    name: "Gear Garage",
    category: "Auto Repair",
    description: "Industrial, reliable look for auto shops and mechanics.",
    thumbnail: "/templates/autorepair.svg",
    componentKey: "autorepair",
  },
];
