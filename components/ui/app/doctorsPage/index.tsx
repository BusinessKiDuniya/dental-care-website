// DoctorsClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/ui/app/PageHero";
import { DOCTORS } from "@/lib/data";
import { Globe, MapPin, Search, Award } from "lucide-react";

export default function Doctors() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [spec, setSpec] = useState("all");

  const cities = useMemo(() => ["all", ...Array.from(new Set(DOCTORS.map((d) => d.city)))], []);
  const specs = useMemo(() => ["all", ...Array.from(new Set(DOCTORS.map((d) => d.specialty)))], []);

  const filtered = DOCTORS.filter(
    (d) =>
      (q ? d.name.toLowerCase().includes(q.toLowerCase()) : true) &&
      (city === "all" || d.city === city) &&
      (spec === "all" || d.specialty === spec),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Our Specialists"
        title="50+ specialists. One promise."
        description="Every Lumière doctor is board-certified, experienced, and continually trained on the latest techniques."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-border/60 bg-background/70 p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_200px_240px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name…"
                  className="w-full rounded-full border border-border/60 bg-background py-2 pl-9 pr-4 outline-none"
                />
              </div>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-full border border-border/60 bg-background px-3 py-2 outline-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All cities" : c}
                  </option>
                ))}
              </select>

              <select
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                className="rounded-full border border-border/60 bg-background px-3 py-2 outline-none"
              >
                {specs.map((s) => (
                  <option key={s} value={s}>
                    {s === "all" ? "All specialties" : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <article
                key={d.slug}
                className="group overflow-hidden rounded-3xl border border-border/60 bg-background/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={typeof d.image === "string" ? d.image : (d.image as string)}
                    alt={d.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                    <Award className="mr-1 inline size-3 text-primary" />
                    {d.experience}+ yrs
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold">{d.name}</h3>
                  <p className="text-sm text-primary">{d.specialty}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.qualification}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />{d.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="size-3" />{d.languages.join(", ")}
                    </span>
                  </div>
                  <Link
                    href="/book"
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Book appointment
                  </Link>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full py-12 text-center text-muted-foreground">
                No doctors match your filters.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}