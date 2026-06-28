"use client";

import { useState } from "react";
import Link from "next/link";
import { CLINICS } from "@/lib/data";
import { Car, Clock, MapPin, Phone, Search, ShieldCheck } from "lucide-react";

export function ClinicsList() {
  const [q, setQ] = useState("");
  const filtered = CLINICS.filter((c) =>
    `${c.city} ${c.area} ${c.address}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative mx-auto max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city, area or PIN..."
            className="w-full rounded-full border border-border/60 bg-background py-4 pl-10 pr-4 outline-none"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <article
              key={c.slug}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-background/70 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/10 via-secondary/20 to-mint/20">
                <div className="absolute inset-0 grid place-items-center text-primary/40">
                  <MapPin className="size-12" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold">{c.city}</h3>
                  <span className="text-sm text-muted-foreground">{c.area}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.address}</p>

                <div className="mt-4 space-y-1.5 text-sm">
                  <p className="flex items-center gap-2">
                    <Phone className="size-4 text-primary" />
                    <a href={`tel:${c.phone}`}>{c.phone}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" /> {c.hours}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Car className="size-3.5" /> Free parking <span>•</span>
                    <ShieldCheck className="size-3.5" /> Wheelchair access
                  </p>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link
                    href="/book"
                    className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Book here
                  </Link>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border/60 px-4 py-2 text-sm font-medium"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
