"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertTriangle, Calendar, X, Clock } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "contract",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showCalendly, setShowCalendly] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate API call for local hosting demo
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", type: "contract", message: "" });
    } catch {
      setStatus("error");
    }
  };

  // Close Calendly modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCalendly(false);
    };
    if (showCalendly) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showCalendly]);

  return (
    <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
        Send a Message
      </h3>
      <p className="text-white/50 text-xs sm:text-sm font-sans mb-8">
        Have a project or open role? Get in touch and let&apos;s coordinate.
      </p>

      {status === "success" ? (
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          <h4 className="text-xl font-bold text-white uppercase tracking-tight font-display">
            Message Sent!
          </h4>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed font-sans">
            Thank you for reaching out. I will respond to your email within <strong>12 to 24 hours</strong>.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/35 text-white/80 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="form-name" className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
              Name
            </label>
            <input
              id="form-name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`w-full bg-white/5 border ${
                errors.name ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-accent"
              } rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm font-sans`}
              placeholder="e.g. Jane Doe"
            />
            {errors.name && (
              <span className="flex items-center gap-1.5 text-rose-500 text-[10px] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.name}</span>
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="form-email" className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
              Email Address
            </label>
            <input
              id="form-email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full bg-white/5 border ${
                errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-accent"
              } rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm font-sans`}
              placeholder="jane@company.com"
            />
            {errors.email && (
              <span className="flex items-center gap-1.5 text-rose-500 text-[10px] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.email}</span>
              </span>
            )}
          </div>

          {/* Inquiry Type */}
          <div>
            <label htmlFor="form-type" className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
              Project Type
            </label>
            <select
              id="form-type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-colors text-sm font-sans"
            >
              <option value="contract">Freelance Contract / Project</option>
              <option value="recruit">Full-time Recruitment Opportunity</option>
              <option value="consulting">Technical Consulting</option>
              <option value="other">General Inquiry / Quick Question</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="form-message" className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
              Message / Project Description
            </label>
            <textarea
              id="form-message"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              rows={4}
              className={`w-full bg-white/5 border ${
                errors.message ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-accent"
              } rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm font-sans resize-none`}
              placeholder="Outline your project scope or job description..."
            />
            {errors.message && (
              <span className="flex items-center gap-1.5 text-rose-500 text-[10px] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.message}</span>
              </span>
            )}
          </div>

          {/* Expected Response Info */}
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            <span>Response expectations: 12-24 Hours</span>
          </div>

          {/* Form CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-semibold py-3.5 px-6 rounded-full hover:bg-white/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowCalendly(true)}
              className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 text-white py-3.5 px-6 rounded-full transition-colors font-semibold"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Calendar Call</span>
            </button>
          </div>
        </form>
      )}

      {/* Calendly Integration Modal */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setShowCalendly(false)} />
          <div className="relative w-full max-w-4xl h-[85vh] bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                Book a Call with Rishav
              </span>
              <button
                onClick={() => setShowCalendly(false)}
                className="w-8 h-8 rounded-full border border-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close scheduler"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 w-full h-full bg-[#121212]">
              {/* Calendly iframe embed - fallback to message in offline environment */}
              <iframe
                src="https://calendly.com/rishav2000roy?hide_landing_page_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduler"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
