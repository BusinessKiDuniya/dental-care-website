
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/app/PageHero";
import { TESTIMONIALS } from "@/lib/data";
import { MapPin, Quote, Star, PlayCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Stories — Lumière Dental reviews & testimonials",
  description:
    "Read 2,800+ verified patient reviews from Lumière Dental clinics across India. 4.9/5 average rating on Google.",
    "openGraph": {
        "title": "Patient Stories — Lumière Dental reviews & testimonials",
        "description": "Read 2,800+ verified patient reviews from Lumière Dental clinics across India. 4.9/5 average rating on Google.",
    }
};


function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Stories"
        title="2,800+ verified reviews. 4.9 / 5 average."
        description="Honest words from real patients across India. We're proud to be their dentists."
        />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <Card key={i} className="rounded-3xl border-border/60">
                <CardContent className="p-6">
                  <Quote className="size-7 text-primary/30" />
                  <p className="mt-3 text-sm leading-relaxed">"{t.text}"</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" />{t.city}</div>
                    </div>
                    <div className="flex gap-0.5 text-[oklch(0.78_0.16_85)]">
                      {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="size-4 fill-current" />)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-center font-display text-2xl font-bold">Video stories</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="group relative aspect-video overflow-hidden rounded-3xl border-border/60 gradient-hero">
                  <button aria-label="Play video" className="absolute inset-0 grid place-items-center text-primary transition-transform group-hover:scale-105">
                    <PlayCircle className="size-16" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
   </>
  );
}

export default TestimonialsPage;