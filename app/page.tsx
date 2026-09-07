import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "lucide-react";

import {
  BLOGS,
  PARTNERS,
} from "@/lib/data";

import { Badge } from "@/components/ui/badge";
import { BookingDialog } from "@/components/ui/app/bookingDialog";
import { dentist } from "@/data";

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

type Dentist = (typeof dentist)[number];

type PageProps = {
  searchParams: Promise<{
    n?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;

  const index = Number(params.n);

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= dentist.length
  ) {
    return {
      title: "Dental Clinic | Find the Best Dentist",
      description:
        "Find trusted dental clinics and dentists in Burari, Delhi.",
    };
  }

  const clinic = dentist[index];

  return {
    title: clinic.seo.title,
    description: clinic.seo.description,
    keywords: clinic.seo.keywords,
  };
}

export default async function HomePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const index = Number(params.n);

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= dentist.length
  ) {
    notFound();
  }

  const clinic = dentist[index];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero clinic={clinic} />
      <Stats clinic={clinic} />
      <Services clinic={clinic} />
      <WhyUs clinic={clinic} />
      <DoctorsTeaser clinic={clinic} />
      <Testimonials clinic={clinic} />
      <Offers clinic={clinic} />
      <Partners />
      <Blogs />
      <FAQ clinic={clinic} />
      <CTA clinic={clinic} />
    </div>
  );
}


