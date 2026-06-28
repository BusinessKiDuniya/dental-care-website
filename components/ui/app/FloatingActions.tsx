import { MessageCircle, Phone } from "lucide-react";
import { CLINIC } from "@/lib/data";

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${CLINIC.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="group grid size-14 place-items-center rounded-full bg-[oklch(0.7_0.17_150)] text-white shadow-glow transition-transform hover:scale-110"
      >
        <MessageCircle className="size-6" />
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs text-background group-hover:block">
          WhatsApp us
        </span>
      </a>
      <a
        href={`tel:${CLINIC.phone}`}
        aria-label="Call now"
        className="group grid size-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow transition-transform hover:scale-110"
      >
        <Phone className="size-6" />
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs text-background group-hover:block">
          Call now
        </span>
      </a>
    </div>
  );
}

export { FloatingActions };
