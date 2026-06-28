"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TREATMENTS, CLINICS } from "@/lib/data";
import { z } from "zod";
import { CalendarCheck } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$|^\+?\d{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  treatment: z.string().min(1, "Please pick a treatment"),
  clinic: z.string().min(1, "Please pick a clinic"),
  date: z.string().min(1, "Please pick a date"),
  time: z.string().min(1, "Please pick a time"),
  notes: z.string().max(400).optional(),
});

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", treatment: "", clinic: "", date: "", time: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Appointment requested! We'll call you within 15 minutes to confirm.");
      setForm({ name: "", phone: "", email: "", treatment: "", clinic: "", date: "", time: "", notes: "" });
    }, 700);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={submit} className="grid gap-4" aria-label="Book an appointment">
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 md:grid-cols-2"}>
        <div className="grid gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" autoComplete="name" required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile" autoComplete="tel" required />
        </div>
        <div className="grid gap-1.5 sm:col-span-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="treatment">Treatment</Label>
          <Select value={form.treatment} onValueChange={(v) => update("treatment", v)}>
            <SelectTrigger id="treatment"><SelectValue placeholder="Pick a treatment" /></SelectTrigger>
            <SelectContent>
              {TREATMENTS.map((t) => (<SelectItem key={t.slug} value={t.slug}>{t.name}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="clinic">Preferred clinic</Label>
          <Select value={form.clinic} onValueChange={(v) => update("clinic", v)}>
            <SelectTrigger id="clinic"><SelectValue placeholder="Pick a clinic" /></SelectTrigger>
            <SelectContent>
              {CLINICS.map((c) => (<SelectItem key={c.slug} value={c.slug}>{c.city} — {c.area}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" min={today} value={form.date} onChange={(e) => update("date", e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="time">Time</Label>
          <Select value={form.time} onValueChange={(v) => update("time", v)}>
            <SelectTrigger id="time"><SelectValue placeholder="Pick a time" /></SelectTrigger>
            <SelectContent>
              {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!compact && (
        <div className="grid gap-1.5">
          <Label htmlFor="notes">Anything we should know? (optional)</Label>
          <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Sensitive teeth, anxiety, prior treatment, etc." />
        </div>
      )}

      <Button type="submit" disabled={submitting} className="rounded-full gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
        <CalendarCheck className="mr-2 size-4" />
        {submitting ? "Requesting…" : "Confirm Appointment"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">We'll call to confirm your slot. No payment needed to book.</p>
    </form>
  );
}

export default AppointmentForm;
