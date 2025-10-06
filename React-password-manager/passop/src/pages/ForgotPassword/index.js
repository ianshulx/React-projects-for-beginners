import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState("request");
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      {step === "request" && (
        <ForgotPassword onOtpSent={(e) => { setEmail(e); setStep("verify"); }} />
      )}
      {step === "verify" && (
        <VerifyOtp email={email} onVerified={() => setStep("reset")} />
      )}
      {step === "reset" && (
        <ResetPassword email={email} onDone={() => setStep("done")} />
      )}
      {step === "done" && (
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold">🎉 Password Reset Successful!</h2>
          <p className="text-sm text-gray-600 mt-2">
            You can now log in with your new password.
          </p>
        </div>
      )}
    </div>
  );
}
