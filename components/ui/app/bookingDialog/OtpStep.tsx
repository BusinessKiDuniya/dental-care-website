"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Loader2, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface OtpStepProps {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  isVerifying: boolean;
  otpError: string;
  onResend: () => void;
  resendCooldown: number;
}

export function OtpStep({
  email,
  onVerify,
  onBack,
  isVerifying,
  otpError,
  onResend,
  resendCooldown,
}: OtpStepProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  const handleInput = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val) inputs.current[i + 1]?.focus();
    if (next.every(Boolean)) onVerify(next.join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i]) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputs.current[5]?.focus();
      onVerify(pasted);
    }
    e.preventDefault();
  };

  const otp = digits.join("");

  return (
    <div className="flex flex-col gap-6">
      <DialogHeader className="pb-0">
        <div className="mb-1 flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Go back to booking details"
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <DialogTitle className="font-display text-2xl text-foreground">
            Verify your email
          </DialogTitle>
        </div>
        <DialogDescription className="text-sm text-muted-foreground">
          We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>.
          It&apos;s valid for 5 minutes.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-mint bg-mint/20">
          <Mail className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleInput(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`Digit ${i + 1}`}
            className={`h-14 w-11 rounded-xl border-2 bg-muted text-center text-xl font-bold text-foreground outline-none transition-all
              ${otpError ? "border-destructive bg-destructive/10" : d ? "border-primary bg-accent" : "border-border focus:border-primary"}`}
          />
        ))}
      </div>

      {otpError && (
        <p role="alert" className="text-center text-sm text-destructive">
          {otpError}
        </p>
      )}

      <Button onClick={() => onVerify(otp)} disabled={otp.length < 6 || isVerifying} className="w-full">
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
          </>
        ) : (
          "Confirm booking"
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-sm">
        <span className="text-muted-foreground">Didn&apos;t get it?</span>
        {resendCooldown > 0 ? (
          <span className="font-medium text-muted-foreground">Resend in {resendCooldown}s</span>
        ) : (
          <button onClick={onResend} className="flex items-center gap-1 font-medium text-primary hover:underline">
            <RefreshCw className="h-3 w-3" /> Resend code
          </button>
        )}
      </div>
    </div>
  );
}