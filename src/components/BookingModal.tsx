import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  X, CheckCircle2, Loader2, School, User, Phone, Mail,
  Users, CalendarDays, MessageSquare, ArrowRight, Zap, Clock, BadgeCheck,
} from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type BookingModalProps = { onClose: () => void; defaultExperience?: string };

const experiences = [
  { value: "Big Bang Theory", label: "Big Bang Theory", meta: "20 Min · Class 4–10", emoji: "🌌" },
  { value: "Jurassic Era & Beyond", label: "Jurassic Era", meta: "20 Min · Class 4–10", emoji: "🦕" },
  { value: "Both", label: "Both Shows", meta: "Full Day Programme", emoji: "✨" },
];

const Field = ({
  id, label, icon, children,
}: { id: string; label: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
      <span className="text-secondary-green">{icon}</span>
      {label}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-secondary-green focus:bg-white focus:ring-2 focus:ring-secondary-green/15 transition-all";

export const BookingModal = ({ onClose, defaultExperience = "" }: BookingModalProps) => {
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
      const e = err as { text?: string; status?: number; message?: string };
      setErrorMsg(e?.text || e?.message || JSON.stringify(err));
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative w-full sm:max-w-4xl flex flex-col sm:flex-row rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[95dvh] sm:max-h-[90vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Left panel (desktop only) ─────────────────────────────── */}
          <div className="hidden sm:flex sm:w-[42%] flex-col justify-between bg-primary-navy p-8 text-white relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-tertiary-cyan/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                  <BadgeCheck className="w-3.5 h-3.5" /> VRISE Global
                </div>
                <h2 id="booking-modal-title" className="text-2xl font-bold leading-snug">
                  Bring VR to Your<br />
                  <span className="bg-gradient-to-r from-secondary-green to-tertiary-cyan bg-clip-text text-transparent">School Today</span>
                </h2>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Zero investment. Fully managed. Our team brings everything — just pick a date.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  { icon: <Zap className="w-4 h-4" />, text: "Free site visit & demo" },
                  { icon: <Clock className="w-4 h-4" />, text: "24-hour response guarantee" },
                  { icon: <BadgeCheck className="w-4 h-4" />, text: "No commitment required" },
                  { icon: <Users className="w-4 h-4" />, text: "Batches of 30–40 students" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-7 h-7 rounded-full bg-secondary-green/15 text-secondary-green flex items-center justify-center flex-shrink-0">
                      {icon}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-bold">Or reach us directly</p>
              <a href="tel:+919899157132" className="flex items-center gap-2 text-sm text-white hover:text-secondary-green transition-colors">
                <Phone className="w-4 h-4 text-secondary-green" />
                +91 98991 57132
              </a>
              <a href="mailto:vriseglobal7@gmail.com" className="flex items-center gap-2 text-sm text-white hover:text-secondary-green transition-colors mt-2">
                <Mail className="w-4 h-4 text-secondary-green" />
                vriseglobal7@gmail.com
              </a>
            </div>
          </div>

          {/* ── Right panel (form) ────────────────────────────────────── */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
            {/* Mobile header */}
            <div className="sm:hidden bg-primary-navy px-6 pt-6 pb-5 text-white relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-green/10 rounded-full blur-2xl" />
              <h2 id="booking-modal-title-mobile" className="text-xl font-bold relative z-10">Book Your VR Session</h2>
              <p className="text-gray-400 text-xs mt-1 relative z-10">We'll contact you within 24 hours.</p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close booking modal"
              className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 sm:bg-gray-100 sm:hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white sm:text-gray-700" />
            </button>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-secondary-green/10 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-secondary-green" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-navy">You're all set!</h3>
                    <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                      Our team will reach out within 24 hours to confirm your school's VR session.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-secondary-green text-primary-navy px-10 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="school_name" label="School Name" icon={<School className="w-3.5 h-3.5" />}>
                      <input id="school_name" required className={inputCls} placeholder="e.g. Delhi Public School" value={form.school_name} onChange={set("school_name")} />
                    </Field>
                    <Field id="contact_name" label="Contact Person" icon={<User className="w-3.5 h-3.5" />}>
                      <input id="contact_name" required className={inputCls} placeholder="Your full name" value={form.contact_name} onChange={set("contact_name")} />
                    </Field>
                    <Field id="phone" label="Phone Number" icon={<Phone className="w-3.5 h-3.5" />}>
                      <input id="phone" required type="tel" className={inputCls} placeholder="+91 98000 00000" value={form.phone} onChange={set("phone")} />
                    </Field>
                    <Field id="email" label="Email Address" icon={<Mail className="w-3.5 h-3.5" />}>
                      <input id="email" required type="email" className={inputCls} placeholder="school@example.com" value={form.email} onChange={set("email")} />
                    </Field>
                    <Field id="students" label="No. of Students" icon={<Users className="w-3.5 h-3.5" />}>
                      <input id="students" required type="number" min="1" className={inputCls} placeholder="e.g. 120" value={form.students} onChange={set("students")} />
                    </Field>
                    <Field id="date" label="Preferred Date" icon={<CalendarDays className="w-3.5 h-3.5" />}>
                      <input id="date" required type="date" className={inputCls} value={form.date} onChange={set("date")} />
                    </Field>
                  </div>

                  {/* Experience picker */}
                  <div className="space-y-2">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <span className="text-secondary-green"><Zap className="w-3.5 h-3.5 inline" /></span>
                      Choose Experience *
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {experiences.map((exp) => (
                        <button
                          key={exp.value}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, experience: exp.value }))}
                          className={`relative rounded-xl border-2 p-3 text-left transition-all ${
                            form.experience === exp.value
                              ? "border-secondary-green bg-secondary-green/5"
                              : "border-gray-200 bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          {form.experience === exp.value && (
                            <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-secondary-green flex items-center justify-center">
                              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}
                          <div className="text-xl mb-1.5">{exp.emoji}</div>
                          <div className="text-xs font-bold text-gray-900 leading-tight">{exp.label}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{exp.meta}</div>
                        </button>
                      ))}
                    </div>
                    {/* Hidden input to satisfy form validation */}
                    <input type="hidden" required value={form.experience} onChange={() => {}} />
                  </div>

                  {/* Message */}
                  <Field id="message" label="Message (Optional)" icon={<MessageSquare className="w-3.5 h-3.5" />}>
                    <textarea id="message" rows={2} className={inputCls} placeholder="Any specific requirements or questions..." value={form.message} onChange={set("message")} />
                  </Field>

                  {status === "error" && (
                    <p role="alert" className="text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded-xl py-3 px-4">
                      {errorMsg || "Something went wrong. Please try again or call us."}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending" || !form.experience}
                    className="w-full bg-secondary-green text-primary-navy py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary-green/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === "sending"
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending your request…</>
                      : <>Send Booking Request <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
