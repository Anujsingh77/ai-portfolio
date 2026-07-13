import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { profile } from "../data/profile.js";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 py-2.5 transition-shadow ${
            scrolled ? "shadow-glass" : "shadow-none"
          }`}
        >
          <a
            href="#hero"
            className="font-display text-lg font-semibold tracking-tight"
          >
            <span className="text-ink-900 dark:text-mist-50">Anuj</span>
            <span className="bg-gradient-to-r from-aqua-500 to-neon-violet dark:from-neon-violet dark:to-neon-blue bg-clip-text text-transparent">
              .Singh
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === l.id
                    ? "bg-ink-900/5 text-aqua-600 dark:bg-white/10 dark:text-neon-blue"
                    : "text-ink-700 hover:text-ink-900 dark:text-mist-300 dark:hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden rounded-full p-2 text-ink-700 transition-colors hover:text-aqua-600 dark:text-mist-300 dark:hover:text-neon-blue sm:inline-flex"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden rounded-full p-2 text-ink-700 transition-colors hover:text-aqua-600 dark:text-mist-300 dark:hover:text-neon-blue sm:inline-flex"
            >
              <Linkedin size={18} />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full p-2 text-ink-700 transition-colors hover:text-aqua-600 dark:text-mist-300 dark:hover:text-neon-blue"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="rounded-full p-2 text-ink-700 dark:text-mist-300 md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 overflow-hidden rounded-2xl md:hidden"
            >
              <div className="flex flex-col p-2">
                {LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium ${
                      active === l.id
                        ? "bg-ink-900/5 text-aqua-600 dark:bg-white/10 dark:text-neon-blue"
                        : "text-ink-700 dark:text-mist-300"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
