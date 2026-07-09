"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { treatmentLabel } from "@/lib/schemas/booking";

interface SuccessStepProps {
  firstName: string;
  treatment: string;
  date: string;
  timeSlot: string;
  onClose: () => void;
}

export function SuccessStep({
  firstName,
  treatment,
  date,
  timeSlot,
  onClose,
}: SuccessStepProps) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <DialogTitle className="sr-only">Booking confirmed</DialogTitle>
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-mint bg-mint/30">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mb-2 font-display text-2xl text-foreground">
        You&apos;re booked, {firstName}
      </h2>
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {treatmentLabel(treatment)} on <span className="font-medium text-foreground">{date}</span> at{" "}
        <span className="font-medium text-foreground">{timeSlot}</span>. A confirmation email is on its way.
      </p>
      <Button variant="outline" onClick={onClose} className="w-full max-w-xs">
        Close
      </Button>
    </div>
  );
}