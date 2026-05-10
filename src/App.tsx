import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Glasses,
  GraduationCap,
  ShieldCheck,
  LineChart,
  CreditCard,
  BadgeCheck,
  X,
  Loader2,
  Menu,
} from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type BookingModalProps = { onClose: () => void; defaultExperience?: string };

const BookingModal = ({ onClose, defaultExperience = "" }: BookingModalProps) => {
  const [form, setForm] = useState({
    school_name: "",
    contact_name: "",
    phone: "",
    email: "",
    students: "",
    date: "",
    experience: defaultExperience,
    message: "",
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

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-secondary-green focus:ring-2 focus:ring-secondary-green/20 transition-all";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-primary-navy rounded-t-3xl p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <BadgeCheck className="w-3 h-3" /> BOOK A VR SESSION
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Book Your School's VR Experience</h2>
            <p className="text-gray-300 text-sm mt-2">Fill in the details below and our team will contact you within 24 hours.</p>
          </div>

          {/* Body */}
          <div className="p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary-green/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-secondary-green" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy">Booking Request Sent!</h3>
                <p className="text-gray-500 max-w-sm">Thank you! Our team will reach out to you within 24 hours to confirm your slot.</p>
                <button onClick={onClose} className="mt-4 bg-secondary-green text-white px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all">
                  Close
                </button>
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

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">Error: {errorMsg || "Something went wrong."}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-secondary-green text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary-green/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Booking Request <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Or call us directly at{" "}
                  <a href="tel:+919899157132" className="text-secondary-green font-bold">+91 98991 57132</a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = ({ onBook }: { onBook: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold font-display text-primary-navy">VRISE Global</div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-secondary-green font-bold border-b-2 border-secondary-green text-sm">Home</Link>
          <Link to="/about" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">About Us</Link>
          <Link to="/shows" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">Our Shows</Link>
          <Link to="/faq" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">FAQs</Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBook} className="bg-secondary-green text-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-md">Book Now</button>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5 text-primary-navy" /> : <Menu className="w-5 h-5 text-primary-navy" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          <Link to="/" className="text-secondary-green font-bold text-sm" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/shows" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors" onClick={() => setMenuOpen(false)}>Our Shows</Link>
          <Link to="/faq" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors" onClick={() => setMenuOpen(false)}>FAQs</Link>
          <button onClick={() => { onBook(); setMenuOpen(false); }} className="bg-secondary-green text-white px-6 py-2 rounded-full text-sm font-bold w-full mt-2">Book Now</button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onBook }: { onBook: () => void }) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-gradient">
    <div className="absolute inset-0 bg-gradient-to-r from-[#001851] via-[#001851]/70 to-transparent"></div>
    <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-4 py-2 rounded-full backdrop-blur-md">
          <BadgeCheck className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">INDIA'S FIRST-OF-ITS-KIND</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
          360° VR Immersive <br />
          <span className="text-secondary-green">Learning Program</span>
        </h1>
        <p className="text-3xl md:text-4xl italic font-light text-secondary-green tracking-widest" style={{ fontFamily: "'Lexend', sans-serif", textShadow: "0 0 30px rgba(145,218,64,0.4)" }}>
          " See. Feel. Learn. "
        </p>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
          Learn. Experience. Remember Forever. Our program takes students on an unforgettable journey through the universe, from the Big Bang to the Moon Landing!
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button onClick={onBook} className="bg-secondary-green text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(145,218,64,0.4)] transition-all">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:block relative"
      >
        <div className="absolute -inset-4 bg-secondary-green/30 blur-3xl rounded-full animate-pulse"></div>
        <img
          src={`${import.meta.env.BASE_URL}images/hero-vr.jpeg`}
          alt="Student with VR"
          className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/10 animate-float"
        />
      </motion.div>
    </div>
  </section>
);

const Benefits = () => {
  const benefits = [
    { icon: <Glasses size={32} />, title: "360° Immersive Experience", desc: "Feel the real world like never before with high-fidelity visuals.", bgColor: "bg-blue-500/10", iconColor: "text-blue-600" },
    { icon: <GraduationCap size={32} />, title: "Curriculum Aligned", desc: "Content specifically designed to support classroom learning objectives.", bgColor: "bg-green-500/10", iconColor: "text-green-600" },
    { icon: <ShieldCheck size={32} />, title: "Safe & Supervised", desc: "Fully managed by our team of trained VR professionals.", bgColor: "bg-cyan-500/10", iconColor: "text-cyan-600" },
    { icon: <LineChart size={32} />, title: "Concept Clarity", desc: "Improves retention and understanding of complex subjects.", bgColor: "bg-red-500/10", iconColor: "text-red-500" },
    { icon: <CreditCard size={32} />, title: "No Investment", desc: "We bring everything to you. No hardware costs for the school.", bgColor: "bg-purple-500/10", iconColor: "text-purple-600" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">Why VRISE for Your School?</h2>
          <p className="text-lg text-gray-600">Bringing the world's most advanced learning technology directly to your classroom with zero investment required from the school.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:border-secondary-green transition-all"
            >
              <div className={`w-16 h-16 rounded-full ${benefit.bgColor} ${benefit.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">{benefit.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NowShowing = ({ onBook, onLearnMore }: { onBook: (experience: string) => void; onLearnMore: (id: string) => void }) => {
  const shows = [
    {
      id: "big-bang",
      title: "Big Bang Theory",
      tag: "20 MIN JOURNEY",
      desc: "An unforgettable journey through the origin of the universe to the moon landing.",
      img: `${import.meta.env.BASE_URL}images/show-big-bang.jpeg`,
      tagColor: "bg-secondary-green",
    },
    {
      id: "jurassic",
      title: "Jurassic Era & Beyond",
      tag: "POPULAR CHOICE",
      desc: "Travel back in time to witness the majestic reign of dinosaurs and the dawn of life.",
      img: `${import.meta.env.BASE_URL}images/show-jurassic.jpeg`,
      tagColor: "bg-red-500",
    },
  ];

  return (
    <section className="py-24 bg-primary-navy text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Now Showing</h2>
            <p className="text-lg text-gray-400 max-w-xl">We have multiple titles and vision for setting up labs in schools to provide a smooth learning experience, Book your school's slot for these award-winning experiences.</p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shows.map((show, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden aspect-video shadow-2xl"
            >
              <img src={show.img} alt={show.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 space-y-4">
                <span className={`inline-block ${show.tagColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>{show.tag}</span>
                <h3 className="text-3xl font-bold text-white">{show.title}</h3>
                <p className="text-gray-300 max-w-md">{show.desc}</p>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => onBook(show.title)}
                    className="bg-white text-primary-navy px-6 py-2 rounded-full text-sm font-bold hover:bg-secondary-green hover:text-white transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => onLearnMore(show.id)}
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-sm font-bold hover:bg-white/20 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-24 bg-[#fbf8ff]">
    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <div className="relative inline-block mb-6">
          <div className="text-4xl font-bold text-primary-navy flex items-center gap-2">
            <span className="text-secondary-green">VR</span>ISE Global
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">Art of Imagination</h2>
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p>VRISE Global is India's leading immersive learning facilitator, dedicated to bridging the gap between traditional education and the boundless potential of Virtual Reality.</p>
          <p>We specialize in organizing high-fidelity VR shows for schools, enabling students to "experience" subjects like science, history, and geography in a way that textbooks simply cannot match.</p>
          <p>Our mission is to inspire curiosity, encourage exploration, and build a better understanding of the world around us through the power of 360° storytelling.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-secondary-green w-6 h-6 shrink-0" />
            <span className="text-sm font-bold text-primary-navy uppercase tracking-wider">300+ Schools Partnered</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-secondary-green w-6 h-6 shrink-0" />
            <span className="text-sm font-bold text-primary-navy uppercase tracking-wider">50,000+ Happy Students</span>
          </div>
        </div>
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <div className="relative w-4/5">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary-green/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary-navy/10 rounded-full blur-3xl"></div>
          <div className="bg-primary-navy p-2 rounded-[40px] shadow-2xl rotate-3">
            <img
              src={`${import.meta.env.BASE_URL}images/about-student.avif`}
              alt="Students in VR"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const experiences = [
  { img: "premium_photo-1663091224337-38e68aad44ce.avif.avif", label: "VR Headset Experience", tag: "Immersive", span: "col-span-2 row-span-2" },
  { img: "premium_photo-1663054493138-0a90944f1366.avif", label: "Classroom Discovery", tag: "Interactive", span: "" },
  { img: "premium_photo-1663091490635-3f757659ce10.avif", label: "Group Learning Session", tag: "Collaborative", span: "" },
  { img: "premium_photo-1665203583049-4c23499c3769.avif", label: "Virtual Field Trip", tag: "Exploratory", span: "" },
  { img: "premium_photo-1682124393358-92254bdf2065.avif", label: "360° Science Journey", tag: "Curriculum-Linked", span: "" },
];

const PricingCTA = ({ onBook }: { onBook: () => void }) => (
  <section className="py-24 bg-[#000d2e] relative overflow-hidden">
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-secondary-green text-xs uppercase tracking-[0.3em] font-semibold mb-3">Step Inside the Future</p>
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Experiences That Stay With You</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          From the Big Bang to the Jurassic Era — every session is a world your students will never forget.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-3 md:gap-4 mb-14" style={{ height: "560px" }}>
        {/* Large feature image */}
        <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
          <img
            src={`${import.meta.env.BASE_URL}images/experiences/${experiences[0].img}`}
            alt={experiences[0].label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <div className="absolute bottom-5 left-5">
            <span className="text-xs text-secondary-green font-semibold uppercase tracking-widest bg-secondary-green/10 border border-secondary-green/30 px-3 py-1 rounded-full">{experiences[0].tag}</span>
            <p className="text-white font-bold text-xl mt-2">{experiences[0].label}</p>
          </div>
        </div>

        {/* Small images */}
        {experiences.slice(1).map((exp) => (
          <div key={exp.img} className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={`${import.meta.env.BASE_URL}images/experiences/${exp.img}`}
              alt={exp.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-3 left-3">
              <span className="text-[10px] text-secondary-green font-semibold uppercase tracking-widest bg-secondary-green/10 border border-secondary-green/30 px-2 py-0.5 rounded-full">{exp.tag}</span>
              <p className="text-white font-semibold text-sm mt-1 leading-tight">{exp.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-400 mb-6 text-sm">Ready to bring these experiences to your school?</p>
        <button
          onClick={onBook}
          className="bg-secondary-green text-white px-12 py-5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(145,218,64,0.35)] tracking-widest"
        >
          ENQUIRE NOW FOR BOOKING
        </button>
      </div>
    </div>
  </section>
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
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Crafted for Excellence in Education</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultExperience, setDefaultExperience] = useState("");
  const navigate = useNavigate();

  const openModal = (experience = "") => {
    setDefaultExperience(experience);
    setModalOpen(true);
  };

  const goToShow = (id: string) => {
    navigate("/shows", { state: { scrollTo: id } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBook={() => openModal()} />
      <main>
        <Hero onBook={() => openModal()} />
        <Benefits />
        <NowShowing onBook={openModal} onLearnMore={goToShow} />
        <About />
        <PricingCTA onBook={() => openModal()} />
      </main>
      <Footer />
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} defaultExperience={defaultExperience} />}
    </div>
  );
}
