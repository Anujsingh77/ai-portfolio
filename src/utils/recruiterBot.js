import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import { journey } from "../data/journey.js";
import { certificates } from "../data/certificates.js";

// A small, fully local knowledge engine — no API key, no network call,
// in keeping with the "zero API keys required" philosophy of the
// Tech-Restart Learning Companion project. It matches keywords in the
// visitor's question against the same data that drives the rest of the
// site, so answers can never drift from what's actually on the page.
//
// Want it backed by a real LLM instead? Swap `getBotReply` below for a
// call to your provider of choice (e.g. the Gemini API) using a key read
// from `import.meta.env.VITE_GEMINI_API_KEY` — see README.md.

const KEYWORD_RULES = [
  {
    keywords: ["project", "built", "portfolio", "work he", "made"],
    handler: () =>
      `Anuj has shipped ${projects.length} projects. The standout is "${
        projects[0].title
      }" — ${projects[0].description} He's also built ${projects
        .slice(1)
        .map((p) => `"${p.title}"`)
        .join(", ")}. Ask me about any one of them by name for specifics.`,
  },
  {
    keywords: ["skill", "tech stack", "technolog", "know", "language", "tools"],
    handler: () =>
      `Anuj's core stack: ${skillGroups
        .map((g) => `${g.category} (${g.items.slice(0, 3).join(", ")}${g.items.length > 3 ? "…" : ""})`)
        .join(" · ")}.`,
  },
  {
    keywords: ["experience", "intern", "job", "work history", "ambassador"],
    handler: () =>
      journey
        .filter((j) => j.type === "Experience")
        .map((j) => `${j.title} at ${j.org} (${j.date}) — ${j.detail}`)
        .join(" "),
  },
  {
    keywords: ["education", "degree", "college", "study", "bca", "cgpa"],
    handler: () => {
      const edu = journey.find((j) => j.type === "Education");
      return `${edu.title} at ${edu.org}, ${edu.date}. ${edu.detail}`;
    },
  },
  {
    keywords: ["certificate", "certification", "credential", "forage", "course"],
    handler: () =>
      `Anuj holds ${certificates.length} certificates, including "${certificates[0].title}" (${certificates[0].issuer}) and "${certificates[certificates.length - 1].title}" (${certificates[certificates.length - 1].issuer}). Full list is in the Certificates section — each one opens the original PDF.`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "github"],
    handler: () =>
      `You can reach Anuj at ${profile.email}, on LinkedIn (${profile.linkedin}), or GitHub (${profile.github}). There's also a contact form in the Contact section.`,
  },
  {
    keywords: ["resume", "cv", "download"],
    handler: () =>
      `You can download Anuj's resume directly from the hero section, or here: ${profile.resumeUrl}.`,
  },
  {
    keywords: ["who is", "about him", "tell me about", "introduce"],
    handler: () => profile.longBio,
  },
  {
    keywords: ["hi", "hello", "hey"],
    handler: () =>
      `Hi! I'm a lightweight recruiter assistant for ${profile.name}'s portfolio. Ask me about his projects, skills, experience, education, or how to get in touch.`,
  },
];

const FALLBACK =
  "I can help with questions about Anuj's projects, skills, experience, education, certificates, or contact info — try asking about one of those.";

export function getBotReply(input) {
  const q = input.toLowerCase();

  // Direct project-name lookups first, so "tell me about the resume screener"
  // gets the specific project instead of the generic projects summary.
  for (const project of projects) {
    const slug = project.title.toLowerCase();
    if (
      q.includes(slug) ||
      slug.split(" ").some((word) => word.length > 4 && q.includes(word))
    ) {
      const demoLine = project.demo
        ? ` Live demo: ${project.demo}.`
        : project.screenshotsPdf
        ? " Screenshots are in the Projects section instead of a live demo."
        : "";
      return `"${project.title}" (${project.subtitle}) — ${project.description}${demoLine} Code: ${project.github}`;
    }
  }

  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((k) => q.includes(k))) {
      return rule.handler();
    }
  }

  return FALLBACK;
}

export const SUGGESTED_PROMPTS = [
  "Tell me about his projects",
  "What are his skills?",
  "Work experience?",
  "How can I contact him?",
];
