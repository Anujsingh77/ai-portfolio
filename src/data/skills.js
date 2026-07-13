// Single source of truth for skills — pulled once from the resume's
// TECHNICAL SKILLS block so no skill is ever listed twice across the site.
export const skillGroups = [
  {
    category: "Languages",
    icon: "Code2",
    items: ["Python", "HTML", "JavaScript", "C++"],
  },
  {
    category: "ML & Data",
    icon: "BrainCircuit",
    items: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "TensorFlow",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    category: "NLP",
    icon: "MessageSquareText",
    items: ["spaCy", "NLTK", "NLP Pipelines", "Prompt Engineering"],
  },
  {
    category: "Deployment",
    icon: "Rocket",
    items: ["Flask", "Streamlit", "Docker", "Streamlit Cloud", "Render"],
  },
  {
    category: "Tools",
    icon: "Wrench",
    items: ["Git", "GitHub", "SQL", "VS Code", "Web Scraping"],
  },
  {
    category: "Professional & Soft Skills",
    icon: "Users",
    items: [
      "Structured Problem-Solving (McKinsey Approach)",
      "Business Communication",
      "Adaptability & Resilience",
      "Digital Toolkit Fundamentals",
    ],
  },
];
