"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(10, "Enter a valid phone").max(15).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    toast.success("Message sent - we'll get back to you shortly!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form onSubmit={submit} className="grid gap-4" aria-label="Contact form">
      <div className="grid gap-1.5">
        <label htmlFor="cname" className="text-sm font-medium">
          Name
        </label>
        <input
          id="cname"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="rounded-md border border-border/60 bg-background px-3 py-2 outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="cemail" className="text-sm font-medium">
            Email
          </label>
          <input
            id="cemail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-md border border-border/60 bg-background px-3 py-2 outline-none"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="cphone" className="text-sm font-medium">
            Phone (optional)
          </label>
          <input
            id="cphone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-md border border-border/60 bg-background px-3 py-2 outline-none"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cmsg" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="cmsg"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="rounded-md border border-border/60 bg-background px-3 py-2 outline-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground"
      >
        <Send className="mr-2 size-4" /> Send message
      </button>
    </form>
  );
}
