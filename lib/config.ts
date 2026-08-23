// Central site configuration. Non-secret, safe for client use.
export const siteConfig = {
  name: 'Vinayaga Engineering Works',
  tagline: 'Built Strong. Crafted Right.',
  description:
    'Vinayaga Engineering Works provides industrial, commercial and residential fabrication solutions in Coimbatore and nearby districts. 10+ years of experience and 500+ completed projects.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vinayagaengineeringworks.com',
  address: {
    line1: 'Kavundampalayam',
    city: 'Coimbatore',
    postalCode: '641030',
    state: 'Tamil Nadu',
    country: 'India',
  },
  phones: ['+919943416345', '+919843640678'],
  phonesDisplay: ['+91 99434 16345', '+91 98436 40678'],
  whatsappNumber: '919943416345',
  email: 'vinayagaengineeringworks7787@gmail.com',
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  },
  maps: {
    url:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      'https://maps.google.com/?q=Kavundampalayam,Coimbatore,Tamil+Nadu+641030',
    embedUrl:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
      'https://www.google.com/maps?q=Kavundampalayam,Coimbatore,Tamil+Nadu+641030&output=embed',
  },
  stats: {
    years: '10+',
    projects: '500+',
  },
};

export const telHref = (phone: string) => `tel:${phone}`;
export const mailHref = () => `mailto:${siteConfig.email}`;
export const whatsappHref = (message?: string) => {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Contact', href: '/contact' },
];

export type ServiceCategoryDef = {
  slug: string;
  name: string;
  description: string;
  items: string[];
};

// The 5 service / gallery categories. slug must match gallery_categories.slug in Supabase.
export const serviceCategories: ServiceCategoryDef[] = [
  {
    slug: 'industrial-structural',
    name: 'Industrial & Structural',
    description:
      'Industrial sheds, roofing sheds, structural steel fabrication and machine frames built for strength and long-term reliability.',
    items: ['Industrial sheds', 'Roofing sheds', 'Structural steel fabrication', 'Machine frames'],
  },
  {
    slug: 'residential-architectural',
    name: 'Residential & Architectural',
    description:
      'Pergolas, rooftop sit-outs, staircases, railings, gates and grills fabricated with a clean, architectural finish.',
    items: ['Pergolas', 'Rooftop sit-outs', 'Staircases', 'Railings', 'Gates', 'Grills'],
  },
  {
    slug: 'custom-fabrication',
    name: 'Custom Fabrication',
    description:
      'Custom and special fabrication projects engineered around your exact requirement and site conditions.',
    items: ['Custom fabrication', 'Special fabrication projects'],
  },
  {
    slug: 'ms-ss-gi-fabrication',
    name: 'MS / SS / GI Fabrication',
    description:
      'Precision fabrication in Mild Steel, Stainless Steel and GI, matched to the right material for every application.',
    items: ['MS fabrication', 'SS fabrication', 'GI fabrication'],
  },
  {
    slug: 'installation-erection',
    name: 'Installation & Erection',
    description:
      'On-site installation and erection carried out by experienced teams, delivering completed, ready-to-use structures.',
    items: ['Installation', 'On-site erection', 'Completed structures'],
  },
];

export const whyChooseUs = [
  '10+ Years Experience',
  '500+ Projects Completed',
  'Skilled Fabricators & Welders',
  'Quality Materials',
  'Custom Fabrication',
  'Precise Measurements',
  'Strong & Durable Workmanship',
  'On-Site Installation',
  'Reliable Completion',
];
