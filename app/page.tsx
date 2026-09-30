import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Capabilities from "@/components/sections/Capabilities";
import Projects from "@/components/projects/Projects";
import Approach from "@/components/sections/Approach";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  sameAs: [profile.links.linkedin, profile.links.github],
  knowsAbout: ["AI agents", "Chatbots", "LLM fine-tuning", "LangGraph", "LangChain", "RAG", "n8n", "Make.com", "GoHighLevel", "FastAPI", "Django", "React", "AWS"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Capabilities />
        <Projects />
        <Approach />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
