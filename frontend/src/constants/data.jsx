import React from "react";
import { 
  Award, Users, Globe, ShieldCheck, MapPin, 
  Car, Plane, Map, Briefcase, Sparkles, Navigation, 
  Facebook, Instagram, Twitter, Youtube,
  Phone, Star, Calendar, Mail, Send, MessageCircle, Clock,
  Target, Eye, Quote, ChevronRight, CheckCircle2, Smartphone,
  TrendingUp, Handshake, Building2, Battery
} from "lucide-react";

// ==========================
// Image Assets Imports
// ==========================
import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.webp';
import img4 from '../assets/img4.webp';

// ==========================
// Theme Colors
// ==========================
export const themeColors = {
  blue: "#31468e",
  yellow: "#f2ca1c",
};

// ==========================
// 1. Header Nav Links
// ==========================
export const navLinks = ["about", "destinations", "services", "contact"];

// ==========================
// 2. Destinations Data (Landing Page Cards)
// ==========================
export const destinationsData = [
  { id: 1, name: "Jaisalmer", location: "Rajasthan", rating: 4.9, image: img1, price: "₹4,500", tag: "Royal Heritage" },
  { id: 2, name: "Golden Temple", location: "Amritsar", rating: 5.0, image: img2, price: "₹3,200", tag: "Spiritual Hub" },
  { id: 3, name: "Mount Abu", location: "Rajasthan", rating: 4.8, image: img3, price: "₹3,800", tag: "Hill Station" },
  { id: 4, name: "Sunny Goa", location: "Goa", rating: 4.7, image: img4, price: "₹8,500", tag: "Beach Paradise" },
  { id: 5, name: "Dwarka", location: "Gujarat", rating: 4.9, image: img1, price: "₹4,000", tag: "Divine Coast" },
  { id: 6, name: "Udaipur", location: "Rajasthan", rating: 4.9, image: img2, price: "₹4,200", tag: "City of Lakes" },
];

// ==========================
// 3. About Section Data (Landing Page)
// ==========================
export const aboutStats = [
  { label: "Years of Excellence", value: "12+", icon: Award },
  { label: "Happy Travelers", value: "75k+", icon: Users },
  { label: "Destinations Covered", value: "150+", icon: Globe },
  { label: "Safety Verified", value: "100%", icon: ShieldCheck },
];

export const aboutValues = [
  { title: "Premium Comfort", description: "Experience luxury with our meticulously maintained fleet, featuring plush interiors and climate control for a relaxing journey." },
  { title: "Elite Reliability", description: "Our chauffeurs are vetted for safety and punctuality, ensuring you reach your destination on time, ogni volta." },
];

// ==========================
// 4. Services Data (Landing Page)
// ==========================
export const servicesData = [
  { title: "Premium City Rides", image: img1, icon: Car, description: "Door-to-door luxury within the city." },
  { title: "Elite Airport Transfers", image: img2, icon: Plane, description: "Punctual pickups with meet-and-greet." },
  { title: "Intercity Expeditions", image: img3, icon: Map, description: "Comfortable long-distance journeys." },
  { title: "Corporate Mobility", image: img3, icon: Briefcase, description: "Specialized fleet for business needs." },
  { title: "Luxury Wedding Rentals", image: img4, icon: Sparkles, description: "Make your special day more elegant." },
  { title: "Elite Heritage Tours", image: img1, icon: ShieldCheck, description: "Curated cultural experiences." },
];

// ==========================
// 5. Cab Booking Data
// ==========================
export const bookingTabs = ["Outstation", "Local / Airport"];

export const outstationOptions = [
  { title: "Round Trip", subtitle: "Perfect for return journeys with comfort and flexibility.", icon: <Map className="text-xl" /> },
  { title: "One Way Trip", subtitle: "Ideal for single route travel with transparent pricing.", icon: <Navigation className="text-xl" /> },
];

export const localOptions = [
  { title: "Local Rental", subtitle: "Flexible hours for city rides, meetings, and day travel.", icon: <Car className="text-xl" /> },
  { title: "Airport Transfer", subtitle: "Smooth airport pickups and drop-offs with reliable service.", icon: <Plane className="text-xl" /> },
];

// ==========================
// 6. Gallery Data
// ==========================
export const galleryImages = [
  { id: 1, src: img1, title: "Golden Sands", category: "Nature" },
  { id: 2, src: img2, title: "Ancient Spirits", category: "Heritage" },
  { id: 3, src: img3, title: "Open Roads", category: "Adventure" },
  { id: 4, src: img4, title: "Solo Explorer", category: "Personal" },
  { id: 5, src: img1, title: "Temple Peace", category: "Heritage" },
  { id: 6, src: img2, title: "Smart City", category: "Business" },
  { id: 7, src: img3, title: "Travel High", category: "Airport" },
  { id: 8, src: img4, title: "Premium Service", category: "Luxury" },
];

