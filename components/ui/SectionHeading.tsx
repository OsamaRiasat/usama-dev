import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
        {title} {accent && <span className="font-serif font-normal italic text-accent">{accent}</span>}
      </h2>
      {children && <div className="mt-5 max-w-2xl text-lg text-muted">{children}</div>}
    </Reveal>
  );
}
