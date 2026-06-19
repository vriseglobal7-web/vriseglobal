import { useState, useRef, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const BookingModal = lazy(() => import("./components/BookingModal"));
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
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
  Play,
  Eye,
  Pointer,
  BookOpen,
} from "lucide-react";

const TrailerModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl"
        role="dialog"
        aria-modal="true"
        aria-label="VR Trailer"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors"
        >
          <X className="w-4 h-4" /> Close
        </button>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/mdF_GIDgUD0?autoplay=1&rel=0"
            title="VRISE Global VR Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Hero = ({ onBook, onTrailer }: { onBook: () => void; onTrailer: () => void }) => (
  <section className="relative min-h-screen flex items-center pt-20 pb-16 lg:pb-0 overflow-hidden hero-gradient">
    {/* Mobile background image */}
    <div className="absolute inset-0 lg:hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/realimage/realheroimage-640.webp`}
        srcSet={`${import.meta.env.BASE_URL}images/realimage/realheroimage-640.webp 640w, ${import.meta.env.BASE_URL}images/realimage/realheroimage-1200.webp 1200w`}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        width={640}
        height={480}
        className="w-full h-full object-cover object-center opacity-50"
      />
    </div>
    {/* Overlay — dark on mobile, gradient on desktop */}
    <div className="absolute inset-0 bg-[#001851]/60 lg:bg-transparent"></div>
    <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#001851] via-[#001851]/70 to-transparent"></div>

    <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
        <div className="space-y-4">
          <div className="text-2xl md:text-4xl lg:text-5xl font-black tracking-wide md:tracking-wider leading-tight whitespace-nowrap">
            <span style={{ color: '#4ade80' }}>SEE.</span>{' '}
            <span style={{ color: '#60a5fa' }}>FEEL.</span>{' '}
            <span style={{ color: '#a78bfa' }}>LEARN.</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 text-white">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 flex-shrink-0" style={{ color: '#4ade80' }} />
              <div>
                <div className="text-xs font-bold tracking-widest" style={{ color: '#4ade80' }}>SEE</div>
                <div className="text-xs text-gray-400 tracking-widest">BEYOND</div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <Pointer className="w-5 h-5 flex-shrink-0" style={{ color: '#60a5fa' }} />
              <div>
                <div className="text-xs font-bold tracking-widest" style={{ color: '#60a5fa' }}>FEEL</div>
                <div className="text-xs text-gray-400 tracking-widest">REALITY</div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: '#a78bfa' }} />
              <div>
                <div className="text-xs font-bold tracking-widest" style={{ color: '#a78bfa' }}>LEARN</div>
                <div className="text-xs text-gray-400 tracking-wide">LIMITLESSLY</div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
          Learn. Experience. Remember Forever. Our program takes students on an unforgettable journey through the universe, from the Big Bang to the Moon Landing!
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button onClick={onBook} className="bg-secondary-green text-primary-navy px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(145,218,64,0.4)] transition-all">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onTrailer} className="border-2 border-white/40 text-white px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm">
            <Play className="w-4 h-4 fill-white" />
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
          src={`${import.meta.env.BASE_URL}images/realimage/realheroimage-1200.webp`}
          srcSet={`${import.meta.env.BASE_URL}images/realimage/realheroimage-1200.webp 1200w, ${import.meta.env.BASE_URL}images/realimage/realheroimage-1920.webp 1920w`}
          sizes="(max-width: 1440px) 50vw, 720px"
          alt="Student with VR"
          fetchPriority="high"
          width={1200}
          height={900}
          className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/10 animate-float"
        />
      </motion.div>
    </div>
  </section>
);

