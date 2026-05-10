import { useState, useEffect } from "react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  BadgeCheck,
  Clock,
  Users,
  BookOpen,
  Star,
  Loader2,
  X,
  Play,
  GraduationCap,
  Zap,
  Shield,
} from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type BookingModalProps = { onClose: () => void; defaultExperience?: string };

const BookingModal = ({ onClose, defaultExperience = "" }: BookingModalProps) => {
  const [form, setForm] = useState({
    school_name: "", contact_name: "", phone: "", email: "",
    students: "", date: "", experience: defaultExperience, message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form as Record<string, unknown>, EMAILJS_PUBLIC_KEY);
      setStatus("success");
    } catch (err: unknown) {
      const e = err as { text?: string; message?: string };
      setErrorMsg(e?.text || e?.message || JSON.stringify(err));
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-secondary-green focus:ring-2 focus:ring-secondary-green/20 transition-all";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary-navy rounded-t-3xl p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <BadgeCheck className="w-3 h-3" /> BOOK A VR SESSION
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Book Your School's VR Experience</h2>
          <p className="text-gray-300 text-sm mt-2">Fill in the details below and our team will contact you within 24 hours.</p>
        </div>
        <div className="p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary-green/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-secondary-green" />
              </div>
              <h3 className="text-xl font-bold text-primary-navy">Booking Request Sent!</h3>
              <p className="text-gray-500 max-w-sm">Thank you! Our team will reach out to you within 24 hours to confirm your slot.</p>
              <button onClick={onClose} className="mt-4 bg-secondary-green text-white px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">School Name *</label>
                  <input required className={inputClass} placeholder="e.g. Delhi Public School" value={form.school_name} onChange={set("school_name")} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contact Person *</label>
                  <input required className={inputClass} placeholder="Your full name" value={form.contact_name} onChange={set("contact_name")} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input required type="tel" className={inputClass} placeholder="+91 98000 00000" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                  <input required type="email" className={inputClass} placeholder="school@example.com" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Number of Students *</label>
                  <input required type="number" min="1" className={inputClass} placeholder="e.g. 120" value={form.students} onChange={set("students")} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Date *</label>
                  <input required type="date" className={inputClass} value={form.date} onChange={set("date")} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Choose Experience *</label>
                <select required className={inputClass} value={form.experience} onChange={set("experience")}>
                  <option value="">Select an experience</option>
                  <option value="Big Bang Theory">Big Bang Theory — 20 Min Journey</option>
                  <option value="Jurassic Era & Beyond">Jurassic Era &amp; Beyond — Popular Choice</option>
                  <option value="Both">Both Experiences</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Additional Message</label>
                <textarea rows={3} className={inputClass} placeholder="Any specific requirements or questions..." value={form.message} onChange={set("message")} />
              </div>
              {status === "error" && <p className="text-red-500 text-sm text-center">Error: {errorMsg || "Something went wrong."}</p>}
              <button type="submit" disabled={status === "sending"} className="w-full bg-secondary-green text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary-green/20 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Send Booking Request <ArrowRight className="w-4 h-4" /></>}
              </button>
              <p className="text-center text-xs text-gray-400">
                Or call us directly at <a href="tel:+919899157132" className="text-secondary-green font-bold">+91 98991 57132</a>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onBook }: { onBook: () => void }) => (
  <nav className="fixed top-0 left-0 w-full z-[100] glass-nav shadow-sm">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold font-display text-primary-navy">VRISE Global</Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">Home</Link>
        <Link to="/about" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">About Us</Link>
        <Link to="/shows" className="text-secondary-green font-bold border-b-2 border-secondary-green text-sm">Our Shows</Link>
        <Link to="/faq" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">FAQs</Link>
      </div>
      <button onClick={onBook} className="bg-secondary-green text-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-md">
        Book Now
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#001851] text-white pt-24 pb-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="space-y-6">
          <div className="text-3xl font-bold font-display">VRISE Global</div>
          <p className="text-gray-400 leading-relaxed">Experience Beyond Reality. India's premier VR education partner for modern schools.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-green transition-colors"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-green transition-colors"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-green transition-colors"><Twitter size={18} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="hover:text-secondary-green transition-all">Home</Link></li>
            <li><Link to="/about" className="hover:text-secondary-green transition-all">About Us</Link></li>
            <li><Link to="/shows" className="hover:text-secondary-green transition-all">Our Shows</Link></li>
            <li><Link to="/faq" className="hover:text-secondary-green transition-all">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Contact Detail</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3"><Phone className="text-secondary-green w-5 h-5" /> +91 98991 57132</li>
            <li className="flex items-center gap-3"><Mail className="text-secondary-green w-5 h-5" /> vriseglobal7@gmail.com</li>
            <li className="flex items-center gap-3"><MapPin className="text-secondary-green w-5 h-5" /> Gurugram, Haryana, India</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>© 2024 VRISE Global. Experience Beyond Reality.</p>
        <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><span>Crafted for Excellence in Education</span></div>
      </div>
    </div>
  </footer>
);

