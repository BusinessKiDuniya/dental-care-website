"use client";

import { Suspense, useEffect, useState } from "react";
import { Menu, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BookingDialog } from "./bookingDialog";
import { dentist } from "@/data";

export function Header() {
  return (
    <Suspense fallback={null}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clinicId = searchParams.get("n");

  const clinic =
    dentist.find((item) => String(item.id) === clinicId) ?? dentist[0];

  const clinicQuery = `?n=${clinic.id}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const getNavHref = (href: string) => {
    if (href === "/") {
      return `/${clinicQuery}`;
    }

    return `${href}${clinicQuery}`;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${clinicQuery}`}
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="size-5" />
          </span>

          <span className="text-foreground">{clinic.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.slice(0, 7).map((link) => {
            const href = getNavHref(link.to);

            return (
              <Link
                key={link.to}
                href={href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Phone */}
          <a
            href={`tel:${clinic.phone}`}
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary md:inline-flex"
          >
            <Phone className="size-4" />
            {clinic.phone}
          </a>

          {/* Desktop Booking */}
          <BookingDialog>
            <Button className="hidden text-primary-foreground shadow-soft hover:opacity-95 sm:inline-flex">
              Book Appointment
            </Button>
          </BookingDialog>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] sm:w-96"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display">
                  <span className="grid size-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
                    <Sparkles className="size-4" />
                  </span>

                  {clinic.name}
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation */}
              <nav
                className="mt-6 flex flex-col gap-1"
                aria-label="Mobile"
              >
                {NAV_LINKS.map((link) => {
                  const href = getNavHref(link.to);

                  return (
                    <Link
                      key={link.to}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
                        pathname === link.to
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-6 space-y-2 border-t border-border px-2 pt-6">
                <BookingDialog>
                  <Button className="w-full p-5">
                    Book Appointment
                  </Button>
                </BookingDialog>

                <a
                  href={`tel:${clinic.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium"
                >
                  <Phone className="size-4" />
                  Call {clinic.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
