export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

// Wrap numbers in [[...]] to render them as highlighted metrics.
export const experience: Role[] = [
  {
    company: "IGNIS Health",
    title: "Senior Software Engineer",
    period: "Oct 2024 — Present",
    location: "Remote · Charlottesville, VA",
    current: true,
    summary: "HIPAA-compliant, AI-powered healthcare platforms on AWS.",
    highlights: [
      "Architected HIPAA-compliant AI solutions on AWS with PHI security, audit logging and role-based access across every layer.",
      "Designed RAG pipelines on MilvusDB and ChromaDB for clinical knowledge retrieval, improving LLM response accuracy by [[35%]].",
      "Built multi-agent LangChain / LangGraph workflows for clinical assistants and patient intake, with real-time streaming and memory.",
      "Scaled FastAPI and Django microservices with JWT/OAuth2, cutting API latency by [[30%]] and serving [[10K+]] concurrent users.",
      "Boosted performance by [[25%]] with Redis caching, PostgreSQL tuning and async Celery processing.",
      "Reached [[99.9%]] uptime with Docker, Kubernetes and automated CI/CD on AWS EKS; infrastructure as code with Terraform and CloudFormation.",
      "Used Cursor, Claude Code and MCP tooling to ship features [[40%]] faster without sacrificing test coverage.",
    ],
    stack: ["FastAPI", "Django", "LangGraph", "MilvusDB", "ChromaDB", "PostgreSQL", "Redis", "Celery", "AWS EKS", "Terraform"],
  },
  {
    company: "OCloud Solutions",
    title: "Senior Software Engineer",
    period: "Sep 2023 — Oct 2024",
    location: "Lahore, Pakistan",
    summary: "Microservices on Django REST Framework with a testing-first culture.",
    highlights: [
      "Developed DRF microservices, increasing scalability by [[30%]] and cutting query time by [[25%]] through ORM optimisation.",
      "Achieved [[100%]] unit test coverage, reducing production bugs by [[50%]].",
      "Improved deployment speed and uptime by [[40%]] with Docker, Kubernetes and AWS automation.",
    ],
    stack: ["Django REST", "Docker", "Kubernetes", "AWS", "PyTest"],
  },
  {
    company: "Xprolabs",
    title: "Senior Software Engineer",
    period: "Jul 2022 — Sep 2023",
    location: "Lahore, Pakistan",
    summary: "Led delivery of multiple client web applications.",
    highlights: [
      "Directed development of [[3+]] scalable web apps with Django and Flask, reducing response times by [[20%]].",
      "Integrated Redis caching and GA4 analytics for faster processing and deeper user-behaviour insights.",
    ],
    stack: ["Django", "Flask", "Redis", "GA4"],
  },
  {
    company: "Square63",
    title: "Software Engineer",
    period: "Aug 2020 — Jul 2022",
    location: "Lahore, Pakistan",
    summary: "Full-stack product engineering across the SDLC.",
    highlights: [
      "Delivered full-stack solutions with Django, React and PostgreSQL, improving delivery timelines by [[15%]].",
      "Collaborated in cross-functional teams of [[5+]] to ship high-quality releases on time.",
    ],
    stack: ["Django", "React", "PostgreSQL"],
  },
];
