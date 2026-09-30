export const profile = {
  name: "Usama Riasat",
  firstName: "Usama",
  role: "Senior Software Engineer",
  tagline: "I build production AI systems — agents, chatbots, fine-tuned models and automations, plus the scalable backends behind them.",
  intro:
    "Senior Software Engineer with 6+ years shipping web platforms and AI-native systems in Python and React. I design multi-agent LangGraph workflows, chatbots, fine-tuned LLMs and n8n / Make.com / GoHighLevel automations — including HIPAA-compliant RAG for healthcare.",
  location: "Lahore, Pakistan · Remote",
  available: true,
  email: "osamariasat@gmail.com",
  links: {
    github: "https://github.com/OsamaRiasat",
    linkedin: "https://www.linkedin.com/in/osamariasat/",
    resume: "/Usama-Riasat-Resume.pdf",
  },
  typed: ["AI agents with LangGraph", "chatbots that book meetings", "fine-tuned LLMs", "n8n & Make.com automations", "GoHighLevel workflows", "HIPAA-compliant RAG"],
  stats: [
    { value: 6, suffix: "+", label: "Years shipping production software" },
    { value: 35, suffix: "%", label: "Better LLM accuracy via RAG" },
    { value: 10, suffix: "K+", label: "Concurrent healthcare users" },
    { value: 99.9, suffix: "%", label: "Uptime on AWS EKS", decimals: 1 },
    { value: 40, suffix: "%", label: "Faster delivery with AI tooling" },
  ],
} as const;

export const certificates = [
  {
    title: "Building Ambient Agents with LangGraph",
    issuer: "LangChain Academy",
    href: "https://academy.langchain.com/certificates/7yjwjilhhg",
  },
  { title: "Meta Front-End Developer", issuer: "Coursera" },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "PUCIT / FCIT",
  period: "2016 — 2020",
  location: "Lahore, Pakistan",
};
