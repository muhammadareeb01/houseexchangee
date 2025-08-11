"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuth } from "@/lib/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("minimaal 8 tekens");
    if (!/[A-Z]/.test(password)) errors.push("één hoofdletter");
    if (!/[a-z]/.test(password)) errors.push("één kleine letter");
    if (!/[0-9]/.test(password)) errors.push("één cijfer");
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name.trim()) {
      setError("Naam is verplicht");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Naam moet minimaal 2 tekens lang zijn");
      return false;
    }
    if (!email.trim()) {
      setError("E-mailadres is verplicht");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Voer een geldig e-mailadres in (bijvoorbeeld: naam@domein.nl)");
      return false;
    }
    if (!password) {
      setError("Wachtwoord is verplicht");
      return false;
    }
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(`Wachtwoord moet bevatten: ${passwordErrors.join(", ")}`);
      return false;
    }
    if (password !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const actionCodeSettings = {
        url: "http://localhost:3000/verify", // use your local domain for now
        handleCodeInApp: false,
      };

      await sendEmailVerification(user, actionCodeSettings);
      setVerificationSent(true);
      setShowEmailModal(false); // Close modal on success

      // router.push("/verify");
      // setVerificationSent(true);
      console.log("✅ Account created and verification email sent:", user);
    } catch (err) {
      let errorMessage = "Er ging iets mis bij het registreren";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Dit e-mailadres is al geregistreerd.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Ongeldig e-mailadres format.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Wachtwoord is te zwak (minimaal 6 tekens).";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Google sign up error:", error);
      setError("Fout bij het registreren met Google");
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithFacebook();
      router.push("/dashboard");
    } catch (error) {
      console.error("Facebook sign up error:", error);
      setError("Fout bij het registreren met Facebook");
    }
  };

  if (verificationSent) {
    return (
      <main className="min-h-screen flex flex-col items-center bg-gray-50 pt-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verificatie e-mail verzonden
            </h1>
            <p className="text-gray-600">
              We hebben een verificatie e-mail gestuurd naar{" "}
              <strong>{formData.email}</strong>. Klik op de link in de e-mail om
              je account te activeren.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> Controleer ook je spam/junk map.
                </p>
              </div>
              <a
                href="/auth/signin"
                className="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Terug naar inloggen
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 pt-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account aanmaken
          </h1>
          <p className="text-gray-600">
            Kies hoe je een account wilt aanmaken
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {/* Social Login Buttons */}
          <div className="mb-6 space-y-3">
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Registreren met Google
            </button>
            <button
              onClick={handleFacebookSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Registreren met Facebook
            </button>
          </div>
          
          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">of</span>
            </div>
          </div>
          
          {/* Email Registration Button */}
          <button
            onClick={() => setShowEmailModal(true)}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Registreren met e-mailadres
          </button>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <span className="text-gray-600">Al een account? </span>
            <a
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Log hier in
            </a>
          </div>
        </div>
      </div>

      {/* Email Registration Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Registreren met e-mailadres
                </h2>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Volledige naam
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent text-gray-900 bg-gray-50"
                    placeholder="Bijv. Jan de Vries"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    E-mailadres
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value.toLowerCase())
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent text-gray-900 bg-gray-50"
                    placeholder="naam@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Wachtwoord
                  </label>
                  <input
                    id="modal-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent text-gray-900 bg-gray-50"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bevestig wachtwoord
                  </label>
                  <input
                    id="modal-confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe361] focus:border-transparent text-gray-900 bg-gray-50"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffe361] focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                  >
                    {isLoading ? "Aanmaken..." : "Account aanmaken"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