const StatStrip = () => (
  <div className="bg-secondary-green py-5">
    <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {[
          { value: "300+", label: "Schools" },
          { value: "50,000+", label: "Students" },
          { value: "2", label: "Immersive Shows" },
          { value: "20 Min", label: "Per Session" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center md:border-r md:last:border-r-0 border-primary-navy/15">
            <div className="text-3xl md:text-4xl font-black text-primary-navy font-display leading-none">{stat.value}</div>
            <div className="text-xs font-bold text-primary-navy/60 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const schools = [
  "Bishop Cotton School, Shimla",
  "Army Public School, Dagshai",
  "Auckland House School (Girls), Shimla",
  "Auckland House School for Boys, Shimla",
  "Sacred Heart Convent School, Shimla",
  "K.R. Mangalam World School, Gurugram",
  "Scottish High International School, Gurugram",
  "CCA School, Gurugram",
  "Raman Munjal Vidya Mandir, Gurugram",
  "Our Lady of Fatima Convent Secondary School, Gurugram",
  "Ambience Public School, Safdarjung Enclave",
  "New Green Field School (NGFS), Saket",
  "Delhi Public School (DPS), Rohini",
  "Jagran Public School, Noida",
  "G.D. Goenka Public School, Noida",
  "Ramagya School, Noida",
];

const SchoolTicker = () => (
  <div className="bg-secondary-green py-3 overflow-hidden border-t border-primary-navy/10">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...schools, ...schools].map((school, i) => (
        <span key={i} className="inline-flex items-center gap-3 px-6 text-sm text-primary-navy font-semibold">
          <span className="text-primary-navy/40 text-xs">✦</span>
          {school}
        </span>
      ))}
    </div>
  </div>
);

const Benefits = () => {
  const benefits = [
    { icon: <Glasses size={32} />, title: "360° Immersive Experience", desc: "Feel the real world like never before with high-fidelity visuals.", bgColor: "bg-secondary-green/15", iconColor: "text-secondary-green" },
    { icon: <GraduationCap size={32} />, title: "Curriculum Aligned", desc: "Content specifically designed to support classroom learning objectives.", bgColor: "bg-tertiary-cyan/15", iconColor: "text-tertiary-cyan" },
    { icon: <ShieldCheck size={32} />, title: "Safe & Supervised", desc: "Fully managed by our team of trained VR professionals.", bgColor: "bg-secondary-green/15", iconColor: "text-secondary-green" },
    { icon: <LineChart size={32} />, title: "Concept Clarity", desc: "Improves retention and understanding of complex subjects.", bgColor: "bg-tertiary-cyan/15", iconColor: "text-tertiary-cyan" },
    { icon: <CreditCard size={32} />, title: "No Investment", desc: "We bring everything to you. No hardware costs for the school.", bgColor: "bg-secondary-green/15", iconColor: "text-secondary-green" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">Why VRISE for Your School?</h2>
          <p className="text-lg text-gray-600">Bringing the world's most advanced learning technology directly to your classroom with zero investment required from the school.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
      img: `${import.meta.env.BASE_URL}images/show-big-bang.webp`,
      imgSrcSet: `${import.meta.env.BASE_URL}images/show-big-bang-480.webp 480w, ${import.meta.env.BASE_URL}images/show-big-bang.webp 981w`,
      tagColor: "bg-secondary-green",
    },
    {
      id: "jurassic",
      title: "Jurassic Era & Beyond",
      tag: "POPULAR CHOICE",
      desc: "Travel back in time to witness the majestic reign of dinosaurs and the dawn of life.",
      img: `${import.meta.env.BASE_URL}images/show-jurassic.webp`,
      imgSrcSet: `${import.meta.env.BASE_URL}images/show-jurassic-480.webp 480w, ${import.meta.env.BASE_URL}images/show-jurassic.webp 1024w`,
      tagColor: "bg-red-500",
    },
  ];

  return (
    <section className="py-24 bg-primary-navy text-white overflow-hidden">
      <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Now Showing</h2>
            <p className="text-lg text-gray-400 max-w-xl">We have multiple titles and vision for setting up labs in schools to provide a smooth learning experience, Book your school's slot for these award-winning experiences.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shows.map((show, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden aspect-video shadow-2xl"
            >
              <img src={show.img} srcSet={show.imgSrcSet} sizes="(max-width: 768px) 100vw, 50vw" alt={show.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 space-y-2 md:space-y-4">
                <span className={`inline-block ${show.tagColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>{show.tag}</span>
                <h3 className="text-xl md:text-3xl font-bold text-white">{show.title}</h3>
                <p className="text-gray-300 max-w-md text-sm md:text-base hidden sm:block">{show.desc}</p>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => onBook(show.title)}
                    className="bg-white text-primary-navy px-4 py-3 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold hover:bg-secondary-green hover:text-white transition-colors"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => onLearnMore(show.id)}
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-3 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold hover:bg-white/20 transition-colors"
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
    <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200/60 mt-8">
          <div>
            <div className="text-5xl md:text-6xl font-black text-secondary-green font-display leading-none">300+</div>
            <div className="text-xs font-bold text-primary-navy/60 uppercase tracking-widest mt-2">Schools Partnered</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-black text-secondary-green font-display leading-none">50K+</div>
            <div className="text-xs font-bold text-primary-navy/60 uppercase tracking-widest mt-2">Happy Students</div>
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
              loading="lazy"
              width={774}
              height={1161}
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const useInView = (ref: React.RefObject<HTMLElement | null>, rootMargin = "200px") => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
};

const testimonialVideos = [
  "livefeedback1.MP4",
  "livefeedback2.MP4",
  "livefeedback3.MP4",
  "livefeedback4.MP4",
  "livefeedback5.MP4",
];

const TestimonialCard = ({ file }: { file: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" aria-label={`Play testimonial video ${file}`} onClick={() => setOpen(true)} className="flex-shrink-0 w-52 md:w-auto rounded-2xl overflow-hidden shadow-lg group text-left">
        <div className="relative aspect-[9/16] bg-primary-navy">
          <video
            src={`${import.meta.env.BASE_URL}videos/${file}`}
            preload="metadata"
            playsInline
            muted
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.1; }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-secondary-green ring-4 ring-white/40 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.6),0_0_0_8px_rgba(145,218,64,0.2)] group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary-navy ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm"
              role="dialog"
              aria-modal="true"
              aria-label="Testimonial video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors"
              >
                <X className="w-4 h-4" /> Close
              </button>
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  src={`${import.meta.env.BASE_URL}videos/${file}`}
                  autoPlay
                  playsInline
                  controls
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Testimonials = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} className="py-24 bg-[#000d2e]">
      <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12">
        <div className="text-center mb-14">
          <p className="text-secondary-green text-xs uppercase tracking-[0.3em] font-semibold mb-3">Real Reactions</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Hear It From the Students</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Nothing says it better than seeing the joy on their faces.
          </p>
        </div>
        {inView && (
          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonialVideos.map((file) => (
              <TestimonialCard key={file} file={file} />
            ))}
          </div>
        )}
        {!inView && <div className="h-[300px] md:h-[400px]" />}
      </div>
    </section>
  );
};

const experiences = [
  { img: "images/realimage/realimage1.webp", label: "VR Headset Experience", tag: "Immersive", span: "col-span-2 row-span-2", w: 768, h: 1024 },
  { img: "images/realimage/realimage2-640.webp", label: "Classroom Discovery", tag: "Interactive", span: "", w: 600, h: 800 },
  { img: "images/experiences/b9f2667b-640.webp", label: "Group Learning Session", tag: "Collaborative", span: "", w: 640, h: 512 },
  { img: "images/experiences/premium1-800.webp", label: "Virtual Field Trip", tag: "Exploratory", span: "", w: 800, h: 519 },
  { img: "images/experiences/premium2-800.webp", label: "360° Science Journey", tag: "Curriculum-Linked", span: "", w: 800, h: 533 },
];

const PricingCTA = ({ onBook }: { onBook: () => void }) => (
  <section className="py-24 bg-[#000d2e] relative overflow-hidden">
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
    <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12 relative z-10">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-secondary-green text-xs uppercase tracking-[0.3em] font-semibold mb-3">Step Inside the Future</p>
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Experiences That Stay With You</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          From the Big Bang to the Jurassic Era — every session is a world your students will never forget.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-14">
        {/* Large feature image */}
        <div className="col-span-2 aspect-[16/7] relative rounded-2xl overflow-hidden group cursor-pointer">
          <img
            src={`${import.meta.env.BASE_URL}${experiences[0].img}`}
            srcSet={`${import.meta.env.BASE_URL}images/realimage/realimage1-640.webp 640w, ${import.meta.env.BASE_URL}images/realimage/realimage1.webp 768w`}
            sizes="(max-width: 768px) 100vw, 66vw"
            alt={experiences[0].label}
            loading="lazy"
            decoding="async"
            width={experiences[0].w}
            height={experiences[0].h}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <div className="absolute bottom-5 left-5">
            <span className="text-xs text-secondary-green font-semibold uppercase tracking-widest bg-secondary-green/10 border border-secondary-green/30 px-3 py-1 rounded-full">{experiences[0].tag}</span>
            <p className="text-white font-bold text-xl mt-2">{experiences[0].label}</p>
          </div>
        </div>

        {/* Small images */}
        {experiences.slice(1).map((exp) => (
          <div key={exp.img} className="aspect-[4/3] relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={`${import.meta.env.BASE_URL}${exp.img}`}
              alt={exp.label}
              loading="lazy"
              decoding="async"
              width={exp.w}
              height={exp.h}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
          className="bg-secondary-green text-primary-navy px-12 py-5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(145,218,64,0.35)] tracking-widest"
        >
          ENQUIRE NOW FOR BOOKING
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#001851] text-white pt-24 pb-12 border-t border-white/10">
    <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="text-3xl font-bold font-display">VRISE Global</div>
          <p className="text-gray-400 leading-relaxed">Experience Beyond Reality. India's premier VR education partner for modern schools.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-green transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-green transition-colors"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-green transition-colors"><Twitter size={18} /></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="hover:text-secondary-green transition-all">Home</Link></li>
            <li><Link to="/about" className="hover:text-secondary-green transition-all">About Us</Link></li>
            <li><Link to="/shows" className="hover:text-secondary-green transition-all">Our Shows</Link></li>
            <li><Link to="/faq" className="hover:text-secondary-green transition-all">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6">Contact Detail</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3"><Phone className="text-secondary-green w-5 h-5" /> +91 98991 57132</li>
            <li className="flex items-center gap-3"><Mail className="text-secondary-green w-5 h-5" /> vriseglobal7@gmail.com</li>
            <li className="flex items-center gap-3"><MapPin className="text-secondary-green w-5 h-5" /> Gurugram, Haryana, India</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>© 2026 VRISE Global. Experience Beyond Reality.</p>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Crafted for Excellence in Education</span>
        </div>
      </div>
    </div>
  </footer>
);

const BottomBar = () => (
  <div className="bg-[#000d2e] py-5 overflow-hidden border-t border-white/5">
    <div className="flex whitespace-nowrap animate-marquee">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="inline-flex items-center gap-4 px-10 text-white/25 text-sm font-display font-bold uppercase tracking-[0.3em]">
          <span>VR</span>
          <span className="text-secondary-green/40">ISE</span>
          <span>Global</span>
          <span className="text-secondary-green/40 text-xs">✦</span>
          <span>Art of Imagination</span>
          <span className="text-secondary-green/40 text-xs">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultExperience, setDefaultExperience] = useState("");
  const [trailerOpen, setTrailerOpen] = useState(false);
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
        <Hero onBook={() => openModal()} onTrailer={() => setTrailerOpen(true)} />
        <StatStrip />
        <SchoolTicker />
        <Benefits />
        <NowShowing onBook={openModal} onLearnMore={goToShow} />
        <Testimonials />
        <PricingCTA onBook={() => openModal()} />
        <About />
      </main>
      <Footer />
      <BottomBar />
      {modalOpen && (
        <Suspense fallback={null}>
          <BookingModal onClose={() => setModalOpen(false)} defaultExperience={defaultExperience} />
        </Suspense>
      )}
      {trailerOpen && <TrailerModal onClose={() => setTrailerOpen(false)} />}
    </div>
  );
}
