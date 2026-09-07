const placeholderImage = "/doctor-1.jpg";

export const CLINIC = {
  name: "Super Dental",
  tagline: "India's most-loved dental care",
  phone: "+91 9318334954",
  whatsapp: "+91 9318334954",
  email: "info@businesskiduniya.in",
  emergency: "+91 9318334954",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/treatments", label: "Treatments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/clinics", label: "Clinics" },
  { to: "/gallery", label: "Smile Gallery" },
  { to: "/testimonials", label: "Stories" },
  { to: "/offers", label: "Offers" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export const STATS = [
  { value: 10000, suffix: "+", label: "Happy Patients" },
  { value: 50, suffix: "+", label: "Expert Dentists" },
  { value: 20, suffix: "+", label: "Years of Care" },
  { value: 15, suffix: "+", label: "Premium Clinics" },
];

export const TREATMENTS = [
  { slug: "dental-implants", name: "Dental Implants", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Permanent, natural-looking replacements crafted to last a lifetime.", icon: "Sparkles" },
  { slug: "root-canal", name: "Root Canal", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Single-sitting, microscope-guided RCT with zero discomfort.", icon: "Activity" },
  { slug: "braces", name: "Braces", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Metal, ceramic and lingual braces from world-class brands.", icon: "AlignJustify" },
  { slug: "aligners", name: "Invisible Aligners", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Crystal-clear aligners. Eat, drink and smile, uninterrupted.", icon: "Smile" },
  { slug: "teeth-whitening", name: "Teeth Whitening", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "8 shades brighter in 60 minutes with Zoom laser whitening.", icon: "Sun" },
  { slug: "smile-makeover", name: "Smile Makeover", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Custom digital smile design — preview your smile before treatment.", icon: "Wand2" },
  { slug: "crowns", name: "Crowns & Veneers", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Zirconia and E-Max veneers handcrafted for a flawless finish.", icon: "Crown" },
  { slug: "kids-dentistry", name: "Kids Dentistry", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Gentle, playful care for tiny teeth in a kid-friendly setting.", icon: "Baby" },
  { slug: "gum-treatment", name: "Gum Treatment", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Laser periodontal therapy for healthier, pain-free gums.", icon: "Heart" },
  { slug: "oral-surgery", name: "Oral Surgery", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Advanced surgical care including wisdom-tooth removal.", icon: "Scissors" },
  { slug: "scaling", name: "Cleaning & Scaling", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Ultrasonic deep cleaning for fresh, polished, healthy teeth.", icon: "Droplets" },
  { slug: "emergency", name: "Emergency Dentistry", beforeTreatment: "/gallery/before-treatment-1.jpg", afterTreatment: "/gallery/after-treatment-1.jpg", blurb: "Walk-in care for sudden pain, trauma and lost crowns.", icon: "Siren" },
] as const;

export const WHY_US = [
  { title: "Modern Equipment", text: "Digital X-rays, CBCT, intra-oral cameras and microscopes.", icon: "Cpu" },
  { title: "Pain-Free Care", text: "Topical numbing and painless injection protocols.", icon: "ShieldCheck" },
  { title: "Expert Specialists", text: "Each treatment by a board-certified specialist.", icon: "GraduationCap" },
  { title: "Sterile Environment", text: "AAID-grade sterilization with audit logs.", icon: "Sparkles" },
  { title: "Transparent Pricing", text: "Itemised estimates. Zero hidden charges. EMI from 0%.", icon: "Wallet" },
  { title: "Same-Day Appointments", text: "Walk-in slots and 24x7 emergency support.", icon: "CalendarClock" },
];

export const DOCTORS = [
  { slug: "ananya-rao", name: "Dr. Ananya Rao", image: placeholderImage, specialty: "Cosmetic & Implant Surgeon", qualification: "BDS, MDS (Prosthodontics)", experience: 12, languages: ["English", "Hindi", "Telugu"], city: "Bengaluru" },
  { slug: "arjun-mehta", name: "Dr. Arjun Mehta", image: placeholderImage, specialty: "Endodontist & Microscopic RCT", qualification: "BDS, MDS (Endodontics)", experience: 15, languages: ["English", "Hindi", "Gujarati"], city: "Mumbai" },
  { slug: "isha-kapoor", name: "Dr. Isha Kapoor", image: placeholderImage, specialty: "Orthodontist & Aligner Specialist", qualification: "BDS, MDS (Orthodontics)", experience: 10, languages: ["English", "Hindi", "Punjabi"], city: "Delhi" },
  { slug: "vikram-iyer", name: "Dr. Vikram Iyer", image: placeholderImage, specialty: "Oral & Maxillofacial Surgeon", qualification: "BDS, MDS, FICOI", experience: 18, languages: ["English", "Tamil", "Hindi"], city: "Chennai" },
  { slug: "neha-shah", name: "Dr. Neha Shah", image: placeholderImage, specialty: "Pediatric Dentist", qualification: "BDS, MDS (Pedodontics)", experience: 9, languages: ["English", "Hindi", "Marathi"], city: "Pune" },
  { slug: "rahul-verma", name: "Dr. Rahul Verma", image: placeholderImage, specialty: "Periodontist & Gum Specialist", qualification: "BDS, MDS (Periodontics)", experience: 14, languages: ["English", "Hindi"], city: "Hyderabad" },
];

export const CLINICS = [
  { slug: "bengaluru-indiranagar", city: "Bengaluru", area: "Indiranagar", address: "100 Ft Road, Indiranagar, Bengaluru — 560038", phone: "+91 80 4567 1001", hours: "9:00 AM – 9:00 PM" },
  { slug: "mumbai-bandra", city: "Mumbai", area: "Bandra West", address: "Linking Road, Bandra West, Mumbai — 400050", phone: "+91 22 4567 1002", hours: "9:00 AM – 9:30 PM" },
  { slug: "delhi-saket", city: "Delhi", area: "Saket", address: "Select Citywalk Lane, Saket, New Delhi — 110017", phone: "+91 11 4567 1003", hours: "9:00 AM – 9:00 PM" },
  { slug: "chennai-anna-nagar", city: "Chennai", area: "Anna Nagar", address: "2nd Ave, Anna Nagar, Chennai — 600040", phone: "+91 44 4567 1004", hours: "9:00 AM – 9:00 PM" },
  { slug: "pune-koregaon-park", city: "Pune", area: "Koregaon Park", address: "North Main Rd, Koregaon Park, Pune — 411001", phone: "+91 20 4567 1005", hours: "9:00 AM – 9:00 PM" },
  { slug: "hyderabad-jubilee", city: "Hyderabad", area: "Jubilee Hills", address: "Road No. 36, Jubilee Hills, Hyderabad — 500033", phone: "+91 40 4567 1006", hours: "9:00 AM – 9:00 PM" },
];

export const TESTIMONIALS = [
  { name: "Priya S.", city: "Bengaluru", rating: 5, text: "Got my aligners done at Lumière. Dr. Isha walked me through every step. My smile is everything I hoped for." },
  { name: "Karthik R.", city: "Chennai", rating: 5, text: "Single-sitting root canal. I expected pain — I felt nothing. The microscope makes a real difference." },
  { name: "Meera J.", city: "Mumbai", rating: 5, text: "Brought my 4-year-old. The team turned a scary visit into playtime. We'll never go anywhere else." },
  { name: "Aditya N.", city: "Delhi", rating: 5, text: "Two implants, both perfect. Transparent quote, EMI on the spot, and follow-ups that actually feel personal." },
  { name: "Sneha P.", city: "Pune", rating: 5, text: "Whitening + cleaning in one visit. My teeth haven't looked this good since college." },
  { name: "Rohan K.", city: "Hyderabad", rating: 5, text: "Wisdom tooth removal, zero stitches, recovered in two days. Genuinely impressed." },
];

export const OFFERS = [
  { title: "New Patient Check-Up", price: "₹199", original: "₹999", desc: "Full oral exam, digital X-ray and a personalised treatment plan.", tag: "First visit" },
  { title: "Smile Brightening", price: "₹4,999", original: "₹9,999", desc: "Professional Zoom whitening + polishing in a single sitting.", tag: "Limited" },
  { title: "Aligner Starter", price: "₹15,000 off", original: "On full plan", desc: "Save on Invisalign and ClearPath aligner treatments this season.", tag: "Popular" },
  { title: "Family Annual Plan", price: "₹4,999/yr", original: "₹12,000", desc: "Two cleanings + two check-ups + 20% off all treatments for up to 4 members.", tag: "Best value" },
  { title: "Corporate Wellness", price: "Custom", original: "—", desc: "On-site dental camps and discounted plans for your team.", tag: "Business" },
  { title: "Senior Citizen Care", price: "25% off", original: "All treatments", desc: "Dedicated care plans and gentle treatment for ages 60+.", tag: "Care" },
];

export const FAQS = [
  { q: "Is the first consultation really free?", a: "Yes. Your first consultation, oral examination and personalised treatment plan are complimentary at every Lumière clinic." },
  { q: "Do you offer EMI on treatments?", a: "We offer no-cost EMI for 3, 6, 9 and 12 months on treatments above ₹10,000 via partner banks and cards." },
  { q: "Are treatments really pain-free?", a: "We use topical anaesthetics, painless injection systems and the latest microscope and laser equipment so most procedures are virtually pain-free." },
  { q: "What about sterilisation safety?", a: "Every instrument is autoclaved at 134°C and sterilisation logs are audited weekly. All single-use items are disposed of after one patient." },
  { q: "Do you accept insurance?", a: "Yes — we are empanelled with most leading insurance providers. Bring your insurance card and we'll handle the paperwork." },
  { q: "How quickly can I get an appointment?", a: "Same-day appointments are available at most clinics. For emergencies, walk in any time — we keep slots reserved every day." },
];

export const BLOGS = [
  { slug: "5-signs-you-need-rct", title: "5 signs you might need a root canal", image: "/blog-1.jpg", excerpt: "Sharp pain when you bite? A dark tooth? Here's what your symptoms could mean.", category: "Dental Tips", read: "4 min" },
  { slug: "aligners-vs-braces", title: "Aligners vs braces — which is right for you?", image: "/aligner-vs-braces.jpeg", excerpt: "We break down cost, comfort, speed and lifestyle fit for both options.", category: "Orthodontics", read: "6 min" },
  { slug: "kids-first-dentist-visit", title: "Your child's first dentist visit: the parent guide", image: "/first-visit.jpeg", excerpt: "From age to expectations — how to make the first visit a happy one.", category: "Kids Dentistry", read: "5 min" },
  { slug: "implants-explained", title: "Dental implants, explained simply", image: "/blog-1.jpg", excerpt: "What they are, how long they last, and why they feel like real teeth.", category: "Implants", read: "7 min" },
  { slug: "veneers-vs-whitening", title: "Veneers vs whitening — what really lasts?", image: "/blog-1.jpg", excerpt: "The cosmetic dentistry decision most people get wrong, and how to choose.", category: "Cosmetic Dentistry", read: "5 min" },
  { slug: "gum-bleeding-causes", title: "Why your gums bleed — and when to worry", image: "/blog-1.jpg", excerpt: "Occasional bleeding is normal; chronic bleeding isn't. Here's the line.", category: "Dental Tips", read: "4 min" },
];

export const BLOG_CATEGORIES = ["All", "Dental Tips", "Kids Dentistry", "Cosmetic Dentistry", "Implants", "Orthodontics"];

export const PARTNERS = ["3M", "Nobel Biocare", "Straumann", "Dentsply Sirona", "Invisalign", "Colgate", "GC Asia", "Ivoclar"];

export const TIMELINE = [
  { year: "2005", title: "First clinic opens in Bengaluru", text: "A single-chair practice with one promise — honest, pain-free care." },
  { year: "2011", title: "5 clinics, 25 specialists", text: "Lumière becomes one of South India's most-recommended dental chains." },
  { year: "2017", title: "Digital-first transformation", text: "Intra-oral scanners, CBCT and digital smile design rolled out chain-wide." },
  { year: "2021", title: "Award for clinical excellence", text: "Recognised by IDA for sterilisation and outcome standards." },
  { year: "2024", title: "15 clinics, 50+ specialists", text: "Serving 10,000+ patients a year across 6 cities in India." },
];
