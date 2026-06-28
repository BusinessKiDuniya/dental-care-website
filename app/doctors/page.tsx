import type { Metadata } from "next";
import Doctors from "@/components/ui/app/doctorsPage";

export const metadata: Metadata = {
  title: "Our Doctors — Lumiere Dental",
  description:
    "Meet our team of board-certified dental specialists — implantologists, endodontists, orthodontists, pediatric dentists and more.",
};

export default function DoctorsPage() {
  return <Doctors />;
}