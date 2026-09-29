export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
  span?: "wide" | "tall";
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & LLM Systems",
    blurb: "Agents, retrieval and multi-model orchestration in production.",
    skills: ["LangChain", "LangGraph", "RAG", "LLMs", "GenAI", "MilvusDB", "ChromaDB", "Ollama", "Transformers", "LLaVA", "MCP"],
    span: "wide",
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs and services that scale.",
    skills: ["Python", "FastAPI", "Django", "DRF", "Flask", "Node.js", "Express.js", "GraphQL", "Celery", "RabbitMQ"],
    span: "tall",
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Fast, accessible interfaces.",
    skills: ["React", "Next.js", "Vue.js", "Redux", "Tailwind CSS", "Material-UI", "TypeScript"],
  },
  {
    id: "data",
    title: "Data",
    blurb: "Relational, document and vector stores.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS RDS"],
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    blurb: "Reproducible infrastructure, zero-drama deploys.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CloudFormation", "GitHub Actions", "CI/CD"],
    span: "wide",
  },
  {
    id: "tools",
    title: "AI-assisted Dev",
    blurb: "Shipping faster with modern tooling.",
    skills: ["Claude Code", "Cursor", "Git", "Postman", "Jira"],
  },
];
