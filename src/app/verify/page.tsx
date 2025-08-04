"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");
  const [message, setMessage] = useState("Verifying...");
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (mode === "verifyEmail" && oobCode) {
      setIsVerifying(true);
      applyActionCode(auth, oobCode)
        .then(async () => {
          if (auth.currentUser) {
            await auth.currentUser.reload(); // Sync emailVerified status
            await auth.currentUser.getIdToken(true); // Force refresh token
            const user = auth.currentUser;
            console.log("After reload - emailVerified:", user.emailVerified); // Debug
            if (user && user.emailVerified) {
              setMessage("Email verified successfully!");
              setTimeout(() => {
                router.push("/dashboard");
              }, 1000);
            } else {
              setMessage(
                "Verification succeeded, but email status not updated. Please log in to sync."
              );
              setTimeout(() => {
                router.push("/auth/signin");
              }, 2000);
            }
          } else {
            setMessage("No user session found. Please log in.");
            setTimeout(() => {
              router.push("/auth/signin");
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Verification error:", error);
          if (error.code === "auth/expired-action-code") {
            // setMessage(
            //   "The verification link has expired. Please request a new one."
            // );
          } else if (error.code === "auth/invalid-action-code") {
            // setMessage(
            //   "The verification link is invalid. Please check the link or request a new one."
            // );
          } else {
            setMessage(
              `Verification failed: ${error.message}. Please try again or contact support.`
            );
          }
          setIsVerifying(false);
        })
        .finally(() => {
          setIsVerifying(false);
        });
    } else {
      setMessage("Invalid verification link.");
      setIsVerifying(false);
    }
  }, [mode, oobCode]);

  const handleResendVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/verify",
        handleCodeInApp: false,
      };
      await sendEmailVerification(user, actionCodeSettings);
      setMessage(
        "A new verification email has been sent. Please check your inbox."
      );
    } else {
      setMessage(
        "No user is currently signed in. Please log in and request a new verification email."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <p className="text-lg font-medium">{message}</p>
        {isVerifying ? (
          <p className="mt-4 text-gray-500">Please wait...</p>
        ) : message.includes("expired") || message.includes("invalid") ? (
          <button
            onClick={handleResendVerification}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Resend Verification Email
          </button>
        ) : message === "Email verified successfully!" ? null : (
          <button
            onClick={() => router.push("/auth/signin")}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}
