"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { NAV_LINKS, CLINIC } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookingDialog } from "./bookingDialog";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass shadow-soft" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="size-5" />
          </span>
          <span className="text-foreground">{CLINIC.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.slice(0, 7).map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CLINIC.phone}`}
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary md:inline-flex"
          >
            <Phone className="size-4" /> {CLINIC.phone}
          </a>
          <BookingDialog>
                  <Button className="hidden text-primary-foreground shadow-soft hover:opacity-95 sm:inline-flex">Book Appointment</Button>
          </BookingDialog>
          {/* <Button asChild className="h">
            <Link href="/book">Book Appointment</Link>
          </Button> */}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] sm:w-96">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display">
                  <span className="grid size-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
                    <Sparkles className="size-4" />
                  </span>
                  {CLINIC.name}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
                      pathname === l.to
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-secondary",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 space-y-2 border-t border-border pt-6 px-2">
                <BookingDialog>
                  <Button className="w-full p-5">Book Appointment</Button>
                </BookingDialog>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium"
                >
                  <Phone className="size-4" /> Call {CLINIC.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
