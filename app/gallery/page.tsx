import type { Metadata } from "next";
import { GalleryGrid } from "@/components/ui/app/GalleryGrid";
import { PageHero } from "@/components/ui/app/PageHero";

export const metadata: Metadata = {
  title: "Smile Gallery — Lumière Dental",
  description:
    "Real patients, real before-and-after smile transformations at Lumière Dental. Aligners, veneers, whitening, implants and more.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Smile Gallery"
        title="Real smiles. Real transformations."
        description="Every smile here is a real Lumière patient. Slide to reveal the before-and-after."
      />
      <GalleryGrid />
    </div>
  );
}
