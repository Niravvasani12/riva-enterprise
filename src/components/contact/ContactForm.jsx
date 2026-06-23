import { useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { CONTACT_PHONE } from "../../utils/constants";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const validateForm = (form) => {
  const errors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = "Please enter a valid name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
};

const createWhatsAppLink = (form) => {
  const message = [
    "Hello Riva Enterprise,",
    "",
    "I want to contact you for DTF printing.",
    "",
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim().toLowerCase()}`,
    `Phone: ${form.phone.replace(/\D/g, "")}`,
    `Message: ${form.message.trim()}`,
  ].join("\n");

  return `https://wa.me/91${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const isLoading = useMemo(() => status === "sending", [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      window.open(createWhatsAppLink(form), "_blank", "noopener,noreferrer");
      setStatus("success");
      setFeedback("WhatsApp opened with your message. Please tap Send to submit it.");
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFeedback(error?.message || "Could not open WhatsApp. Please try again.");
    }
  };

  return (
    <section className="px-4 py-8 text-center sm:px-6 sm:py-10">
      <h2 className="mb-6 text-3xl font-semibold text-green-400">Contact Us</h2>

      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-xl sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-green-400"
              required
            />
            {errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-green-400"
              required
            />
            {errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-slate-300">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-green-400"
              required
            />
            {errors.phone ? <p className="mt-1 text-xs text-red-400">{errors.phone}</p> : null}
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-green-400"
              required
            />
            {errors.message ? (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-500 px-6 py-3 font-medium text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-green-700"
          >
            {isLoading ? "Opening WhatsApp..." : "Send on WhatsApp"}
          </button>
        </form>

        {feedback ? (
          <Motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}
          >
            {feedback}
          </Motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default ContactForm;