function Hero({ clinic }: { clinic: Dentist }) {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 size-[480px] rounded-full bg-mint/30 blur-3xl animate-blob"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -right-32 size-[520px] rounded-full bg-sky/25 blur-3xl animate-blob"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <Badge className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-primary hover:bg-primary/10 animate-fade-in">
            <Sparkles className="mr-1.5 size-3" />

            {clinic.category}
          </Badge>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl animate-fade-up">
            {clinic.name}
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg animate-fade-up">
            {clinic.tagline}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex items-center gap-1 text-[oklch(0.78_0.16_85)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-current"
                />
              ))}
            </div>

            <span className="font-semibold">
              {clinic.rating}
            </span>

            <span className="text-muted-foreground">
              ({clinic.reviewCount} reviews)
            </span>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <BookingDialog
              note={`I Want Appointment with ${clinic.name}`}
            >
              <Button
                size="lg"
                className="rounded-full gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
              >
                <CalendarCheck className="mr-2 size-4" />
                Book Appointment
              </Button>
            </BookingDialog>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary/30 text-foreground hover:bg-primary/5"
            >
              <a href={`tel:${clinic.phone}`}>
                <Phone className="mr-2 size-4" />
                Call Now
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full text-[oklch(0.55_0.16_150)] hover:bg-[oklch(0.95_0.06_150)]"
            >
              <a
                href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 size-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-primary" />
              {clinic.category}
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Patient-focused care
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-[oklch(0.78_0.16_85)] text-[oklch(0.78_0.16_85)]" />
              {clinic.rating} / 5 on Google
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {clinic.area}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />

            <span>{clinic.address}</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-glow">
            <img
              src={
                clinic.images?.[0] ||
                "/hero-dental.jpg"
              }
              alt={clinic.name}
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 hidden w-72 rounded-2xl bg-white p-4 shadow-card md:block animate-float">
            <div className="flex items-center gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Star className="size-5 fill-current" />
              </div>

              <div>
                <div className="flex items-center gap-1 text-[oklch(0.78_0.16_85)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-current"
                    />
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  {clinic.reviewCount}+ Google reviews
                </p>

                <p className="mt-0.5 text-xs font-semibold text-foreground">
                  {clinic.rating}/5 rating
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 hidden rounded-2xl bg-white px-4 py-3 shadow-card md:block animate-float">
            <div className="text-xs text-muted-foreground">
              Patient rating
            </div>

            <div className="mt-1 flex items-center gap-1 font-display text-lg font-bold">
              <Star className="size-4 fill-[oklch(0.78_0.16_85)] text-[oklch(0.78_0.16_85)]" />
              {clinic.rating}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Stats({ clinic }: { clinic: Dentist }) {
  const stats = [
    {
      value: clinic.rating,
      suffix: "/5",
      label: "Google Rating",
    },
    {
      value: clinic.reviewCount,
      suffix: "+",
      label: "Patient Reviews",
    },
    {
      value: clinic.treatments.length,
      suffix: "+",
      label: "Treatments",
    },
    {
      value: clinic.doctors.length,
      suffix: "",
      label: clinic.doctors.length === 1 ? "Doctor" : "Doctors",
    },
  ];

  return (
    <section className="px-4 pb-20 pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-gradient-to-br from-secondary/60 to-mint/20 p-6 md:p-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-primary md:text-5xl">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                />
              </div>

              <div className="mt-2 text-sm font-medium text-muted-foreground md:text-base">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Services({ clinic }: { clinic: Dentist }) {
  return (
    <section
      className="px-4 py-20 lg:px-8"
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">
            Treatments
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Dental care tailored to your needs
          </h2>

          <p className="mt-3 text-muted-foreground">
            Explore the treatments and dental care available at{" "}
            {clinic.name}.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.treatments.map((treatment:any) => {
            const Icon =
              ICONS[
                treatment.icon as keyof typeof ICONS
              ] ?? Sparkles;

            return (
              <div
                key={treatment.slug}
                className="group rounded-2xl border border-border/60 bg-background/80 p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-mint/20 text-mint-foreground shadow-soft transition-transform group-hover:scale-110">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold">
                  {treatment.name}
                </h3>

                <p className="mt-1.5 text-sm text-muted-foreground">
                  {treatment.blurb}
                </p>

                <BookingDialog
                  note={`${treatment.name} at ${clinic.name}`}
                >
                  <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                    Book consultation
                    <ArrowRight className="size-4" />
                  </button>
                </BookingDialog>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function WhyUs({ clinic }: { clinic: Dentist }) {
  return (
    <section className="section-pad bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] w-[80%] overflow-hidden rounded-3xl shadow-card max-md:w-full max-sm:h-[250px]">
              <Image
                src={
                  clinic.images?.[1] ||
                  clinic.images?.[0] ||
                  "/smiling-lady.jpg"
                }
                alt={clinic.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -right-4 bottom-8 hidden rounded-2xl bg-white p-5 shadow-card md:block">
              <div className="flex items-center gap-3">
                <Award className="size-8 text-primary" />

                <div>
                  <div className="font-display text-lg font-bold">
                    {clinic.rating}/5
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Google rating
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">
              Why choose this clinic
            </Badge>

            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Dental care with a focus on you
            </h2>

            <p className="mt-3 text-muted-foreground">
              {clinic.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {clinic.features.map((feature:any, index:any) => (
                <div
                  key={feature}
                  className="flex gap-3 rounded-2xl border border-border/50 bg-card p-4"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    {index % 3 === 0 ? (
                      <ShieldCheck className="size-5" />
                    ) : index % 3 === 1 ? (
                      <Heart className="size-5" />
                    ) : (
                      <Sparkles className="size-5" />
                    )}
                  </div>

                  <div>
                    <div className="font-semibold">
                      {feature}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Quality-focused dental care for patients.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function DoctorsTeaser({ clinic }: { clinic: Dentist }) {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">
            Our Specialists
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Meet the dental professionals
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.doctors.map((doctor:any) => (
            <article
              key={doctor.name}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-background/80 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[99/100] overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-mint/20 p-5">
                <div className="relative flex h-full items-end overflow-hidden rounded-2xl border border-border/50 bg-white/70">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <div className="text-xs uppercase tracking-wider opacity-80">
                    {doctor.specialty}
                  </div>

                  <div className="font-display text-xl font-bold">
                    {doctor.name}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {doctor.qualification && (
                    <span>{doctor.qualification}</span>
                  )}

                  {doctor.experience > 0 && (
                    <>
                      <span>•</span>
                      <span>
                        {doctor.experience}+ yrs
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <BookingDialog
                    note={`I Want Appointment with ${doctor.name}`}
                  >
                    <Button className="w-full">
                      Book Appointment
                    </Button>
                  </BookingDialog>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function Testimonials({ clinic }: { clinic: Dentist }) {
  return (
    <section className="bg-gradient-to-b from-secondary/40 to-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Patient Stories
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            What patients are saying
          </h2>

          <p className="mt-3 text-muted-foreground">
            Reviews from patients who visited {clinic.name}.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clinic.testimonials.map((testimonial:any, index:any) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="rounded-3xl border border-border/60 bg-background/80 p-6"
            >
              <Quote className="size-7 text-primary/30" />

              <div className="mt-3 flex gap-0.5 text-[oklch(0.78_0.16_85)]">
                {Array.from({
                  length: testimonial.rating,
                }).map((_, j) => (
                  <Star
                    key={j}
                    className="size-4 fill-current"
                  />
                ))}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                “{testimonial.text}”
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                <div>
                  <div className="font-semibold">
                    {testimonial.name}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {testimonial.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Offers({ clinic }: { clinic: Dentist }) {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">
            Book a Visit
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Ready to take care of your smile?
          </h2>

          <p className="mt-3 text-muted-foreground">
            Contact {clinic.name} to discuss your dental concerns,
            treatment options and appointment availability.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-secondary/20 to-mint/20 p-8 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CalendarCheck className="size-7" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold">
            Book a Dental Consultation
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Get in touch with the clinic and find a suitable
            appointment time.
          </p>

          <BookingDialog
            note={`Appointment with ${clinic.name}`}
          >
            <Button className="mt-6 w-full rounded-full">
              Book Appointment
            </Button>
          </BookingDialog>

          <Button
            asChild
            variant="outline"
            className="mt-3 w-full rounded-full"
          >
            <a href={`tel:${clinic.phone}`}>
              <Phone className="mr-2 size-4" />
              {clinic.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}



function FAQ({ clinic }: { clinic: Dentist }) {
  return (
    <section className="bg-gradient-to-b from-secondary/40 to-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="rounded-full bg-mint/30 px-3 py-1 text-sm font-medium text-mint-foreground">
            FAQs
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Questions about {clinic.name}
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-8"
        >
          {clinic.faq.map((faq:any, index:any) => (
            <AccordionItem
              key={index}
              value={`f-${index}`}
              className="mb-3 rounded-2xl border border-border/60 bg-background/80 px-4 last:mb-0"
            >
              <AccordionTrigger className="text-left font-semibold">
                {faq.q}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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


function CTA({ clinic }: { clinic: Dentist }) {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-mint p-10 text-primary-foreground shadow-glow md:p-16">
          <div
            aria-hidden
            className="absolute -top-10 -right-10 size-64 rounded-full bg-white/15 blur-3xl"
          />

          <div
            aria-hidden
            className="absolute -bottom-10 -left-10 size-64 rounded-full bg-mint/30 blur-3xl"
          />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Ready for a healthier smile?
              </h2>

              <p className="mt-3 max-w-xl text-primary-foreground/90">
                Book an appointment with{" "}
                <strong>{clinic.name}</strong> and discuss your
                dental needs with the clinic.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <BookingDialog
                note={`Appointment with ${clinic.name}`}
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white text-primary hover:bg-white/90"
                >
                  <CalendarCheck className="mr-2 size-4" />
                  Book Appointment
                </Button>
              </BookingDialog>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <a href={`tel:${clinic.phone}`}>
                  <Phone className="mr-2 size-4" />
                  Call now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

