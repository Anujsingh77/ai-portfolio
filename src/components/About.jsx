import { motion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "../data/profile.js";

const facts = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "BCA, Mohta PG College — CGPA 8.25",
  },
  {
    icon: Sparkles,
    label: "Focus",
    value: "AI/ML systems, NLP, deployment",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: profile.location,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          About
        </motion.p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-medium leading-relaxed text-ink-800 dark:text-mist-200 sm:text-3xl"
          >
            {profile.longBio}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card flex flex-col divide-y divide-ink-900/5 dark:divide-white/10"
          >
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-500/10 text-aqua-600 dark:bg-neon-violet/15 dark:text-neon-violet">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-mist-400">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink-800 dark:text-mist-100">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
