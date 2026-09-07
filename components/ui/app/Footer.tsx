"use client";

import { Suspense } from "react";
import {
  MapPinIcon,
  PhoneCallIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

import { NAV_LINKS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { dentist } from "@/data";

export function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterContent />
    </Suspense>
  );
}

function FooterContent() {
  const searchParams = useSearchParams();

  const clinicId = searchParams.get("n");

  const clinic =
    dentist.find((item) => String(item.id) === clinicId) ?? dentist[0];

  const clinicQuery = `?n=${clinic.id}`;

  const getNavHref = (href: string) => {
    if (href === "/") {
      return `/${clinicQuery}`;
    }

    return `${href}${clinicQuery}`;
  };

  return (
    <footer className="mt-24 border-t border-border bg-linear-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div>
            <Link
              href={`/${clinicQuery}`}
              className="flex items-center gap-2 font-display text-xl font-bold"
            >
              <span className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <SparkleIcon className="size-5" />
              </span>

              {clinic.name}
            </Link>

            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {clinic.description}
            </p>

            {/* Clinic Highlights */}
            {clinic.highlights?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {clinic.highlights.slice(0, 3).map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    href={getNavHref(link.to)}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Treatments
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              {clinic.treatments.slice(0, 8).map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href={`/treatments${clinicQuery}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {treatment.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in touch
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {/* Address */}
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />

                <span>{clinic.address}</span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-2">
                <PhoneCallIcon className="size-4 shrink-0 text-primary" />

                <a
                  href={`tel:${clinic.phone}`}
                  className="transition-colors hover:text-primary"
                >
                  {clinic.phone}
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <form
              className="mt-6 flex gap-2"
              onSubmit={(event) => event.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label
                htmlFor="newsletter"
                className="sr-only"
              >
                Email
              </label>

              <Input
                id="newsletter"
                type="email"
                placeholder="Your email"
                className="rounded-full bg-card"
              />

              <Button
                type="submit"
                className="rounded-full gradient-primary text-primary-foreground"
              >
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>

          <p className="flex gap-4">
            <Link
              href={`/privacy${clinicQuery}`}
              className="hover:text-primary"
            >
              Privacy
            </Link>

            <Link
              href={`/terms${clinicQuery}`}
              className="hover:text-primary"
            >
              Terms
            </Link>

            <Link
              href={`/cookies${clinicQuery}`}
              className="hover:text-primary"
            >
              Cookies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
