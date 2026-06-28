import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentForm from "@/components/ui/app/AppointmentForm";
import { Counter } from "@/components/ui/app/Counter";
import {
  ArrowRight,
  CalendarCheck,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  Sparkles,
  Activity,
  AlignJustify,
  Smile,
  Sun,
  Wand2,
  Crown,
  Baby,
  Heart,
  Scissors,
  Droplets,
  Siren,
  Cpu,
  GraduationCap,
  Wallet,
  CalendarClock,
  Quote,
  MapPin,
  Award,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { CLINIC, STATS, TREATMENTS, WHY_US, DOCTORS, TESTIMONIALS, OFFERS, FAQS, BLOGS, PARTNERS } from "@/lib/data";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ICONS = {
  Sparkles,
  Activity,
  AlignJustify,
  Smile,
  Sun,
  Wand2,
  Crown,
  Baby,
  Heart,
  Scissors,
  Droplets,
  Siren,
  Cpu,
  ShieldCheck,
  GraduationCap,
  Wallet,
  CalendarClock,
} as const;

export const metadata: Metadata = {
  title: "Super Dental — Premium pain-free dentistry across India",
  description:
    "15 premium dental clinics. 50+ board-certified specialists. Implants, aligners, whitening, RCT and more. Book a free consultation today.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <DoctorsTeaser />
      <Testimonials />
      <Offers />
      <Partners />
      <Blogs />
      <FAQ />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-20 size-[480px] rounded-full bg-mint/30 blur-3xl animate-blob" />
      <div aria-hidden className="pointer-events-none absolute top-20 -right-32 size-[520px] rounded-full bg-sky/25 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <Badge className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-primary hover:bg-primary/10 animate-fade-in">
            <Sparkles className="mr-1.5 size-3" /> Trusted by 10,000+ patients across India
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl animate-fade-up">
            Your <span className="text-gradient">brightest smile</span> deserves the finest care.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg animate-fade-up" style={{ animationDelay: "100ms" }}>
            Premium, pain-free dentistry from board-certified specialists. 15 luxury clinics. Same-day appointments. EMI from 0%.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button asChild size="lg" className="rounded-full gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
              <Link href="/book"><CalendarCheck className="mr-2 size-4" /> Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/30 text-foreground hover:bg-primary/5">
              <a href={`tel:${CLINIC.phone}`}><Phone className="mr-2 size-4" /> Call Now</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full text-[oklch(0.55_0.16_150)] hover:bg-[oklch(0.95_0.06_150)]">
              <a href={`https://wa.me/${CLINIC.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener"><MessageCircle className="mr-2 size-4" /> WhatsApp</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-primary" /> IDA certified</div>
            <div className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> 100% sterile</div>
            <div className="flex items-center gap-1.5"><Star className="size-4 fill-[oklch(0.78_0.16_85)] text-[oklch(0.78_0.16_85)]" /> 4.9 / 5 on Google</div>
            <div className="flex items-center gap-1.5"><Siren className="size-4 text-destructive" /> 24×7 emergency</div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-glow">
            <img src={"/hero-dental.jpg"} alt="Modern Lumière Dental clinic interior with premium chair" width={1600} height={1200} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-4 bg-white hidden w-72 rounded-2xl glass-card p-4 shadow-card md:block animate-float">
            <div className="flex items-center gap-3">
              <Avatar className="size-12 border-2 border-primary/20">
                <AvatarImage src={"/smiling-lady.jpg"} alt="smiling women testimonial" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1 text-[oklch(0.78_0.16_85)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
                </div>
                <p className="text-xs text-muted-foreground">"Painless and quick. Loved the experience."</p>
                <p className="mt-0.5 text-xs font-semibold text-foreground">Priya S. — Bengaluru</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 hidden rounded-2xl bg-white px-4 py-3 shadow-card md:block animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="text-xs text-muted-foreground">Today's available slots</div>
            <div className="mt-1 flex items-center gap-1 font-display text-lg font-bold">
              <Clock className="size-4 text-primary" /> 12 left
            </div>
          </div>
        </div>
      </div>

      <QuickForm />
    </section>
  );
}

function QuickForm() {
  return (
    <div className="relative mx-auto -mb-16 max-w-5xl px-4 pb-8 lg:px-8">
      <div className="relative -top-2 rounded-3xl border border-border/60 bg-background/90 p-6 shadow-card md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold">Quick Appointment</h2>
            <p className="text-sm text-muted-foreground">First consultation is free. Takes 30 seconds.</p>
          </div>
          <span className="hidden rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground md:inline-flex">⚡ Same-day slots</span>
        </div>
        <AppointmentForm compact />
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="px-4 pb-20 pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-gradient-to-br from-secondary/60 to-mint/20 p-6 md:p-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-primary md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground md:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="px-4 py-20 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">Treatments</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Every smile, expertly cared for</h2>
          <p className="mt-3 text-muted-foreground">From routine cleanings to full smile makeovers — under one luxurious roof.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENTS.map((t) => {
            const Icon = ICONS[t.icon as keyof typeof ICONS] ?? Sparkles;
            return (
              <div key={t.slug} className="group rounded-2xl border border-border/60 bg-background/80 p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="grid size-12 place-items-center rounded-xl bg-mint/20 text-mint-foreground shadow-soft transition-transform group-hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{t.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.blurb}</p>
                <Link href="/treatments" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section-pad bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-card relative w-[80%] max-md:w-full aspect-[4/5] max-sm:h-[250px] ">
              <Image src={"/smiling-lady.jpg"} alt="smiling lady" fill objectFit="cover" />
              {/* <img src={"/smiling-lady.jpg"} alt="Patient smiling after Lumière treatment" width={1200} height={800} loading="lazy" className="aspect-[5/6] w-full object-cover" /> */}
            </div>
            <div className="absolute -right-4 bottom-8 hidden rounded-2xl bg-white p-5 shadow-card md:block">
              <div className="flex items-center gap-3">
                <Award className="size-8 text-primary" />
                <div>
                  <div className="font-display text-lg font-bold">IDA Excellence</div>
                  <div className="text-xs text-muted-foreground">Award 2024</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">Why Lumière</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">A different kind of dental visit</h2>
            <p className="mt-3 text-muted-foreground">From the moment you walk in, you'll feel the difference — clinical excellence wrapped in genuine care.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHY_US.map((w) => {
                const Icon = ICONS[w.icon as keyof typeof ICONS] ?? Sparkles;
                return (
                  <div key={w.title} className="flex gap-3 rounded-2xl border border-border/50 bg-card p-4">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{w.title}</div>
                      <p className="text-sm text-muted-foreground">{w.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorsTeaser() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">Our Specialists</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Meet the people behind your smile</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/doctors">
              View all doctors <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCTORS.slice(0, 3).map((d) => (
            <article key={d.slug} className="group overflow-hidden rounded-3xl border border-border/60 bg-background/80 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="relative aspect-99/100   overflow-hidden bg-linear-to-br from-primary/10 via-secondary/20 to-mint/20 p-5">
                <div className="flex h-full items-end rounded-2xl border border-border/50 bg-white/70 p-4">
                  {/* <div className="grid border-2 border-red-500 relative size-14 place-items-center rounded-full bg-primary/10 text-lg font-semibold text-primary"> */}
                  <Image src={d.image} alt={d.name} fill objectFit="cover" objectPosition="top" />
                  {/* {d.name.split(" ")[1]?.[0] ?? "D"} */}
                  {/* </div> */}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-5 text-white">
                  <div className="text-xs uppercase tracking-wider opacity-80">{d.specialty}</div>
                  <div className="font-display text-xl font-bold">{d.name}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{d.qualification}</span>
                  <span>•</span>
                  <span>{d.experience}+ yrs</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" className="flex-1 rounded-full bg-primary text-primary-foreground">
                    <Link href="/book">Book</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <Link href="/doctors">Profile</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-secondary/40 to-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Patient Stories</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">10,000+ smiles, and counting</h2>
          <p className="mt-3 text-muted-foreground">Honest reviews from real patients across India.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="rounded-3xl border border-border/60 bg-background/80 p-6">
              <Quote className="size-7 text-primary/30" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">“{t.text}”</p>
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" />{t.city}</div>
                </div>
                <div className="flex gap-0.5 text-[oklch(0.78_0.16_85)]">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="size-4 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">Offers</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Premium care, transparent prices</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/offers">All offers <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.slice(0, 3).map((o, i) => (
            <div key={i} className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-secondary/20 to-mint/20 p-6">
              <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">{o.tag}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{o.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{o.desc}</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="font-display text-3xl font-bold text-primary">{o.price}</span>
                <span className="text-sm text-muted-foreground line-through">{o.original}</span>
              </div>
              <Button asChild className="mt-5 w-full rounded-full bg-primary text-primary-foreground">
                <Link href="/book">Avail this offer</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted technology partners</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {PARTNERS.map((p) => (
            <span key={p} className="font-display text-lg font-bold text-foreground/60">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">From the journal</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Tips, guides and answers</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/blog">All articles <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOGS.slice(0, 3).map((b) => (
            <article key={b.slug} className="group overflow-hidden rounded-3xl border border-border/60 bg-background/80">
              <div className="relative aspect-16/10 bg-linear-to-br from-primary/10 via-secondary/20 to-mint/20">

                <Image src={b.image} alt={b.title} fill />

              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{b.category}</span>
                  <span className="text-muted-foreground">{b.read} read</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="bg-gradient-to-b from-secondary/40 to-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">FAQs</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Questions, answered</h2>
        </div>
        <Accordion type="single" collapsible className="mt-8">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="mb-3 rounded-2xl border border-border/60 bg-background/80 px-4 last:mb-0">
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-mint p-10 text-primary-foreground shadow-glow md:p-16">
          <div aria-hidden className="absolute -top-10 -right-10 size-64 rounded-full bg-white/15 blur-3xl" />
          <div aria-hidden className="absolute -bottom-10 -left-10 size-64 rounded-full bg-mint/30 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Ready for your best smile?</h2>
              <p className="mt-3 max-w-xl text-primary-foreground/90">Book your free consultation today. Same-day slots, EMI from 0%, and a pain-free guarantee.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/book">
                  <CalendarCheck className="mr-2 size-4" /> Book free visit
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10">
                <a href={`tel:${CLINIC.phone}`}>
                  <Phone className="mr-2 size-4" /> Call now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