// ==========================
// 7. Popular Search Data
// ==========================
export const popularCities = [
  "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Ajmer",
  "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Dwarka", "Somnath",
  "Mumbai", "Pune", "Nashik", "Nagpur", "Mahabaleshwar", "Lonavala",
  "Agra", "Varanasi", "Lucknow", "Ayodhya", "Mathura", "Prayagraj"
];

export const popularAttractions = [
  "Hawa Mahal", "City Palace Udaipur", "Amer Fort", "Mehrangarh Fort", "Jaisalmer Sam Dunes",
  "Statue of Unity", "Somnath Temple", "Gir National Park", "Rann of Kutch", "Sabarmati Ashram",
  "Gateway of India", "Marine Drive", "Elephanta Caves", "Siddhi Vinayak", "Ajanta Ellora",
  "Taj Mahal", "Kashi Vishwanath", "Bara Imambara", "Sangam Prayagraj", "Prem Mandir Vrindavan"
];

// ==========================
// 8. Footer Data
// ==========================
export const footerQuickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Destinations", href: "/destinations" },
  { name: "Our Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const footerSocialLinks = [
  { icon: Facebook, href: "#", color: "hover:text-[#31468e]" },
  { icon: Instagram, href: "#", color: "hover:text-pink-500" },
  { icon: Twitter, href: "#", color: "hover:text-sky-400" },
  { icon: Youtube, href: "#", color: "hover:text-red-500" },
];

// ==========================
// 9. Home / Landing Hero Data
// ==========================
export const homeHeroData = {
  badge: "India's Premier Mobility Partner",
  titleHtml: "Your Journey, <br /> <span class='text-[#f2ca1c]'>Elevated</span> Perfectly.",
  description: "Experience the pinnacle of road travel with GhoomWay. Whether it's a cross-country expedition or a swift airport transfer, we deliver unmatched comfort, safety, and elite professionalism.",
};

// ==========================
// 10. Features Section Data
// ==========================
export const featuresListData = [
  { 
    icon: Phone, 
    title: "24/7 Customer Support", 
    description: "Our dedicated team is available around the clock to assist you with bookings, changes, or any queries you may have during your journey." 
  },
  { 
    icon: Award, 
    title: "Earn Exclusive Rewards", 
    description: "Join our loyalty program and earn points on every booking. Redeem them for discounts, upgrades, and special travel offers." 
  },
  { 
    icon: Star, 
    title: "Trusted by Millions", 
    description: "With a decade of excellence, we've served millions of happy travelers across India, maintaining the highest safety and quality standards." 
  },
  { 
    icon: Calendar, 
    title: "Flexible Booking Options", 
    description: "Change or cancel your plans with ease. We offer various booking types including round trips, one-way, and local rentals to suit your needs." 
  },
];

export const featuresHeaderData = {
  badge: "Premium Travel Experience",
  titleHtml: "Why travelers choose <br />\n<span class=\"relative inline-block text-[#f2ca1c]\">\n  GhoomWay\n  <span class=\"absolute bottom-2 left-0 w-full h-1.5 bg-[#f2ca1c]/30 rounded-full\"></span>\n</span>",
  quote: "\"Designed with elegance, reliability, and trust at its core, GhoomWay delivers a premium booking experience for every traveler.\""
};

// ==========================
// 11. Contact Partner / CTA Data
// ==========================
export const partnerContactInfo = [
  {
    title: "Call Us",
    value: "+91 98765 43210",
    description: "Available for urgent inquiries",
    icon: Phone,
  },
  {
    title: "Email Us",
    value: "partners@ghoomway.com",
    description: "Quick response within 24 hours",
    icon: Mail,
  },
  {
    title: "Visit Us",
    value: "123 Travel Hub, Sector 45, Gurugram, India",
    description: "Monday - Friday, 10 AM - 6 PM",
    icon: MapPin,
  },
];

export const supportHoursData = {
  title: "Official Support Hours",
  descriptionHtml: "Our dedicated partner support team is available <span class=\"font-bold text-indigo-600\">Monday through Friday, 10:00 AM to 8:00 PM IST</span>. For urgent matters outside these hours, please use the contact number provided above."
};

// ==========================
// 12. About Inner Page Data
// ==========================
export const aboutPageHero = {
  badge: "Our Journey",
  titleHtml: "Moving India, <br/>\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#f2ca1c] to-[#fceb9e]\">One Journey</span> At A Time.",
  description: "We are not just a mobility company; we are your reliable travel partner bringing trust, safety, and uncompromising luxury to the Indian roads."
};

export const trustPillars = [
  { icon: ShieldCheck, title: "Stringent Vetting", desc: "Every driver undergoes a comprehensive 4-step background check and behavioral training." },
  { icon: Award, title: "Maintained Fleet", desc: "Our vehicles are serviced every 5,000 kms to ensure zero breakdowns and maximum comfort." },
  { icon: CheckCircle2, title: "Transparent Billing", desc: "No hidden toll surprises, no surge pricing traps. We bill exactly what we quote." },
  { icon: Globe, title: "Tech-Driven Safety", desc: "Live GPS tracking, SOS buttons, and a dedicated 24/7 command center monitoring every ride." }
];

