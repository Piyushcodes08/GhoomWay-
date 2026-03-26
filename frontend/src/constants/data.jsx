import React from "react";
import { 
  Award, Users, Globe, ShieldCheck, MapPin, 
  Car, Plane, Map, Briefcase, Sparkles, Navigation, 
  Facebook, Instagram, Twitter, Youtube
} from "lucide-react";

// ==========================
// Image Assets Imports
// ==========================
import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.webp';
import img4 from '../assets/img4.webp';
// import img1 from "./assets/img1.webp";
// import img2 from "./assets/img2.webp";
// import img3 from "./assets/img3.webp";
// import img4 from "./assets/img4.webp";
// import img1 from "./assets/img1.webp";
// import img2 from "./assets/img2.webp";
// import img3 from "./assets/img3.webp";
// import img4 from "./assets/img4.webp";

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
// 2. Destinations Data
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
// 3. About Section Data
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
  { title: "24/7 Concierge", description: "Dedicated support team available around the clock to handle your booking needs and real-time adjustments." },
];

// ==========================
// 4. Services Data
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
