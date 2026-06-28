import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/app/PageHero";
import { OFFERS } from "@/lib/data";
import { Gift, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Offers & Membership Plans — Lumière Dental",
  description:
    "Save on dental implants, aligners, whitening, family plans and more. Exclusive offers and membership benefits at Lumière Dental.",
};

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Offers & Plans"
        title="Premium care, smarter prices"
        description="Limited-time offers, family memberships and corporate plans — all with the same Lumière quality."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((offer, index) => (
              <div
                key={`${offer.title}-${index}`}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-secondary/20 to-mint/20 p-7 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                    {offer.tag}
                  </span>
                  <Gift className="size-5 text-primary" />
                </div>
                <h2 className="mt-5 font-display text-xl font-bold">{offer.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{offer.desc}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-3xl font-bold text-primary">{offer.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{offer.original}</span>
                </div>
                <Button asChild className="mt-6 w-full rounded-full bg-primary text-primary-foreground">
                  <Link href="/book">Claim offer</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary to-mint p-10 text-primary-foreground md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <Sparkles className="size-7" />
                <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  Refer a friend, both get ₹500 off
                </h2>
                <p className="mt-2 max-w-xl text-primary-foreground/90">
                  Share Lumière with someone you love. They get ₹500 off their first treatment — and so do you.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/contact">Get my referral code</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