export const leadershipTeam = [
  { img: img3, name: "Aman Sharma", title: "Founder & CEO", desc: "15 years in logistics and premium mobility operations." },
  { img: img4, name: "Divya Kapoor", title: "Chief Operations Officer", desc: "Spearheads fleet management and driver standardizations." },
  { img: img1, name: "Rajiv Mehta", title: "Head of Technology", desc: "Architects our live tracking and routing algorithms." }
];

// ==========================
// 13. Services Inner Page Data
// ==========================
export const servicesPageHero = {
  badgeIcon: Building2,
  badge: "B2B & B2C Solutions",
  titleHtml: "Bespoke <span class=\"text-[#f2ca1c]\">Mobility</span> Architecture",
  description: "Whether you need an airport transfer at 3 AM or a dedicated fleet for an international conference, we engineer the perfect travel solution."
};

export const outstationServiceFeatures = [
  "Clear per-km pricing with no hidden toll adjustments later.",
  "Option to retain the cab for local sightseeing at the destination.",
  "Drivers trained in highway safety and emergency protocols."
];

export const airportServiceFeatures = [
  "Live flight tracking integration.",
  "Complimentary 45-minute wait time for domestic arrivals.",
  "Meet-and-greet services available involving placard pickups."
];

export const corporateMobilityFeatures = [
  { title: "Centralized Billing", desc: "Monthly post-paid accounts with detailed MIS reporting and GST compliance." },
  { title: "Dedicated Account", desc: "A single point of contact for bulk bookings and instant issue resolution." },
  { title: "GPS API", desc: "Integrate our live tracking directly into your corporate security dashboard." },
  { title: "Protocol", desc: "Drivers trained specifically in non-disclosure and VIP escort etiquette." }
];

export const fleetList = [
  { class: "Sedan", models: "Dzire, Etios, Amaze", img: img3, seats: "4 Passengers", bags: "2 Large Bags", ideal: "Quick City Rides" },
  { class: "Executive SUV", models: "Innova, Ertiga", img: img4, seats: "6 Passengers", bags: "4 Large Bags", ideal: "Family Trips" },
  { class: "Premium Luxury", models: "Fortuner, Camry", img: img1, seats: "4-6 Passengers", bags: "3 Large Bags", ideal: "VIP Transport" },
];

// ==========================
// 14. Destinations Inner Page Data
// ==========================
export const destinationsPageHero = {
  badgeIcon: Navigation,
  badge: "Curated Travel Experiences",
  titleHtml: "Journeys <span class=\"text-[#f2ca1c]\">Crafted</span> For the Soul.",
  description: "India is not just a place on a map; it's an experience. We provide the wheels, the expertise, and the safety to help you chart your own course."
};

export const featuredRoutes = [
  {
    id: 1,
    title: "The Royal Rajasthan Circuit",
    route: "Jaipur → Jodhpur → Udaipur",
    duration: "7 Days / 6 Nights",
    distance: "1,200 km",
    image: img1,
    price: "₹24,999",
    highlights: ["Fort & Palace Tours", "Desert Safari", "Lake Pichola Boating"]
  },
  {
    id: 2,
    title: "Spiritual North India",
    route: "Delhi → Haridwar → Rishikesh",
    duration: "4 Days / 3 Nights",
    distance: "550 km",
    image: img2,
    price: "₹12,499",
    highlights: ["Ganga Aarti", "Yoga Sessions", "Mountain Viewpoint"]
  },
  {
    id: 3,
    title: "Konkan Coastal Drive",
    route: "Mumbai → Alibaug → Goa",
    duration: "5 Days / 4 Nights",
    distance: "600 km",
    image: img4,
    price: "₹18,999",
    highlights: ["Beach Hopping", "Seafood Trail", "Fort Aguada Visit"]
  }
];

// ==========================
// 15. Contact Inner Page Data
// ==========================
export const contactPageHero = {
  titleHtml: "Get In <span class=\"text-[#f2ca1c]\">Touch</span>",
  description: "Whether you're planning a trip or looking to join our growing fleet, we're here for you."
};

export const directContactDetails = [
  {
    title: "Bookings & Support",
    primary: "+91 98765 43210",
    secondary: "Partner Helpline: +91 99887 76655",
    icon: Phone
  },
  {
    title: "Email Addresses",
    primary: "bookings@ghoomway.com",
    secondary: "partners@ghoomway.com",
    icon: Mail
  },
  {
    title: "Head Office",
    primary: "123 Travel Hub, Sector 45, Gurugram, Haryana, 122003, India",
    secondary: "",
    icon: MapPin
  }
];

export const partnerOnboardingBenefits = [
  { title: "Guaranteed High Earnings", desc: "Consistent intercity and corporate bookings straight from our premium clients without middlemen.", icon: TrendingUp },
  { title: "Verified Passengers", desc: "Safety is two-way. Drive for 100% verified corporate executives, tourists, and families.", icon: ShieldCheck },
  { title: "Transparent Payouts", desc: "No hidden fees, no delayed clearance. Exact settlements processed securely on a weekly basis.", icon: Handshake }
];
