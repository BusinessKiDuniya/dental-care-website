"use client";

import { useState } from "react";
import { BLOGS, BLOG_CATEGORIES } from "@/lib/data";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Image from "next/image";

export function BlogList() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = BLOGS.filter(
    (b) =>
      (cat === "All" || b.category === cat) &&
      (q ? (b.title + b.excerpt).toLowerCase().includes(q.toLowerCase()) : true),
  );

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/60 bg-background text-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full border border-border/60 bg-background py-2 pl-9 pr-4 text-sm outline-none ring-0"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <article
              key={b.slug}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-background/70 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-16/10 bg-linear-to-br from-primary/10 via-secondary/20 to-mint/20">
              <Image src={b.image} alt={b.title} fill />
                {/* <div className="absolute inset-0 grid place-items-center text-primary/30">
                
                  <Sparkles className="size-14" />
                </div> */}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                    {b.category}
                  </span>
                  <span className="text-muted-foreground">{b.read} read</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold leading-snug">
                  {b.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Read article <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          ))}

          {list.length === 0 && (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              No articles match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
