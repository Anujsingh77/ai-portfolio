import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { certificates } from "../data/certificates.js";

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Credentials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading mb-3"
        >
          Certificates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-14 max-w-xl text-sm text-ink-600 dark:text-mist-400"
        >
          Click any certificate to open the original, full-format document.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="glass-card group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
              aria-label={`Open ${cert.title} certificate PDF`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate from ${cert.issuer}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all duration-300 group-hover:bg-ink-950/40 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-900">
                    <ExternalLink size={13} /> Open PDF
                  </span>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-aqua-600 dark:text-neon-blue">
                  {cert.issuer}
                  {cert.via ? ` · via ${cert.via}` : ""}
                </p>
                <h3 className="mt-1.5 font-display text-base font-semibold leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs text-ink-500 dark:text-mist-400">
                  {cert.date}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.slice(0, 3).map((s) => (
                    <span key={s} className="pill !text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
