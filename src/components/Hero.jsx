import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import CursorGlow from "./CursorGlow.jsx";
import IntroVideo from "./IntroVideo.jsx";
import { profile } from "../data/profile.js";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark bg-[length:44px_44px] opacity-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)] dark:opacity-100" />
      <div className="pointer-events-none absolute inset-0">
        <CursorGlow />
      </div>
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-aqua-400/20 blur-3xl dark:bg-neon-violet/20 animate-blob"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-neon-blue/10 blur-3xl dark:bg-neon-blue/20 animate-blob"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={-1}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-ink-700 dark:text-mist-200">
              Open to Data Scientist &amp; ML Engineer roles
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="eyebrow mb-5"
          >
            {profile.headline} · {profile.subHeadline}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-aqua-500 via-aqua-600 to-neon-violet dark:from-neon-violet dark:via-neon-blue dark:to-neon-pink bg-clip-text text-transparent">
              {profile.name.split(" ")[1]}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-mist-300"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary">
              View Projects <ArrowDown size={15} />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="btn-secondary"
            >
              Download Resume <Download size={15} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex items-center gap-2"
          >
            {[
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-all hover:-translate-y-0.5 hover:text-aqua-600 dark:text-mist-200 dark:hover:text-neon-blue"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <div className="mx-auto w-full max-w-sm">
            <IntroVideo />
            <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-widest text-ink-500 dark:text-mist-400">
              10-second intro
            </p>
          </div>
          <div className="glass-card relative mx-auto w-full max-w-sm overflow-hidden p-2 animate-float">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="aspect-[4/5] w-full rounded-xl object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
