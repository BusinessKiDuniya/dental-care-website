"use client";

import { useState } from "react";
import { TREATMENTS } from "@/lib/data";
import Image from "next/image";

const FILTERS = ["All", "Aligners", "Veneers", "Implants", "Whitening", "Makeover"];

const ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  category: FILTERS[(i % (FILTERS.length - 1)) + 1],
  treatment: TREATMENTS[i % TREATMENTS.length],
}));

export function GalleryGrid() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/60 bg-background text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((it) => (
            <article
              key={it.id}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-background/70"
            >
              <div className="grid aspect-4/3 grid-cols-2 gap-px bg-border">
                <BeforeAfterPanel label="Before" tone="muted" image={it.treatment.beforeTreatment} />
                <BeforeAfterPanel label="After" tone="bright" image={it.treatment.afterTreatment} />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {it.category}
                  </div>
                  <div className="font-display font-semibold">{it.treatment.name}</div>
                </div>
                <span className="rounded-full bg-mint/30 px-3 py-1 text-xs font-semibold text-mint-foreground">
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterPanel({ label, tone,image }: { label: string; tone: "muted" | "bright"; image: string }) {
  return (
    <div
      className={`relative grid place-items-center text-foreground/30 ${
        tone === "muted" ? "bg-secondary/60" : "bg-linear-to-br from-mint/40 to-primary/20"
      }`}
    >
      <Image src={image} alt={"impression image"} fill />
      {/* <span className="font-display text-3xl font-bold opacity-50">
        {label === "Before" ? "🦷" : "✨"}
      </span>
      <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
        {label}
      </span> */}
    </div>
  );
}
