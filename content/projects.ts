export type Category = "AI / LLM" | "Automation" | "Full-Stack" | "E-commerce" | "FinTech" | "Healthcare";

/** Which illustrated UI mock to render while a real screenshot is missing. */
export type MockKind = "chat" | "vision" | "funding" | "shop" | "paint" | "clinical" | "flow" | "crm" | "finetune";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  categories: Category[];
  role: string;
  period?: string;
  link?: { href: string; label: string };
  confidential?: boolean;
  stack: string[];
  metrics: { value: string; label: string }[];
  problem: string;
  solution: string;
  architecture: string[];
  features: { title: string; body: string; image?: string }[];
  /**
   * Screenshots live in /public/projects/<slug>/.
   * cover: 1920×1080 desktop shot. full: optional long full-page capture (1440px wide) — auto-scrolls on hover.
   * mobile: optional 390×844. gallery: extra shots for the case-study page.
   */
  images: { cover?: string; full?: string; mobile?: string; gallery?: string[] };
  mock: MockKind;
  /** Hue (0–360) used to tint placeholders and accents for this project. */
  hue: number;
};

export const projects: Project[] = [
  {
    slug: "deftgpt",
    title: "DeftGPT",
    tagline: "One workspace, every frontier model.",
    summary:
      "A multi-model AI platform that lets teams chat with 4+ LLMs side by side, ground answers in their own documents through RAG, and work across text, image, audio and video in real time.",
    categories: ["AI / LLM", "Full-Stack"],
    role: "Backend & AI engineer",
    link: { href: "https://deftgpt.com/workspaces/new", label: "deftgpt.com" },
    stack: ["Python", "FastAPI", "React", "LangChain", "LLMs", "MilvusDB", "AWS", "Docker"],
    metrics: [
      { value: "4+", label: "LLMs supported" },
      { value: "4", label: "Modalities in real time" },
      { value: "RAG", label: "Grounded on your data" },
    ],
    problem:
      "Teams juggling several AI subscriptions had no single place to compare models, reuse context, or ask questions about their own files.",
    solution:
      "A unified FastAPI backend abstracts every provider behind one interface, streams responses to a React client, and routes document questions through a MilvusDB-backed retrieval pipeline.",
    architecture: ["React client", "FastAPI gateway", "Model router", "LangChain RAG", "MilvusDB", "LLM providers"],
    features: [
      { title: "Multi-model chat", body: "Switch or compare 4+ LLMs within the same conversation, with streaming responses." },
      { title: "Retrieval-augmented answers", body: "Upload documents; answers are grounded in the most relevant chunks from MilvusDB." },
      { title: "Multimodal input", body: "Text, image, audio and video handled in real time through a single interface." },
    ],
    images: {},
    mock: "chat",
    hue: 262,
  },
  {
    slug: "leadflow-ai",
    title: "LeadFlow AI",
    tagline: "Every lead answered, qualified and booked — automatically.",
    summary:
      "An n8n automation that captures leads from ads, forms and chat, enriches and scores them with an LLM, pushes them into the CRM and books qualified prospects straight onto the calendar — with the sales team pinged in Slack.",
    categories: ["Automation", "AI / LLM"],
    role: "Automation & AI engineer",
    stack: ["n8n", "OpenAI", "LangChain", "GoHighLevel", "HubSpot", "Webhooks", "PostgreSQL", "Slack API"],
    metrics: [
      { value: "24/7", label: "Instant lead response" },
      { value: "AI", label: "Lead scoring & routing" },
      { value: "0", label: "Manual data entry" },
    ],
    problem:
      "Leads arrived from five different sources and sat for hours before anyone replied. Sales reps copied data between tools by hand and hot prospects went cold.",
    solution:
      "A self-hosted n8n workflow ingests every lead via webhooks, enriches it, asks an LLM to score intent and fit, then routes it: hot leads get an instant personalised reply and a booking link, the rest enter a nurture sequence.",
    architecture: ["Ads · forms · chat", "n8n webhooks", "Enrichment", "LLM scoring", "CRM (GHL / HubSpot)", "Slack + calendar"],
    features: [
      { title: "Omnichannel capture", body: "One webhook layer for Meta/Google ads, website forms and chat widgets." },
      { title: "LLM qualification", body: "Structured-output prompts score intent, budget and fit, and draft a personalised first reply." },
      { title: "Hands-off booking", body: "Qualified leads get a calendar link; bookings sync back to the CRM and notify the rep in Slack." },
    ],
    images: {},
    mock: "flow",
    hue: 16,
  },
  {
    slug: "clinical-ai",
    title: "Clinical AI Platform",
    tagline: "HIPAA-grade agents for real clinical workflows.",
    summary:
      "At IGNIS Health I architect AI assistants for clinicians and patients: multi-agent LangGraph workflows, clinical RAG and the compliant infrastructure underneath. Shown as architecture only — the product handles PHI.",
    categories: ["AI / LLM", "Healthcare"],
    role: "Senior Software Engineer · IGNIS Health",
    period: "2024 — Present",
    confidential: true,
    stack: ["FastAPI", "Django", "LangGraph", "LangChain", "MilvusDB", "ChromaDB", "PostgreSQL", "Redis", "Celery", "Kubernetes", "Terraform", "AWS"],
    metrics: [
      { value: "+35%", label: "LLM response accuracy" },
      { value: "10K+", label: "Concurrent users" },
      { value: "99.9%", label: "Uptime" },
      { value: "−30%", label: "API latency" },
    ],
    problem:
      "Clinical teams needed AI help with intake and knowledge lookup — but every answer has to be accurate, auditable and never leak protected health information.",
    solution:
      "Multi-agent LangGraph workflows backed by clinical RAG on MilvusDB and ChromaDB, served by FastAPI and Django microservices with OAuth2, audit logging and RBAC on AWS EKS.",
    architecture: ["Clinician / patient UI", "OAuth2 API gateway", "LangGraph agents", "Clinical RAG", "Milvus + Chroma", "Audit log & PHI guardrails"],
    features: [
      { title: "Clinical chatbot assistants", body: "Streaming agents with memory that answer from vetted clinical knowledge." },
      { title: "Patient intake automation", body: "Agents collect and structure intake data so clinicians start with context." },
      { title: "Compliance by design", body: "PHI encryption, audit logging and role-based access at every layer." },
    ],
    images: {},
    mock: "clinical",
    hue: 168,
  },
  {
    slug: "support-copilot",
    title: "Support Copilot",
    tagline: "A fine-tuned model that sounds like your best agent.",
    summary:
      "A customer-support chatbot built on an LLM fine-tuned on historical support conversations, grounded with RAG over the help centre and wired into the helpdesk so it can resolve, tag and hand off tickets.",
    categories: ["AI / LLM", "Automation"],
    role: "AI engineer",
    stack: ["Fine-tuning", "OpenAI", "Hugging Face", "LoRA", "LangGraph", "LangChain", "RAG", "FastAPI", "n8n"],
    metrics: [
      { value: "Fine-tuned", label: "On real support threads" },
      { value: "RAG", label: "Grounded answers" },
      { value: "Human", label: "Handoff built in" },
    ],
    problem:
      "Generic chatbots answered in the wrong tone, invented policy details and frustrated customers — so the team kept answering the same questions by hand.",
    solution:
      "Cleaned and anonymised past conversations into a training set, fine-tuned a model for tone and task format, and paired it with LangGraph routing and RAG for facts. n8n syncs every conversation to the helpdesk.",
    architecture: ["Chat widget", "FastAPI", "LangGraph router", "Fine-tuned LLM", "RAG over help centre", "Helpdesk via n8n"],
    features: [
      { title: "Fine-tuning pipeline", body: "Data cleaning, PII scrubbing, train/eval splits and LoRA or hosted fine-tuning with a repeatable eval harness." },
      { title: "Grounded, on-brand answers", body: "The fine-tune owns tone and format; retrieval supplies the facts, with sources." },
      { title: "Smart handoff", body: "Low-confidence or sensitive conversations route to a human with a summary already written." },
    ],
    images: {},
    mock: "finetune",
    hue: 280,
  },
  {
    slug: "ghl-growth-engine",
    title: "GHL Growth Engine",
    tagline: "A whole agency's follow-up, running on autopilot.",
    summary:
      "GoHighLevel and Make.com automations for a service agency: pipelines, SMS and email nurture, missed-call text-back, review requests and an AI appointment-setter that books calls around the clock.",
    categories: ["Automation"],
    role: "Automation engineer",
    stack: ["GoHighLevel", "Make.com", "Zapier", "OpenAI", "Twilio", "Webhooks", "Google Sheets"],
    metrics: [
      { value: "24/7", label: "AI appointment setter" },
      { value: "Multi", label: "Channel nurture (SMS · email)" },
      { value: "Auto", label: "Reviews & reporting" },
    ],
    problem:
      "The agency's leads, calls and follow-ups lived in spreadsheets and inboxes. Missed calls were lost, and nobody had time for consistent follow-up or review requests.",
    solution:
      "Rebuilt the funnel in GoHighLevel with clear pipeline stages, and used Make.com scenarios to connect forms, calendars, Twilio and reporting sheets. An OpenAI-powered conversation bot books appointments over SMS.",
    architecture: ["Funnels & forms", "GoHighLevel CRM", "Make.com scenarios", "AI SMS assistant", "Calendar", "Reporting"],
    features: [
      { title: "Pipeline automation", body: "Leads move through stages automatically with tasks, tags and reminders for the team." },
      { title: "Missed-call text-back", body: "Every missed call gets an instant SMS that the AI assistant can turn into a booking." },
      { title: "Reviews & reporting", body: "Post-job review requests and a weekly performance sheet, fully automated." },
    ],
    images: {},
    mock: "crm",
    hue: 145,
  },
  {
    slug: "zangersecurity",
    title: "ZangerSecurity",
    tagline: "Vision-language models watching for what matters.",
    summary:
      "A distributed AI system that analyses 1000+ camera images a day with vision-language models and flags security events in real time.",
    categories: ["AI / LLM"],
    role: "AI & backend engineer",
    stack: ["Python", "FastAPI", "RabbitMQ", "LLaVA", "Ollama", "Transformers", "AWS"],
    metrics: [
      { value: "1000+", label: "Images per day" },
      { value: "Async", label: "RabbitMQ pipeline" },
      { value: "Real-time", label: "Event detection" },
    ],
    problem:
      "Security teams can't watch every feed. Traditional detectors miss context — a person is not the same as a person climbing a fence.",
    solution:
      "Images are queued through RabbitMQ to a pool of workers running LLaVA via Ollama, which describe each frame and classify events with low-latency inference.",
    architecture: ["Camera feeds", "FastAPI ingest", "RabbitMQ", "VLM workers (LLaVA)", "Event classifier", "Alerts"],
    features: [
      { title: "Async inference pipeline", body: "RabbitMQ decouples ingest from inference to keep throughput high under load." },
      { title: "Vision-language understanding", body: "LLaVA describes scenes so events are detected with context, not just bounding boxes." },
      { title: "Real-time alerts", body: "Detected events surface immediately for review." },
    ],
    images: {},
    mock: "vision",
    hue: 12,
  },
  {
    slug: "retail-capital",
    title: "Retail Capital",
    tagline: "Business funding, without the paperwork.",
    summary:
      "A platform that streamlines and automates funding for businesses and startups — from sign-up and bank verification to offers — giving them faster access to capital.",
    categories: ["FinTech", "Full-Stack"],
    role: "Backend engineer",
    link: { href: "https://jumbo.retailcapital.co.za/signup", label: "retailcapital.co.za" },
    stack: ["Python", "Django", "DRF", "Flask", "Celery", "AWS", "TruID", "GA4"],
    metrics: [
      { value: "Automated", label: "Funding workflow" },
      { value: "TruID", label: "Bank verification" },
      { value: "GA4", label: "Funnel analytics" },
    ],
    problem: "Applying for business funding meant long forms, manual document checks and slow decisions.",
    solution:
      "A Django/DRF platform with TruID-powered bank verification and Celery background jobs that automate the application pipeline end-to-end.",
    architecture: ["Applicant portal", "Django / DRF API", "TruID verification", "Celery workers", "Decisioning", "GA4"],
    features: [
      { title: "Guided application", body: "A streamlined sign-up flow that gets businesses to an offer quickly." },
      { title: "Automated verification", body: "TruID integration pulls verified banking data instead of manual uploads." },
      { title: "Background processing", body: "Celery jobs handle heavy lifting asynchronously on AWS." },
    ],
    images: {},
    mock: "funding",
    hue: 210,
  },
  {
    slug: "nookmart",
    title: "NookMart",
    tagline: "The in-game item shop that never sleeps.",
    summary:
      "An e-commerce platform where players buy Animal Crossing Bells, furniture, clothing and Nook Miles Tickets by card — delivered automatically, 24/7.",
    categories: ["E-commerce", "Full-Stack"],
    role: "Full-stack engineer",
    link: { href: "https://nookmart.com/", label: "nookmart.com" },
    stack: ["Python", "Django", "React", "Redis", "AWS"],
    metrics: [
      { value: "24/7", label: "Automated delivery" },
      { value: "Card", label: "Payments" },
      { value: "Instant", label: "Digital fulfilment" },
    ],
    problem: "Selling digital in-game goods by hand doesn't scale — buyers expect instant delivery at any hour.",
    solution:
      "A Django + React storefront with Redis-backed queues that automatically fulfil orders around the clock after card payment.",
    architecture: ["React storefront", "Django API", "Payments", "Redis queue", "Delivery automation", "AWS"],
    features: [
      { title: "Catalogue & cart", body: "Browse Bells, furniture, clothing and NMTs with a fast React storefront." },
      { title: "Card checkout", body: "Secure card payments for digital goods." },
      { title: "Automated delivery", body: "Orders are queued and delivered automatically, 24/7." },
    ],
    images: {},
    mock: "shop",
    hue: 38,
  },
  {
    slug: "gopainting",
    title: "GoPainting",
    tagline: "See the colour before you pick up the brush.",
    summary:
      "An interactive visualiser that lets homeowners apply multiple paint colours to photos of their space in real time, so they can decide with confidence.",
    categories: ["Full-Stack"],
    role: "Full-stack engineer",
    link: { href: "https://gopainting.com/", label: "gopainting.com" },
    stack: ["Django", "React", "AWS"],
    metrics: [
      { value: "Real-time", label: "Recolouring" },
      { value: "Multi", label: "Colours per image" },
      { value: "EC2", label: "Hosted on AWS" },
    ],
    problem: "Choosing paint from tiny swatches is guesswork — people want to see it on their own walls.",
    solution: "A React canvas experience backed by Django that applies multiple colours to regions of an uploaded image instantly.",
    architecture: ["Photo upload", "React canvas", "Region masking", "Django API", "AWS EC2"],
    features: [
      { title: "Live recolouring", body: "Apply colours to surfaces and see the result immediately." },
      { title: "Compare palettes", body: "Try multiple colours on the same image to make an informed choice." },
    ],
    images: {},
    mock: "paint",
    hue: 330,
  },
];

export const categories: ("All" | Category)[] = ["All", "AI / LLM", "Automation", "Healthcare", "Full-Stack", "E-commerce", "FinTech"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
