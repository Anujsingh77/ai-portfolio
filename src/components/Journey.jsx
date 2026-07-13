import { motion } from "framer-motion";
import { journey } from "../data/journey.js";

const TYPE_STYLES = {
  Education: "bg-aqua-500/10 text-aqua-600 dark:bg-neon-blue/15 dark:text-neon-blue",
  Experience:
    "bg-emerald-500/10 text-emerald-600 dark:bg-neon-violet/15 dark:text-neon-violet",
  Activity: "bg-amber-500/10 text-amber-600 dark:bg-neon-pink/15 dark:text-neon-pink",
};

export default function Journey() {
  return (
    <section id="journey" className="relative py-28">
      <div className="mx-auto max-w-4xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Timeline
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading mb-14"
        >
          My Journey
        </motion.h2>

        <div className="relative border-l border-ink-900/10 dark:border-white/10">
          {journey.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="relative pb-12 pl-8 last:pb-0"
            >
              <span
                className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-mist-50 bg-aqua-500 dark:border-ink-900 dark:bg-neon-violet"
                aria-hidden="true"
              />
              <p className="font-mono text-xs tracking-wide text-ink-500 dark:text-mist-400">
                {item.date}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    TYPE_STYLES[item.type]
                  }`}
                >
                  {item.type}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-ink-600 dark:text-mist-300">
                {item.org}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 dark:text-mist-400">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
