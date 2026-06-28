import type { Metadata } from "next";
import { PageHero } from "@/components/ui/app/PageHero";
import AppointmentForm from "@/components/ui/app/AppointmentForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment — Lumière Dental",
  description:
    "Book your free dental consultation at Lumière. Same-day slots, no payment required to book.",
};

const PROMISES = [
  "Free first consultation",
  "Same-day appointments available",
  "0% EMI on treatments above ₹10,000",
  "No-payment-to-book guarantee",
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Book Appointment"
        title="Let&apos;s get you a brighter smile"
        description="Fill the form below. A care coordinator will call you in 15 minutes to confirm your slot."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="h-fit rounded-3xl border border-border/60 bg-gradient-to-br from-primary/8 to-mint/15 p-7">
            <h2 className="font-display text-xl font-bold">Why book with Lumière</h2>
            <ul className="mt-5 space-y-3">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-background/70 p-4 text-sm">
              <div className="font-semibold">24×7 Emergency</div>
              <p className="text-muted-foreground">
                For sudden pain or trauma, call our emergency line any time.
              </p>
              <a
                href="tel:+919876500911"
                className="mt-2 inline-block font-display text-lg font-bold text-primary"
              >
                +91 98765 00911
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-background/70 p-6 md:p-8">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
