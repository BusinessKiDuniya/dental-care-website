import type { Metadata } from "next";
import { BlogList } from "@/components/ui/app/BlogList";
import { PageHero } from "@/components/ui/app/PageHero";

export const metadata: Metadata = {
  title: "Dental Blog — Lumière Dental",
  description:
    "Expert articles on dental health, treatments, kids dentistry, cosmetic dentistry and more.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Journal"
        title="Smart, simple dental knowledge"
        description="Expert-written, plain-language articles to help you take better care of your smile."
      />
      <BlogList />
    </div>
  );
}
