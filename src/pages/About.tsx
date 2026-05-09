import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
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
  Target,
  Eye,
  Heart,
  Users,
  Loader2,
  X,
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
      const e = err as { text?: string; status?: number; message?: string };
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
      <Link to="/" className="flex items-center gap-2">
        <img src={`${import.meta.env.BASE_URL}images/vriselogo.svg`} alt="VRISE Global" className="h-10 w-auto mix-blend-multiply" />
        <span className="text-xl font-bold font-display text-primary-navy">VRISE Global</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">Home</Link>
        <Link to="/about" className="text-secondary-green font-bold border-b-2 border-secondary-green text-sm">About Us</Link>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">Experiences</a>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">For Schools</a>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      desc: "To make world-class experiential learning accessible to every student in India through the power of 360° Virtual Reality — regardless of geography or school resources.",
      color: "bg-secondary-green/10 text-secondary-green",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Our Vision",
      desc: "A future where every child in India has experienced the universe, walked with dinosaurs, and explored history — all from their classroom, igniting a lifelong love for learning.",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Our Values",
      desc: "Innovation in education, accessibility for all, student safety, curriculum alignment, and a relentless commitment to making learning an unforgettable experience.",
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  const team = [
    { name: "Founding Team", role: "Visionaries in EdTech & VR", desc: "With backgrounds spanning education technology, virtual reality production, and school administration, our founders saw a gap between how students learn and how they could learn." },
    { name: "VR Experience Team", role: "Content & Immersion Specialists", desc: "Our content team crafts scientifically accurate, curriculum-aligned VR journeys that align with CBSE and ICSE syllabi — ensuring students experience exactly what they need to know." },
    { name: "On-Ground Team", role: "Trained VR Facilitators", desc: "Every session is managed by our certified VR professionals who handle equipment setup, safety protocols, and student engagement — so teachers can simply enjoy the show." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBook={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-4 py-2 rounded-full text-xs font-bold mb-6">
              <BadgeCheck className="w-4 h-4" /> INDIA'S VR EDUCATION PIONEER
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About <span className="text-secondary-green">VRISE Global</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We started with one belief: students learn best when they experience, not just read. Today, that belief has transformed learning for over 50,000 students across India.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-8">Our Story</h2>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  VRISE Global was born from a simple, powerful observation: classrooms across India were filled with curious minds being taught about the Big Bang, dinosaurs, and ancient civilizations — but only through textbooks and static images.
                </p>
                <p>
                  We knew there had to be a better way. So we built it.
                </p>
                <p>
                  We developed India's first school-focused, fully-managed VR learning program — bringing high-fidelity, curriculum-aligned 360° experiences directly to schools. No capital investment required from schools. No complicated setup. Just pure, unforgettable immersive learning.
                </p>
                <p>
                  Today, VRISE Global is trusted by 300+ schools across multiple states, having transformed how over 50,000 students experience education. And we're just getting started.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-secondary-green/10 rounded-full blur-3xl" />
              <div className="bg-primary-navy p-2 rounded-[40px] shadow-2xl -rotate-2">
                <img src={`${import.meta.env.BASE_URL}images/vrisefounder.jpeg`} alt="VRISE Global Founder" className="w-3/4 mx-auto rounded-[32px] object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-[#fbf8ff]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">What Drives Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every VR session we deliver is guided by a clear purpose — to make learning transformative, accessible, and memorable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-secondary-green transition-all">
                <div className={`w-14 h-14 rounded-2xl ${v.color} flex items-center justify-center mb-6`}>{v.icon}</div>
                <h3 className="text-xl font-bold text-primary-navy mb-4">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-2 lg:order-1">
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-navy/5 rounded-full blur-3xl" />
              <div className="bg-secondary-green p-2 rounded-[40px] shadow-2xl rotate-2">
                <img src={`${import.meta.env.BASE_URL}images/about-student.jpeg`} alt="Students experiencing VR" className="w-full rounded-[32px] object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-8">How It Works</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Book a Session", desc: "Fill out our simple booking form. Our team contacts you within 24 hours to confirm the date, time, and number of students." },
                  { step: "02", title: "We Come to You", desc: "Our trained VR facilitators arrive at your school with all equipment — VR headsets, audio systems, and everything needed for a seamless experience." },
                  { step: "03", title: "Students Experience & Learn", desc: "Students put on headsets and are transported to another world — the Big Bang, the Jurassic Era, space exploration — in full 360° immersive VR." },
                  { step: "04", title: "Zero Hassle, Full Impact", desc: "We pack up and leave. Your students carry forward a memory — and an understanding — that no textbook could have given them." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-secondary-green/10 text-secondary-green font-bold text-sm flex items-center justify-center shrink-0">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-primary-navy mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-primary-navy text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The People Behind VRISE</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">A passionate team of educators, technologists, and storytellers united by one goal — making learning unforgettable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-secondary-green/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-secondary-green/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-secondary-green" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-secondary-green text-sm font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#001851] to-[#002b7f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Bring VR to Your School?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">Join 300+ schools that have already transformed learning for their students. Booking is simple, and there's no investment required from your school.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setModalOpen(true)} className="bg-secondary-green text-white px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(145,218,64,0.3)]">
              Book a Session <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-secondary-green" />
              <span className="text-sm font-medium">Starts at ₹600 per student</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
