import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import { ArrowRight, CheckCircle2, BadgeCheck, X, Loader2 } from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type BookingModalProps = { onClose: () => void; defaultExperience?: string };

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

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-secondary-green focus:ring-2 focus:ring-secondary-green/20 transition-all";

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
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-primary-navy rounded-t-3xl p-8 text-white relative">
            <button onClick={onClose} aria-label="Close booking modal" className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center gap-2 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <BadgeCheck className="w-3 h-3" /> BOOK A VR SESSION
            </div>
            <h2 id="booking-modal-title" className="text-2xl md:text-3xl font-bold">Book Your School's VR Experience</h2>
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
                <button onClick={onClose} className="mt-4 bg-secondary-green text-primary-navy px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="school_name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">School Name *</label>
                    <input id="school_name" required className={inputClass} placeholder="e.g. Delhi Public School" value={form.school_name} onChange={set("school_name")} />
                  </div>
                  <div>
                    <label htmlFor="contact_name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contact Person *</label>
                    <input id="contact_name" required className={inputClass} placeholder="Your full name" value={form.contact_name} onChange={set("contact_name")} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input id="phone" required type="tel" className={inputClass} placeholder="+91 98000 00000" value={form.phone} onChange={set("phone")} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                    <input id="email" required type="email" className={inputClass} placeholder="school@example.com" value={form.email} onChange={set("email")} />
                  </div>
                  <div>
                    <label htmlFor="students" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Number of Students *</label>
                    <input id="students" required type="number" min="1" className={inputClass} placeholder="e.g. 120" value={form.students} onChange={set("students")} />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Date *</label>
                    <input id="date" required type="date" className={inputClass} value={form.date} onChange={set("date")} />
                  </div>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Choose Experience *</label>
                  <select id="experience" required className={inputClass} value={form.experience} onChange={set("experience")}>
                    <option value="">Select an experience</option>
                    <option value="Big Bang Theory">Big Bang Theory — 20 Min Journey</option>
                    <option value="Jurassic Era & Beyond">Jurassic Era &amp; Beyond — Popular Choice</option>
                    <option value="Both">Both Experiences</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Additional Message</label>
                  <textarea id="message" rows={3} className={inputClass} placeholder="Any specific requirements or questions..." value={form.message} onChange={set("message")} />
                </div>
                {status === "error" && <p role="alert" className="text-red-500 text-sm text-center">Error: {errorMsg || "Something went wrong."}</p>}
                <button type="submit" disabled={status === "sending"} className="w-full bg-secondary-green text-primary-navy py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary-green/20 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Send Booking Request <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-center text-xs text-gray-400">
                  Or call us directly at <a href="tel:+919899157132" className="text-secondary-green font-bold">+91 98991 57132</a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
