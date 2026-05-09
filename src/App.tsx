import { motion } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle, 
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
  BadgeCheck
} from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] glass-nav shadow-sm">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold font-display text-primary-navy">VRISE Global</div>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-secondary-green font-bold border-b-2 border-secondary-green text-sm">Home</a>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">About Us</a>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">Experiences</a>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">For Schools</a>
        <a href="#" className="text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors">FAQs</a>
      </div>
      <button id="nav-book-now" className="bg-secondary-green text-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-md">
        Book Now
      </button>
    </div>
  </nav>
);

const Hero = () => (
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
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
          360° VR Immersive <br/>
          <span className="text-secondary-green">Learning Program</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
          Learn. Experience. Remember Forever. Our program takes students on an unforgettable journey through the universe, from the Big Bang to the Moon Landing!
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button id="hero-book-now" className="bg-secondary-green text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(145,218,64,0.4)] transition-all">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <button id="hero-watch-trailer" className="glass-card text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
            <PlayCircle className="w-4 h-4" />
            Watch Trailer
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
          src={`${import.meta.env.BASE_URL}images/hero-vr.png`}
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
    { icon: <CreditCard size={32} />, title: "No Investment", desc: "We bring everything to you. No hardware costs for the school.", bgColor: "bg-purple-500/10", iconColor: "text-purple-600" }
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

const NowShowing = () => {
  const shows = [
    {
      title: "Big Bang Theory",
      tag: "20 MIN JOURNEY",
      desc: "An unforgettable journey through the origin of the universe to the moon landing.",
      img: `${import.meta.env.BASE_URL}images/show-big-bang.jpeg`,
      tagColor: "bg-secondary-green"
    },
    {
      title: "Jurassic Era & Beyond",
      tag: "POPULAR CHOICE",
      desc: "Travel back in time to witness the majestic reign of dinosaurs and the dawn of life.",
      img: `${import.meta.env.BASE_URL}images/show-jurassic.jpeg`,
      tagColor: "bg-red-500"
    }
  ];

  return (
    <section className="py-24 bg-primary-navy text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Now Showing</h2>
            <p className="text-lg text-gray-400 max-w-xl">Embark on extraordinary adventures that transcend time and space. Book your school's slot for these award-winning experiences.</p>
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
                  <button className="bg-white text-primary-navy px-6 py-2 rounded-full text-sm font-bold hover:bg-secondary-green hover:text-white transition-colors">Book Now</button>
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-sm font-bold hover:bg-white/20 transition-colors">Learn More</button>
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
      <div className="order-1 lg:order-2">
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary-green/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary-navy/10 rounded-full blur-3xl"></div>
          <div className="bg-primary-navy p-2 rounded-[40px] shadow-2xl rotate-3">
            <img 
              src={`${import.meta.env.BASE_URL}images/about-student.jpeg`}
              alt="Students in VR" 
              className="w-full h-full object-cover rounded-[32px]" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PricingCTA = () => (
  <section className="py-24 bg-gradient-to-br from-[#001851] to-[#002b7f] relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
    </div>
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-20 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your School?</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">Program fees start as low as ₹600 per student. Ask about our special discounts for larger groups!</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-12">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-secondary-green text-white flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-secondary-green font-bold text-2xl">₹600/-</div>
              <div className="text-gray-400 text-xs uppercase tracking-widest">Per Student</div>
            </div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center">
              <ArrowRight className="w-6 h-6" />
            </div>
            <div>
              <div className="text-cyan-400 font-bold text-2xl">₹50 OFF</div>
              <div className="text-gray-400 text-xs uppercase tracking-widest">For 300+ Students</div>
            </div>
          </div>
        </div>
        <button id="cta-enquire-now" className="bg-secondary-green text-white px-12 py-5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(145,218,64,0.3)]">
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
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">Contact Us</a></li>
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">Terms of Service</a></li>
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">Experience Guide</a></li>
            <li><a href="#" className="hover:text-secondary-green hover:underline transition-all">School Partnerships</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Contact Detail</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3"><Phone className="text-secondary-green w-5 h-5" /> +91 98991 57132</li>
            <li className="flex items-center gap-3"><Mail className="text-secondary-green w-5 h-5" /> info@vriseglobal.com</li>
            <li className="flex items-center gap-3"><MapPin className="text-secondary-green w-5 h-5" /> Gurugram, Haryana, India</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Office Location</h4>
          <div className="rounded-2xl overflow-hidden h-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkArCiEPsPO45t3sM7IE83uLHGtXuzVYosaP3KPmO_Hgb3o4CJKuMzDVm92zDsz0517Uv65riJ_WSS4-43bnjHws3joEWg1a396qJEzUBlMW4TgSdDGWzaqD9dfZMQblXc5PKC9JdVQwLGVRTmmdJ4jZS7mQtZr55IbGG1nfrH7wmAeVzrifFe1Xa8MHDjurhzjcSZ0s3tcYACDRLQy4lreWJimJKF-stZ7a2NkpDWVWVMyWMfBTtgky1k9yCk4F5y1gNct4BQehs" alt="Map" className="w-full h-full object-cover" />
          </div>
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
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <NowShowing />
        <About />
        <PricingCTA />
      </main>
      <Footer />
    </div>
  );
}

