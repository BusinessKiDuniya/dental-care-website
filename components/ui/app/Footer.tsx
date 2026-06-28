
"use client"

import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, MailboxIcon, MapPinIcon, PhoneCallIcon, SparkleIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import { CLINIC, TREATMENTS, NAV_LINKS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-linear-to-b from-secondary/40 to-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <SparkleIcon className="size-5" />
              </span>
              {CLINIC.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Premium, pain-free, transparent dental care across India. {CLINIC.tagline}.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                {
                  icon: InstagramLogoIcon,
                  link: "https://www.instagram.com/businesskiduniya.in?igsh=eXBwdDhtNTluNG16ˀ"
                },
                { icon: FacebookLogoIcon, link: "https://www.facebook.com/businesskiduniya.in" },
                { icon: YoutubeLogoIcon, link: "https://www.youtube.com/@businesskiduniya.in" },
                { icon: LinkedinLogoIcon, link: "https://www.linkedin.com/company/businesskiduniya.in" }
              ].map((Item, i) => (
                <a
                  key={i}
                  href={Item.link}
                  target="_blank"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Item.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="text-muted-foreground transition-colors hover:text-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Treatments</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {TREATMENTS.slice(0, 8).map((t) => (
                <li key={t.slug}>
                  <Link href="/treatments" className="text-muted-foreground transition-colors hover:text-primary">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPinIcon className="mt-0.5 size-4 text-primary" /> 15 clinics across 6 cities in India</li>
              <li className="flex items-center gap-2"><PhoneCallIcon className="size-4 text-primary" /> <a href={`tel:${CLINIC.phone}`}>{CLINIC.phone}</a></li>
              <li className="flex items-center gap-2"><MailboxIcon className="size-4 text-primary" /> <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></li>
            </ul>

            <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup">
              <label htmlFor="newsletter" className="sr-only">Email</label>
              <Input id="newsletter" type="email" placeholder="Your email" className="rounded-full bg-card" />
              <Button type="submit" className="rounded-full gradient-primary text-primary-foreground">Join</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
