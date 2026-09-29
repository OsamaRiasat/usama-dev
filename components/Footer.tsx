import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 font-mono text-xs text-faint sm:flex-row sm:items-center md:px-6">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          Built with Next.js, Tailwind &amp; Motion · Press <kbd className="rounded border border-line px-1.5 py-0.5">⌘K</kbd>
        </span>
      </div>
    </footer>
  );
}
