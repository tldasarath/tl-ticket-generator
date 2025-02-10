import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase setup

function VerifyPhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize Recaptcha
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha verified");
        },
      },
      auth
    );
  };

  // Send OTP
  const sendOtp = async () => {
    setError("");
    if (!phoneNumber) return setError("Enter a valid phone number!");

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setVerified(true);
      alert("Phone number verified!");
    } catch (err) {
      setError("Invalid OTP. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl text-black font-semibold text-start mb-4">Verify Phone Number</h2>

        {/* Phone Input */}
        {!verified && (
          <>
            <input
              type="text"
              placeholder="+91XXXXXXXXXX"
              className="w-full p-2 border text-stone-800 rounded mb-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {/* OTP Input */}
        {confirmationResult && !verified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mt-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded mt-2"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* Success Message */}
        {verified && <p className="text-green-600 text-center mt-3">Phone Verified! ✅</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {/* Recaptcha */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default VerifyPhoneNumber;
