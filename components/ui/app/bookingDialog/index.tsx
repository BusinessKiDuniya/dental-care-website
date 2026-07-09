"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { bookingSchema, BookingFormValues } from "@/lib/schemas/booking";
import { BookingFormStep } from "./BookingFormStep";
import { OtpStep } from "./OtpStep";
import { SuccessStep } from "./SuccessStep";

type Step = "form" | "otp" | "success";

const OTP_RESEND_COOLDOWN = 60;

interface BookingDialogProps {
  /** The element that opens the dialog, e.g. a "Book Appointment" button. */
  note?: string;
  treatment?: string;
  children: React.ReactNode;


}

export function BookingDialog({ note, treatment, children }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [submitError, setSubmitError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      treatment: treatment || "",
      timeSlot: "",
      notes: note || "",
    },
  });

  function reset() {
    setStep("form");
    setSubmitError("");
    setOtpError("");
    setResendCooldown(0);
    form.reset();
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setTimeout(reset, 200); // let the close animation finish first
  }

  async function sendOtp(values: BookingFormValues) {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "send-otp",
        email: values.email,
        name: values.name,
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to send OTP");
  }

  async function handleFormSubmit(values: BookingFormValues) {
    setIsSending(true);
    setSubmitError("");
    try {
      await sendOtp(values);
      setStep("otp");
      setResendCooldown(OTP_RESEND_COOLDOWN);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not send code. Try again.");
    } finally {
      setIsSending(false);
    }
  }

  async function handleVerify(otp: string) {
    const values = form.getValues();
    setIsVerifying(true);
    setOtpError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-submit",
          otp,
          payload: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            treatment: values.treatment,
            date: format(values.date, "EEE, d MMM yyyy"),
            timeSlot: values.timeSlot,
            notes: values.notes,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Verification failed");
      setStep("success");
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Verification failed. Try again.");
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    setOtpError("");
    setResendCooldown(OTP_RESEND_COOLDOWN);
    try {
      await sendOtp(form.getValues());
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Could not resend code.");
      setResendCooldown(0);
    }
  }

  const values = form.getValues();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[96%] lg:w-130 overflow-y-auto rounded-3xl border border-border p-6 md:p-8">
        {step === "form" && (
          <BookingFormStep
            form={form}
            onSubmit={handleFormSubmit}
            isSending={isSending}
            submitError={submitError}
          />
        )}

        {step === "otp" && (
          <OtpStep
            email={values.email}
            onVerify={handleVerify}
            onBack={() => setStep("form")}
            isVerifying={isVerifying}
            otpError={otpError}
            onResend={handleResend}
            resendCooldown={resendCooldown}
          />
        )}

        {step === "success" && (
          <SuccessStep
            firstName={values.name.split(" ")[0]}
            treatment={values.treatment}
            date={values.date ? format(values.date, "EEE, d MMM yyyy") : ""}
            timeSlot={values.timeSlot}
            onClose={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}