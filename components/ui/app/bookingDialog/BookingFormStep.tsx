"use client";

import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { getAvailableSlots } from "@/lib/availability";
import { TREATMENTS, BookingFormValues } from "@/lib/schemas/booking";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BookingFormStepProps {
  form: UseFormReturn<BookingFormValues>;
  onSubmit: (values: BookingFormValues) => void;
  isSending: boolean;
  submitError: string;
}

export function BookingFormStep({
  form,
  onSubmit,
  isSending,
  submitError,
}: BookingFormStepProps) {
  const selectedDate = form.watch("date");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Re-fetch available slots whenever the date changes, and clear a
  // previously chosen slot that no longer applies.
  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    getAvailableSlots(selectedDate).then((result) => {
      if (cancelled) return;
      setSlots(result);
      setLoadingSlots(false);
      form.setValue("timeSlot", "");
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <>
      <DialogHeader className="pb-0">
        <DialogTitle className="font-display text-2xl text-foreground">
          Book an appointment
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Pick a treatment, date, and time — we&apos;ll email you a code to confirm.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="treatment"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Treatment</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full">
                    <SelectValue placeholder="Select a treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {TREATMENTS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={field.name}
                        variant="outline"
                        aria-invalid={fieldState.invalid}
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "d MMM") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="timeSlot"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Time</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedDate || loadingSlots}
                  >
                    <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full">
                      <SelectValue
                        placeholder={
                          !selectedDate
                            ? "Pick a date first"
                            : loadingSlots
                              ? "Loading..."
                              : slots.length === 0
                                ? "No slots"
                                : "Select time"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {slots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Your full name"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@email.com"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            name="notes"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Notes (optional)</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  rows={3}
                  placeholder="Anything the dentist should know before your visit"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {submitError && (
          <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={isSending} className="w-full">
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending code...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </>
  );
}