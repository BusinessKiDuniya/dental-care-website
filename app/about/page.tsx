import type { Metadata } from "next";
import { Heart, Eye, Target, Award, Sparkles, Building2 } from "lucide-react";
import { PageHero } from "@/components/ui/app/PageHero";

export const metadata: Metadata = {
  title: "About — Lumière Dental",
  description:
    "Since 2005, Lumière Dental has cared for 10,000+ smiles across India. Learn about our mission, values, and journey.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Patient-first, always",
    text: "Every decision starts with what's right for the person in the chair.",
  },
  {
    icon: Target,
    title: "Clinical excellence",
    text: "World-class equipment, board-certified specialists, evidence-based protocols.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    text: "Itemised quotes, honest second opinions, no surprises.",
  },
  {
    icon: Sparkles,
    title: "Genuine warmth",
    text: "Hospitality you'd expect from a luxury hotel, not a hospital.",
  },
];

const TIMELINE = [
  {
    year: "2005",
    title: "First clinic opens in Bengaluru",
    text: "A single-chair practice with one promise — honest, pain-free care.",
  },
  {
    year: "2011",
    title: "5 clinics, 25 specialists",
    text: "Lumière becomes one of South India's most-recommended dental chains.",
  },
  {
    year: "2017",
    title: "Digital-first transformation",
    text: "Intra-oral scanners, CBCT and digital smile design rolled out chain-wide.",
  },
  {
    year: "2021",
    title: "Award for clinical excellence",
    text: "Recognised by IDA for sterilisation and outcome standards.",
  },
  {
    year: "2024",
    title: "15 clinics, 50+ specialists",
    text: "Serving 10,000+ patients a year across 6 cities in India.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Our Story"
        title="Twenty years of better dental care"
        description="From a single chair in Bengaluru to 15 premium clinics across India — built on one promise: honest, pain-free care."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-muted-foreground">
            <h2 className="font-display text-3xl font-bold text-foreground">Founder&apos;s note</h2>
            <p>
              I started Lumière because dentistry in India deserved better. Better
              technology. Better honesty. Better hospitality. Twenty years on,
              that mission hasn&apos;t changed.
            </p>
            <p>
              We&apos;ve stayed obsessed with two things: clinical outcomes that
              match the world&apos;s best, and a patient experience that earns
              trust the old-fashioned way — by being kind, careful, and clear
              about pricing.
            </p>
            <p className="font-display text-lg font-semibold italic text-foreground">
              — Dr. Priya Menon, Founder
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard icon={Building2} num="15" label="Premium clinics" />
            <StatCard icon={Sparkles} num="50+" label="Specialists" />
            <StatCard icon={Heart} num="10K+" label="Happy patients" />
            <StatCard icon={Award} num="12" label="Industry awards" />
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-gradient-to-b from-secondary/30 to-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Mission & Vision
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              What we live by
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-sm">
              <Target className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                Make world-class dental care accessible, transparent and genuinely
                pain-free for every Indian who walks through our doors.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-sm">
              <Eye className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">
                Be the most-loved and most-recommended dental chain in India —
                known equally for clinical excellence and human warmth.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-mint/20 text-mint-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-semibold text-mint-foreground">
              Our Journey
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Two decades, one mission
            </h2>
          </div>

          <div className="relative mt-12 space-y-8 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-border md:before:left-1/2">
            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className={`relative grid gap-4 md:grid-cols-2 md:gap-8 ${index % 2 ? "md:[direction:rtl]" : ""}`}
              >
                <div
                  className={`pl-12 md:pl-0 ${index % 2 ? "md:text-left md:[direction:ltr]" : "md:text-right"}`}
                >
                  <div className="font-display text-3xl font-bold text-primary">
                    {item.year}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
                <div className="absolute left-1.5 top-1.5 size-5 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  num,
  label,
}: {
  icon: typeof Heart;
  num: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/50 to-mint/10 p-6 text-center shadow-sm">
      <Icon className="mx-auto size-7 text-primary" />
      <div className="mt-3 font-display text-3xl font-bold text-primary">{num}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
