import type { ReactNode } from "react";

function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] size-[420px] rounded-full bg-mint/40 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[-10%] size-[420px] rounded-full bg-sky/30 blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center lg:py-28">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
            {description}
          </p>
        )}
        {children && <div className="mt-8 animate-fade-up" style={{ animationDelay: "200ms" }}>{children}</div>}
      </div>
    </section>
  );
}

export { PageHero };
export default PageHero;
