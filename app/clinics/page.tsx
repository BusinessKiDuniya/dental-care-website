import type { Metadata } from "next";
import { ClinicsList } from "@/components/ui/app/ClinicsList";
import { PageHero } from "@/components/ui/app/PageHero";

export const metadata: Metadata = {
  title: "Our Clinics — Lumière Dental",
  description:
    "Find your nearest Lumière Dental clinic. Premium clinics across Bengaluru, Mumbai, Delhi, Chennai, Pune and Hyderabad.",
};

export default function ClinicsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Find a Clinic"
        title="Premium dental care, near you"
        description="15 luxury clinics across 6 Indian cities — each with the same equipment, sterilisation and care standards."
      />
      <ClinicsList />
    </div>
  );
}
