import type { BookingPayload } from "@/app/api/booking/route";
import { treatmentLabel } from "@/lib/schemas/booking";

// Email clients don't understand CSS variables or oklch(), so these are
// fixed hex approximations of the palette in globals.css (teal primary /
// mint accent). Update these two constants if the brand palette changes —
// everything below reads from them.
const TEAL = "#1f7d74"; // ~ var(--primary)
const MINT = "#bdead0"; // ~ var(--mint)
const INK = "#1c2a38"; // ~ var(--foreground)
const MUTED = "#5b7280"; // ~ var(--muted-foreground)
const BORDER = "#e2ece9"; // ~ var(--border)

function wrapper(bodyHtml: string): string {
  return `
  <div style="background:#f6faf9;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid ${BORDER};overflow:hidden;">
      <div style="height:6px;background:linear-gradient(90deg, ${TEAL}, ${MINT});"></div>
      <div style="padding:32px 28px;">
        ${bodyHtml}
      </div>
    </div>
    <p style="text-align:center;color:${MUTED};font-family:Arial,Helvetica,sans-serif;font-size:12px;margin-top:20px;">
      Super Dental
    </p>
  </div>`;
}

export function createBookingOtpMail(firstName: string, otp: string): string {
  return wrapper(`
    <h1 style="color:${INK};font-size:22px;margin:0 0 8px;">Confirm your booking</h1>
    <p style="color:${MUTED};font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;margin:0 0 24px;">
      Hi ${firstName}, use the code below to confirm your appointment request. It expires in 5 minutes.
    </p>
    <div style="background:${MINT}33;border:1px solid ${MINT};border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:32px;font-weight:bold;letter-spacing:6px;color:${TEAL};">${otp}</span>
    </div>
    <p style="color:${MUTED};font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0;">
      Didn't request this? You can safely ignore this email.
    </p>
  `);
}

export function createNewBookingMailForClinic(data: BookingPayload): string {
  return wrapper(`
    <h1 style="color:${INK};font-size:20px;margin:0 0 16px;">New appointment request</h1>
    <table style="width:100%;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${INK};border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:${MUTED};">Patient</td><td style="padding:6px 0;">${data.name}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Email</td><td style="padding:6px 0;">${data.email}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Phone</td><td style="padding:6px 0;">${data.phone}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Treatment</td><td style="padding:6px 0;">${treatmentLabel(data.treatment)}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Date</td><td style="padding:6px 0;">${data.date}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Time slot</td><td style="padding:6px 0;">${data.timeSlot}</td></tr>
      ${data.notes ? `<tr><td style="padding:6px 0;color:${MUTED};">Notes</td><td style="padding:6px 0;">${data.notes}</td></tr>` : ""}
    </table>
  `);
}

export function createBookingConfirmationMail(
  firstName: string,
  data: BookingPayload,
): string {
  return wrapper(`
    <h1 style="color:${INK};font-size:22px;margin:0 0 8px;">You're booked, ${firstName} 🦷</h1>
    <p style="color:${MUTED};font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;margin:0 0 20px;">
      We've saved your appointment request for <strong style="color:${INK};">${treatmentLabel(data.treatment)}</strong> on
      <strong style="color:${INK};">${data.date} at ${data.timeSlot}</strong>. Our team will confirm shortly.
    </p>
    <p style="color:${MUTED};font-family:Arial,Helvetica,sans-serif;font-size:12px;margin:0;">
      Need to change something? Just reply to this email.
    </p>
  `);
}