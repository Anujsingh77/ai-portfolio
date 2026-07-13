import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import { profile } from "../data/profile.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Get In Touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading mb-14"
        >
          Let's Build Something
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card flex flex-col justify-between p-7"
          >
            <div>
              <h3 className="mb-2 font-display text-xl font-semibold">
                Open to Data Scientist &amp; ML Engineer roles
              </h3>
              <p className="text-sm leading-relaxed text-ink-600 dark:text-mist-400">
                Have a project, internship, or opportunity in mind? I'd love
                to hear from you.
              </p>
            </div>
            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm font-medium text-ink-700 transition-colors hover:text-aqua-600 dark:text-mist-200 dark:hover:text-neon-blue"
              >
                <Mail size={16} /> {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-ink-700 transition-colors hover:text-aqua-600 dark:text-mist-200 dark:hover:text-neon-blue"
              >
                <Github size={16} /> github.com/Anujsingh77
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-ink-700 transition-colors hover:text-aqua-600 dark:text-mist-200 dark:hover:text-neon-blue"
              >
                <Linkedin size={16} /> linkedin.com/in/anuj-singh-ds
              </a>
              <p className="flex items-center gap-3 text-sm font-medium text-ink-700 dark:text-mist-200">
                <MapPin size={16} /> {profile.location}
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-4 p-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink-600 dark:text-mist-400">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-ink-900/10 bg-white/60 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-aqua-500 dark:border-white/10 dark:bg-white/5 dark:text-mist-100 dark:focus:border-neon-violet"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-600 dark:text-mist-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-ink-900/10 bg-white/60 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-aqua-500 dark:border-white/10 dark:bg-white/5 dark:text-mist-100 dark:focus:border-neon-violet"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-ink-600 dark:text-mist-400">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-ink-900/10 bg-white/60 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-aqua-500 dark:border-white/10 dark:bg-white/5 dark:text-mist-100 dark:focus:border-neon-violet"
                placeholder="Tell me about the opportunity..."
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center sm:w-auto">
              Send Message <Send size={15} />
            </button>
            <p className="text-xs text-ink-500 dark:text-mist-500">
              Opens your email client with this message pre-filled — nothing
              is sent from this page directly.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
