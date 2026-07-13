import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-900/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-ink-500 dark:text-mist-500">
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite,
          Tailwind CSS &amp; Framer Motion.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-500 transition-colors hover:text-aqua-600 dark:text-mist-500 dark:hover:text-neon-blue"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink-500 transition-colors hover:text-aqua-600 dark:text-mist-500 dark:hover:text-neon-blue"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-ink-500 transition-colors hover:text-aqua-600 dark:text-mist-500 dark:hover:text-neon-blue"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
