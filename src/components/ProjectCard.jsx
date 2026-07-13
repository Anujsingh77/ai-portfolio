import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Images, FileText } from "lucide-react";
import Lightbox from "./Lightbox.jsx";

export default function ProjectCard({ project, index }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const hasScreenshots = project.screenshots?.length > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className={`glass-card group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 ${
        project.featured ? "lg:col-span-2" : ""
      }`}
    >
      {hasScreenshots && (
        <div
          className={`grid gap-1 p-1 ${
            project.featured ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-3"
          }`}
        >
          {project.screenshots.slice(0, project.featured ? 8 : 3).map((src, i) => (
            <button
              key={src}
              onClick={() => setLightboxIndex(i)}
              className="group/thumb relative aspect-video overflow-hidden rounded-lg bg-ink-900/5 dark:bg-white/5"
              aria-label={`Open screenshot ${i + 1}`}
            >
              <img
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all group-hover/thumb:bg-ink-950/30 group-hover/thumb:opacity-100">
                <Images size={16} className="text-white" />
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">
            {project.title}
          </h3>
        </div>
        <p className="mb-3 font-mono text-xs text-aqua-600 dark:text-neon-blue">
          {project.subtitle}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-ink-600 dark:text-mist-300">
          {project.description}
        </p>

        {project.highlights?.length > 0 && (
          <ul className="mb-5 space-y-1.5">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2 text-sm text-ink-600 dark:text-mist-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aqua-500 dark:bg-neon-violet" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mb-6 mt-auto flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !px-4 !py-2 text-xs"
          >
            <Github size={14} /> Code
          </a>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2 text-xs"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}

          {hasScreenshots && (
            <button
              onClick={() => setLightboxIndex(0)}
              className="btn-primary !px-4 !py-2 text-xs"
            >
              <Images size={14} /> View Screenshots
            </button>
          )}

          {project.screenshotsPdf && (
            <a
              href={project.screenshotsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-4 !py-2 text-xs"
            >
              <FileText size={14} /> Full PDF
            </a>
          )}
        </div>
      </div>

      {hasScreenshots && (
        <Lightbox
          images={project.screenshots}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </motion.article>
  );
}
