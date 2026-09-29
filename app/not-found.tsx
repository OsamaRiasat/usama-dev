import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
          Nothing <span className="font-serif font-normal italic text-accent">here.</span>
        </h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink">
          Back home
        </Link>
      </div>
    </main>
  );
}
