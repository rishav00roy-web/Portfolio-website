"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "contract",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

    try {
      const typeLabels: Record<string, string> = {
        contract: "Freelance Contract / Project",
        recruit: "Full-time Recruitment Opportunity",
        consulting: "Technical Consulting",
        other: "General Inquiry / Quick Question",
      };

      const message = [
        `📩 *New Portfolio Inquiry*`,
        ``,
        `*Name:* ${formData.name}`,
        `*Email:* ${formData.email}`,
        `*Type:* ${typeLabels[formData.type] || formData.type}`,
        ``,
        `*Message:*`,
        formData.message,
      ].join("\n");

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/916001914771?text=${encoded}`, "_blank", "noopener,noreferrer");

      setStatus("success");
      setFormData({ name: "", email: "", type: "contract", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-xl bg-surface border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
      <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-[-0.01em] text-white mb-2">
        Send a Message
      </h3>
      <p className="text-white/50 text-xs sm:text-sm font-sans mb-8">
        Have a new project or an open role to discuss? Get in touch and let&apos;s explore the possibilities.
      </p>

      {status === "success" ? (
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          <h4 className="text-2xl text-white uppercase font-display">
            WhatsApp Opened!
          </h4>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed font-sans">
            Your message has been pre-filled in WhatsApp. Please tap <strong>Send</strong> in the WhatsApp window to complete delivery.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/35 text-white/80 hover:text-white transition-colors text-sm"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="form-name" className="block text-sm text-white/70 mb-2">
              Name
            </label>
            <input
              id="form-name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "form-name-error" : undefined}
              aria-required="true"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`w-full bg-surface-2 border ${
                errors.name ? "border-rose-500/50 focus:border-rose-500" : "border-white/45 focus:border-accent"
              } rounded-xl px-4 py-3 text-white outline-none transition-colors text-base sm:text-sm font-sans`}
              placeholder="e.g. Jane Doe"
            />
            {errors.name && (
              <span id="form-name-error" role="alert" className="flex items-center gap-1.5 text-rose-500 text-[10px] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.name}</span>
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="form-email" className="block text-sm text-white/70 mb-2">
              Email
            </label>
            <input
              id="form-email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "form-email-error" : undefined}
              aria-required="true"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full bg-surface-2 border ${
                errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/45 focus:border-accent"
              } rounded-xl px-4 py-3 text-white outline-none transition-colors text-base sm:text-sm font-sans`}
              placeholder="jane@company.com"
            />
            {errors.email && (
              <span id="form-email-error" role="alert" className="flex items-center gap-1.5 text-rose-500 text-[10px] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.email}</span>
              </span>
            )}
          </div>

          {/* Inquiry Type */}
          <div>
            <label htmlFor="form-type" className="block text-sm text-white/70 mb-2">
              What is it about?
            </label>
            <select
              id="form-type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-surface-2 border border-white/45 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-colors text-base sm:text-sm font-sans"
            >
              <option value="contract">Freelance Contract / Project</option>
              <option value="recruit">Full-time Recruitment Opportunity</option>
              <option value="consulting">Technical Consulting</option>
              <option value="other">General Inquiry / Quick Question</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="form-message" className="block text-sm text-white/70 mb-2">
              Message
            </label>
            <textarea
              id="form-message"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "form-message-error" : undefined}
              aria-required="true"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              rows={4}
              className={`w-full bg-surface-2 border ${
                errors.message ? "border-rose-500/50 focus:border-rose-500" : "border-white/45 focus:border-accent"
              } rounded-xl px-4 py-3 text-white outline-none transition-colors text-base sm:text-sm font-sans resize-none`}
              placeholder="Outline your project scope or job description..."
            />
            {errors.message && (
              <span id="form-message-error" role="alert" className="flex items-center gap-1.5 text-rose-500 text-[10px] font-mono mt-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.message}</span>
              </span>
            )}
          </div>

          {/* Expected Response Info */}
          <div className="flex items-center gap-2 text-white/55 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>I usually reply within a day.</span>
          </div>

          {/* Form CTAs */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-accent text-background font-semibold py-3.5 px-6 rounded-full hover:bg-[#ffc72c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
