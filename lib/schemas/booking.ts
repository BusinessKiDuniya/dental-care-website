import { z } from "zod";

// Placeholder treatment list — swap labels/values for whatever's on the
// real Treatments page. `value` is what gets stored/emailed, `label` is
// what patients see in the Select.
export const TREATMENTS = [
  { value: "free-visit", label: "Just A Free Visit" },
  { value: "general-checkup", label: "General Checkup & Cleaning" },
  { value: "teeth-whitening", label: "Teeth Whitening" },
  { value: "orthodontics", label: "Orthodontics Consultation" },
  { value: "root-canal", label: "Root Canal Treatment" },
  { value: "pediatric-dentistry", label: "Pediatric Dentistry" },
  { value: "cosmetic-veneers", label: "Cosmetic Veneers" },
  { value: "emergency-care", label: "Emergency / Urgent Care" },
] as const;

const TREATMENT_VALUES = TREATMENTS.map((t) => t.value) as [
  string,
  ...string[],
];

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9]{7,15}$/, "Enter a valid phone number"),
  treatment: z.enum(TREATMENT_VALUES, {
    error: "Please select a treatment",
  }),
  date: z.date({ error: "Please pick a date" }),
  timeSlot: z.string({ error: "Please pick a time slot" }).min(1),
  notes: z.string().trim().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export function treatmentLabel(value: string): string {
  return TREATMENTS.find((t) => t.value === value)?.label ?? value;
}