type Show = {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  duration: string;
  ageGroup: string;
  img: string;
  overview: string;
  journey: string[];
  curriculum: { subject: string; classes: string }[];
  highlights: { icon: React.ReactNode; text: string }[];
};

const shows: Show[] = [
  {
    id: "big-bang",
    title: "Big Bang Theory",
    tag: "20 MIN JOURNEY",
    tagColor: "bg-secondary-green",
    accentColor: "secondary-green",
    duration: "20 Minutes",
    ageGroup: "Class 4 – Class 10",
    img: `images/show-big-bang.jpeg`,
    overview: "Blast off on the most epic journey in history — from the very first moment the universe was born, all the way to humanity's greatest achievement: landing on the Moon. Students don't just learn about space; they live inside it.",
    journey: [
      "The Big Bang — witness the birth of the universe 13.8 billion years ago",
      "Formation of galaxies, stars, and our Solar System",
      "The birth of Earth and early life forms",
      "Rise of ancient human civilizations",
      "The Space Age — rockets, satellites, and the Moon Landing",
    ],
    curriculum: [
      { subject: "Science — Space & Universe", classes: "Class 6, 7, 8" },
      { subject: "Science — Solar System", classes: "Class 5, 6" },
      { subject: "History — Ancient Civilizations", classes: "Class 6" },
      { subject: "General Knowledge & Current Affairs", classes: "All Classes" },
    ],
    highlights: [
      { icon: <Clock className="w-5 h-5" />, text: "20-minute fully immersive session" },
      { icon: <Users className="w-5 h-5" />, text: "30–40 students per batch" },
      { icon: <GraduationCap className="w-5 h-5" />, text: "CBSE & ICSE curriculum aligned" },
      { icon: <Zap className="w-5 h-5" />, text: "High-fidelity 360° visuals & spatial audio" },
      { icon: <Shield className="w-5 h-5" />, text: "Fully supervised by VR professionals" },
      { icon: <Star className="w-5 h-5" />, text: "Best suited for Class 4 and above" },
    ],
  },
  {
    id: "jurassic",
    title: "Jurassic Era & Beyond",
    tag: "POPULAR CHOICE",
    tagColor: "bg-red-500",
    accentColor: "red-500",
    duration: "20 Minutes",
    ageGroup: "Class 4 – Class 10",
    img: `images/show-jurassic.jpeg`,
    overview: "Travel 230 million years back in time to a world where giants ruled the Earth. Students walk among dinosaurs, witness volcanic eruptions, and experience the dramatic events that shaped life on our planet — all in breathtaking 360° VR.",
    journey: [
      "The Triassic Period — birth of the first dinosaurs",
      "Jurassic Era — T-Rex, Brachiosaurus, and the reign of giants",
      "Prehistoric oceans and flying reptiles",
      "The Great Extinction Event — asteroid impact and its aftermath",
      "Rise of mammals and evolution of life on Earth",
    ],
    curriculum: [
      { subject: "Science — Evolution & Natural Selection", classes: "Class 9, 10" },
      { subject: "Science — Living World & Biodiversity", classes: "Class 6, 7" },
      { subject: "Science — Earth Sciences", classes: "Class 7, 8" },
      { subject: "Environmental Studies (EVS)", classes: "Class 4, 5" },
    ],
    highlights: [
      { icon: <Clock className="w-5 h-5" />, text: "20-minute fully immersive session" },
      { icon: <Users className="w-5 h-5" />, text: "30–40 students per batch" },
      { icon: <GraduationCap className="w-5 h-5" />, text: "CBSE & ICSE curriculum aligned" },
      { icon: <Zap className="w-5 h-5" />, text: "Life-size dinosaurs in 360° VR" },
      { icon: <Shield className="w-5 h-5" />, text: "Fully supervised by VR professionals" },
      { icon: <BookOpen className="w-5 h-5" />, text: "Most requested show by schools" },
    ],
  },
];

