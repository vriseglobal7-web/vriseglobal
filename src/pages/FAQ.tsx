import { useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
  ChevronDown,
  Loader2,
  X,
  CalendarDays,
  ShieldCheck,
  BookOpen,
  Sparkles,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { type ChangeEvent, type FormEvent } from "react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type BookingModalProps = { onClose: () => void };

const BookingModal = ({ onClose }: BookingModalProps) => {
  const [form, setForm] = useState({
    school_name: "", contact_name: "", phone: "", email: "",
    students: "", date: "", experience: "", message: "",
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
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">Experiences</a>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">For Schools</a>
        <Link to="/faq" className="text-secondary-green font-bold border-b-2 border-secondary-green text-sm">FAQs</Link>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
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
            <li><Link to="/" className="hover:text-secondary-green hover:underline transition-all">Home</Link></li>
            <li><Link to="/about" className="hover:text-secondary-green hover:underline transition-all">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-secondary-green hover:underline transition-all">FAQs</Link></li>
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">Terms of Service</a></li>
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

type FAQItem = { q: string; a: string };
type FAQCategory = { icon: React.ReactNode; title: string; color: string; items: FAQItem[] };

const faqCategories: FAQCategory[] = [
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Booking & Logistics",
    color: "bg-secondary-green/10 text-secondary-green",
    items: [
      {
        q: "How do we book a VR session for our school?",
        a: "Simply click the 'Book Now' button on our website and fill in your school details. Our team will get in touch within 24 hours to confirm the date, time, and session plan.",
      },
      {
        q: "How far in advance should we book?",
        a: "We recommend booking at least 7–10 days in advance to secure your preferred date. However, we do our best to accommodate last-minute requests — just give us a call directly.",
      },
      {
        q: "How many students can participate in one session?",
        a: "We can comfortably accommodate batches of 30–40 students per slot. For larger schools, we run multiple back-to-back batches throughout the day so every student gets the full experience.",
      },
      {
        q: "Is there a minimum number of students required?",
        a: "Yes, we require a minimum of 50 students per booking to make the session viable. For smaller groups, feel free to contact us and we'll find a suitable arrangement.",
      },
      {
        q: "Do you come to our school or do we need to travel?",
        a: "We come to you! Our team arrives at your school with all equipment fully set up and ready. There's no travel required for students or staff.",
      },
    ],
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Safety & Equipment",
    color: "bg-blue-500/10 text-blue-600",
    items: [
      {
        q: "Is VR safe for children's eyes?",
        a: "Yes. We use premium VR headsets designed for educational use and follow strict usage guidelines — sessions are capped at 20 minutes per student, which is well within the safe range recommended by health experts.",
      },
      {
        q: "What age group is this suitable for?",
        a: "Our VR experiences are designed for students from Class 4 onwards (ages 9+). The content, narration, and experience duration are all calibrated for school-age children.",
      },
      {
        q: "Are the VR headsets sanitized between students?",
        a: "Absolutely. Our team sanitizes every headset between each use using medical-grade disinfectant wipes. Hygiene is a top priority and we follow a strict cleaning protocol throughout the session.",
      },
      {
        q: "What if a child feels dizzy or uncomfortable?",
        a: "Our trained facilitators closely monitor every student during the session. If any student feels dizzy or uneasy, we immediately remove the headset and let them rest. The experience is always voluntary — no student is pressured to continue.",
      },
      {
        q: "Do we need to provide any equipment or special space?",
        a: "No investment or special setup is required from the school. We bring everything — headsets, audio equipment, seating arrangement guides, and our own team. All we need is a classroom or open hall space.",
      },
    ],
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Content & Curriculum",
    color: "bg-purple-500/10 text-purple-600",
    items: [
      {
        q: "Which VR experiences are currently available?",
        a: "We currently offer two flagship experiences: 'Big Bang Theory' — a 20-minute journey from the origin of the universe to the Moon Landing, and 'Jurassic Era & Beyond' — an immersive exploration of prehistoric life on Earth.",
      },
      {
        q: "Is the content aligned with CBSE/ICSE syllabus?",
        a: "Yes. Every VR experience we offer is mapped to the CBSE and ICSE science curriculum. Students experience concepts they're already studying — making the learning immediately relevant and reinforcing classroom lessons.",
      },
      {
        q: "How long does each VR show last?",
        a: "Each VR show runs for approximately 20 minutes per student batch. If you book both experiences, each batch gets two back-to-back 20-minute shows. Setup and wrap-up time is additional.",
      },
      {
        q: "Can we request specific topics or subjects?",
        a: "We're continuously developing new VR content across subjects including geography, history, and biology. Reach out to us with your topic requirements — we'd love to know what your students need and factor it into our upcoming releases.",
      },
    ],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "On the Day",
    color: "bg-orange-500/10 text-orange-500",
    items: [
      {
        q: "How long does setup and pack-up take?",
        a: "Our team typically arrives 30–45 minutes before the session to set up. Pack-up after the last batch takes around 20–30 minutes. The school doesn't need to do anything — we handle it entirely.",
      },
      {
        q: "Do you need WiFi or electricity from the school?",
        a: "We just need access to standard electrical points (we carry our own power extension if needed). WiFi is not required — all VR content is pre-loaded on our devices so sessions run seamlessly offline.",
      },
      {
        q: "How many staff do you bring?",
        a: "We bring a minimum of 2 trained VR facilitators per session, with additional staff for larger schools. Our team manages the entire experience independently so teachers are free to observe or take a break.",
      },
      {
        q: "What do teachers need to do during the session?",
        a: "Very little! Teachers are welcome to observe the session or use the time as they see fit. We do recommend a brief 5-minute pre-show talk by the class teacher to build excitement — but it's entirely optional.",
      },
    ],
  },
];

const FAQAccordion = ({ items }: { items: FAQItem[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-primary-navy text-sm md:text-base pr-4">{item.q}</span>
            <ChevronDown className={`w-5 h-5 text-secondary-green shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default function FAQPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Navbar onBook={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-4 py-2 rounded-full text-xs font-bold mb-6">
              <BadgeCheck className="w-4 h-4" /> EVERYTHING YOU NEED TO KNOW
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Frequently Asked <span className="text-secondary-green">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Got questions before booking? We've answered everything schools commonly ask right here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="space-y-16">
            {faqCategories.map((category, ci) => (
              <motion.div key={ci} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl ${category.color} flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-primary-navy">{category.title}</h2>
                </div>
                <FAQAccordion items={category.items} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20 bg-primary-navy">
        <div className="container mx-auto px-6 md:px-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-10">Our team is happy to walk you through everything before you commit to a booking. Just reach out.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setModalOpen(true)} className="bg-secondary-green text-white px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all">
              Book a Session <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+919899157132" className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-sm font-medium hover:bg-white/20 transition-all">
              <Phone className="w-4 h-4 text-secondary-green" /> +91 98991 57132
            </a>
          </div>
        </div>
      </section>

      <Footer />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
