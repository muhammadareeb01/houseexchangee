"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

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

  if (verificationSent) {
    return (
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-8">
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
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account aanmaken
          </h1>
          <p className="text-gray-600">
            Vul je gegevens in om een nieuw account te maken
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Volledige naam
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50"
                placeholder="Bijv. Jan de Vries"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mailadres
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  handleInputChange("email", e.target.value.toLowerCase())
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50"
                placeholder="naam@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bevestig wachtwoord
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
            >
              {isLoading ? "Account aanmaken..." : "Account aanmaken"}
            </button>
          </form>
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <span className="text-gray-600">Al een account? </span>
            <a
              href="/auth/sigin"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Log hier in
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
