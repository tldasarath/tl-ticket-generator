import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VerifyPhoneNumber from "./VerifyPhoneNumber";
import UserDetailsForm from "./UserDetailsForm";
import Ticket from "./Ticket";
import { saveAs } from "file-saver";

const FormComponent = () => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const [step, setStep] = useState(1);
  const [eventTime, setEventTime] = useState(new Date("2025-03-20T18:00:00").getTime());

  // Countdown Timer for Event
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = eventTime - now;
      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("Event Started!");
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventTime]);

  // Handle phone verification success
  const handleVerificationSuccess = (phoneNumber) => {
    setIsPhoneVerified(true);
    setUserPhone(phoneNumber);
    setStep(2);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    setUserDetails(formData);
    setShowTicket(true);
    setStep(3);
  };

  // Download Ticket as PDF
  const handleDownloadTicket = () => {
    const blob = new Blob([JSON.stringify(userDetails, null, 2)], { type: "application/pdf" });
    saveAs(blob, "SwayamwaraSilks_Ticket.pdf");
  };

  // Share on WhatsApp
  const handleShareWhatsApp = () => {
    const message = `🎟️ Swayamwara Silks Event Ticket 🎟️\n\n📞 Phone: ${userPhone}\n👤 Name: ${userDetails?.name}\n📍 Location: ${userDetails?.location}\n📅 Event Countdown: ${countdown}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="h-full bg-gray-50 p-2">
      {/* Progress Indicator */}
      <div className="flex justify-start items-center mt-2 mb-2 gap-2">
        {["Phone Verification", "User Details", "Ticket"].map((label, index) => (
          <div key={index} className={` py-2 px-2 text-sm font-bold rounded-lg ${step === index + 1 ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`}>
            {label}
          </div>
        ))}
      </div>

      {/* Step 1: Phone Verification */}
      {!isPhoneVerified ? (
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <VerifyPhoneNumber onVerificationSuccess={handleVerificationSuccess} />
        </motion.div>
      ) : !showTicket ? (
        // Step 2: User Details Form
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="max-w-full  p-1  bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="text-center text-sm">
              ✅ Phone number <strong>{userPhone}</strong> verified successfully! Please fill in your details below.
            </p>
          </div>
          <UserDetailsForm phoneNumber={userPhone} onSubmitSuccess={handleFormSubmit} />
        </motion.div>
      ) : (
        // Step 3: Ticket Display
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Ticket userDetails={userDetails} phoneNumber={userPhone} />
          {/* <div className="text-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
              onClick={handleDownloadTicket}
            >
              📥 Download Ticket
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
              onClick={handleShareWhatsApp}
            >
              📲 Share via WhatsApp
            </button>
          </div> */}
        </motion.div>
      )}

      {/* Event Countdown */}
      <div className="text-center mt-6">
        <p className="text-lg font-semibold text-stone-500">⏳ Event Starts In: {countdown}</p>
      </div>
    </div>
  );
};

export default FormComponent;
