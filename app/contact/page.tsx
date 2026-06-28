import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/app/ContactForm";
import { PageHero } from "@/components/ui/app/PageHero";
import { CLINIC } from "@/lib/data";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Lumière Dental",
  description:
    "Call, WhatsApp or write to Lumière Dental. We respond within an hour during business hours, 24×7 for emergencies.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Call us, WhatsApp us, or fill the form — we typically respond in under an hour."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <ContactCard icon={Phone} label="Call us" value={CLINIC.phone} href={`tel:${CLINIC.phone}`} />
            <ContactCard icon={MessageCircle} label="WhatsApp" value={CLINIC.whatsapp} href={`https://wa.me/${CLINIC.whatsapp.replace(/\D/g, "")}`} />
            <ContactCard icon={Mail} label="Email" value={CLINIC.email} href={`mailto:${CLINIC.email}`} />
            <ContactCard icon={MapPin} label="HQ" value="Bengaluru, India" />
            <ContactCard icon={Clock} label="Hours" value="Mon–Sun · 9 AM – 9 PM · 24×7 emergency" />
          </div>

          <div className="rounded-3xl border border-border/60 bg-background/70 p-6 md:p-8">
            <ContactForm />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <iframe
              title="Lumière Dental locations"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.4,8.0,88.5,28.8&layer=mapnik"
              width="100%"
              height="380"
              loading="lazy"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="rounded-2xl border border-border/60 bg-background/70 p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex items-center gap-4">
        <div className="grid size-11 place-items-center rounded-xl bg-mint/20 text-mint-foreground">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}
