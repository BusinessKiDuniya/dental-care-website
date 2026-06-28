import { PageHero } from "@/components/ui/app/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TREATMENTS } from "@/lib/data";
import {
  Sparkles, Activity, AlignJustify, Smile, Sun, Wand2, Crown, Baby, Heart, Scissors, Droplets, Siren, ArrowRight,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const ICONS = { Sparkles, Activity, AlignJustify, Smile, Sun, Wand2, Crown, Baby, Heart, Scissors, Droplets, Siren } as const;

export const metadata : Metadata = {
    title: "Treatments — Lumière Dental | Implants, RCT, Aligners, Whitening",
    description: "Explore every treatment offered at Lumière Dental — dental implants, RCT, braces, invisible aligners, whitening, smile makeover, kids dentistry & more.",
    openGraph: {
        title: "All Dental Treatments — Lumière",
        url: "/treatments",
        description: "Explore every treatment offered at Lumière Dental — dental implants, RCT, braces, invisible aligners, whitening, smile makeover, kids dentistry & more.",
    },
};

function TreatmentsPage() {
  return (
    <>
    
      <PageHero
        eyebrow="Treatments"
        title="World-class dentistry, end to end"
        description="From routine cleanings to complete smile makeovers — every treatment performed by a specialist in their field."
        />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TREATMENTS.map((t) => {
                const Icon = ICONS[t.icon as keyof typeof ICONS] ?? Sparkles;
                return (
                    <Card key={t.slug} className="group rounded-3xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-glow">
                  <CardContent className="p-7">
                    <div className="grid size-14 place-items-center rounded-2xl gradient-mint text-mint-foreground shadow-soft">
                      <Icon className="size-7" />
                    </div>
                    <h2 className="mt-5 font-display text-xl font-bold">{t.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
                    <div className="mt-6 space-y-1.5 text-sm text-muted-foreground">
                      <Row label="Procedure time" value="30–90 min" />
                      <Row label="Recovery" value="1–3 days" />
                      <Row label="EMI" value="0% available" />
                    </div>
                    <div className="mt-6 flex gap-2">
                      <Button asChild size="sm" className="flex-1 rounded-full gradient-primary text-primary-foreground"><Link href="/book">Book now</Link></Button>
                      <Button asChild size="sm" variant="outline" className="rounded-full"><Link href="/contact">Ask <ArrowRight className="ml-1 size-3.5" /></Link></Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
  
  </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-border/60 pt-1.5">
      <span>{label}</span><span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}


export default TreatmentsPage;
