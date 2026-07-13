import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  MessageSquareText,
  Rocket,
  Wrench,
  Users,
} from "lucide-react";
import { skillGroups } from "../data/skills.js";

const ICONS = { Code2, BrainCircuit, MessageSquareText, Rocket, Wrench, Users };

export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Toolbox
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading mb-14"
        >
          Skills &amp; Tools
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="glass-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-aqua-500/10 text-aqua-600 dark:bg-neon-violet/15 dark:text-neon-violet">
                    <Icon size={17} />
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
