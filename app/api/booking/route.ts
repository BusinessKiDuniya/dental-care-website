import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {
  createBookingOtpMail,
  createNewBookingMailForClinic,
  createBookingConfirmationMail,
} from "@/lib/mail/bookingMailTemplates";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string; // formatted, e.g. "Fri, 25 Jul 2026"
  timeSlot: string; // e.g. "10:00 AM"
  notes?: string;
}

interface OTPRecord {
  hash: string; // sha256 of otp — never store plain text
  expiresAt: number;
  attempts: number;
}

// ─────────────────────────────────────────────
// IN-MEMORY OTP STORE
// Fine for single-instance / Vercel hobby. Swap for Redis (Upstash) once
// this needs to survive across instances or a restart.
// ─────────────────────────────────────────────

const otpStore = new Map<string, OTPRecord>();
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function generateOTP(): string {
  return String(crypto.randomInt(100_000, 999_999));
}

function hashOTP(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function cleanupExpired() {
  const now = Date.now();
  for (const [key, rec] of otpStore.entries()) {
    if (rec.expiresAt < now) otpStore.delete(key);
  }
}

// ─────────────────────────────────────────────
// TRANSPORTER
// Reuses the same SMTP env vars as the rest of the project.
// ─────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─────────────────────────────────────────────
// ACTION HANDLERS
// ─────────────────────────────────────────────

async function handleSendOTP(body: { email: string; name: string }) {
  const { email, name } = body;

  if (!email || !name) {
    return NextResponse.json(
      { error: "email and name are required" },
      { status: 422 },
    );
  }

  cleanupExpired();

  const existing = otpStore.get(email);
  if (existing && existing.expiresAt > Date.now()) {
    const remainingSec = Math.ceil((existing.expiresAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: `OTP already sent. Retry in ${remainingSec}s.` },
      { status: 429 },
    );
  }

  const otp = generateOTP();
  otpStore.set(email, {
    hash: hashOTP(otp),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });

  const firstName = name.split(" ")[0];

  try {
    await transporter.sendMail({
      from: `"Super Dental" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${otp} is your Super Dental booking code`,
      html: createBookingOtpMail(firstName, otp),
    });
  } catch (err) {
    console.error("[SMTP] Booking OTP send failed:", err);
    otpStore.delete(email);
    return NextResponse.json(
      { error: "Failed to send OTP email" },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true });
}

async function handleVerifyAndSubmit(body: {
  otp: string;
  payload: BookingPayload;
}) {
  const { otp, payload } = body;

  if (!otp || !payload?.email) {
    return NextResponse.json(
      { error: "otp and payload.email are required" },
      { status: 422 },
    );
  }

  const record = otpStore.get(payload.email);

  if (!record) {
    return NextResponse.json(
      { error: "No OTP found. Please request a new one." },
      { status: 400 },
    );
  }
  if (record.expiresAt < Date.now()) {
    otpStore.delete(payload.email);
    return NextResponse.json(
      { error: "OTP expired. Please request a new one." },
      { status: 400 },
    );
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(payload.email);
    return NextResponse.json(
      { error: "Too many attempts. Please request a new OTP." },
      { status: 429 },
    );
  }
  if (hashOTP(otp) !== record.hash) {
    record.attempts += 1;
    return NextResponse.json(
      { error: "Incorrect OTP.", attemptsLeft: MAX_ATTEMPTS - record.attempts },
      { status: 400 },
    );
  }

  otpStore.delete(payload.email);

  if (!payload.name || !payload.phone || !payload.treatment || !payload.date || !payload.timeSlot) {
    return NextResponse.json(
      { error: "Missing required booking fields" },
      { status: 422 },
    );
  }

  const firstName = payload.name.split(" ")[0];

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Super Dental Bookings" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        replyTo: payload.email,
        subject: `New booking: ${payload.name} — ${payload.treatment}`,
        html: createNewBookingMailForClinic(payload),
      }),
      transporter.sendMail({
        from: `"Super Dental" <${process.env.SMTP_USER}>`,
        to: payload.email,
        subject: `Your appointment request is confirmed, ${firstName}`,
        html: createBookingConfirmationMail(firstName, payload),
      }),
    ]);
  } catch (err) {
    console.error("[SMTP] Booking confirmation send failed:", err);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

// ─────────────────────────────────────────────
// ROUTE ENTRY
// ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = body.action as string;

  switch (action) {
    case "send-otp":
      return handleSendOTP(body as { email: string; name: string });
    case "verify-submit":
      return handleVerifyAndSubmit(
        body as { otp: string; payload: BookingPayload },
      );
    default:
      return NextResponse.json(
        { error: `Unknown action: ${action}` },
        { status: 400 },
      );
  }
}