const ShowCard = ({ show, onBook }: { show: Show; onBook: (exp: string) => void }) => (
  <section className="py-24 odd:bg-white even:bg-[#fbf8ff]" id={show.id}>
    <div className="container mx-auto px-6 md:px-12">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <span className={`inline-block ${show.tagColor} text-white px-4 py-1 rounded-full text-xs font-bold mb-4`}>{show.tag}</span>
        <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">{show.title}</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — image + quick stats */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
            <img src={`${import.meta.env.BASE_URL}${show.img}`} alt={show.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={() => onBook(show.title)}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-primary-navy px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-secondary-green hover:text-white transition-all shadow-xl"
            >
              <Play className="w-4 h-4 fill-current" /> Book This Experience
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-primary-navy/5 rounded-2xl p-5 flex items-center gap-4">
              <Clock className="w-8 h-8 text-secondary-green shrink-0" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Duration</div>
                <div className="text-primary-navy font-bold">{show.duration}</div>
              </div>
            </div>
            <div className="bg-primary-navy/5 rounded-2xl p-5 flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-secondary-green shrink-0" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Age Group</div>
                <div className="text-primary-navy font-bold">{show.ageGroup}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — details */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{show.overview}</p>
          </div>

          {/* Journey */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4">What Students Experience</h3>
            <ul className="space-y-3">
              {show.journey.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary-green/10 text-secondary-green flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4">Curriculum Coverage</h3>
            <div className="space-y-2">
              {show.curriculum.map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-secondary-green/5 border border-secondary-green/20 rounded-xl px-4 py-3">
                  <span className="text-sm font-medium text-primary-navy">{c.subject}</span>
                  <span className="text-xs text-secondary-green font-bold bg-secondary-green/10 px-3 py-1 rounded-full">{c.classes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-bold text-primary-navy mb-4">Session Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {show.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-secondary-green">{h.icon}</span>
                  {h.text}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onBook(show.title)}
            className="w-full bg-secondary-green text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-secondary-green/20"
          >
            Book {show.title} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function ShowsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultExperience, setDefaultExperience] = useState("");
  const location = useLocation();

  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.state]);

  const openModal = (exp = "") => {
    setDefaultExperience(exp);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBook={() => openModal()} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-4 py-2 rounded-full text-xs font-bold mb-6">
              <BadgeCheck className="w-4 h-4" /> CURRICULUM-ALIGNED VR EXPERIENCES
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="text-secondary-green">VR Shows</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Two unforgettable journeys, designed for school students. Pick one or book both for a full day of immersive learning.
            </p>
            {/* Show selector pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openModal("Big Bang Theory")}
                className="bg-secondary-green text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all"
              >
                01 · Big Bang Theory
              </button>
              <button
                onClick={() => openModal("Jurassic Era & Beyond")}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/20 transition-all"
              >
                02 · Jurassic Era &amp; Beyond
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Show sections */}
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} onBook={openModal} />
      ))}

      {/* Book both CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001851] to-[#002b7f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Can't Choose? Book Both!</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Many schools book both experiences for a full immersive learning day. Students get to travel through space and time — all in one visit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => openModal("Both")} className="bg-secondary-green text-white px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(145,218,64,0.3)]">
              Book Both Experiences <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+919899157132" className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-sm font-medium hover:bg-white/20 transition-all">
              <Phone className="w-4 h-4 text-secondary-green" /> +91 98991 57132
            </a>
          </div>
        </div>
      </section>

      <Footer />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} defaultExperience={defaultExperience} />}
    </div>
  );
}
