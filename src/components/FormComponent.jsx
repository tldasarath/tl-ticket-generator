import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VerifyPhoneNumber from "./VerifyPhoneNumber";
import UserDetailsForm from "./UserDetailsForm";
import Ticket from "./Ticket";
import { saveAs } from "file-saver";
import { Calendar, Clock, Phone, User } from "lucide-react";

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
  const progressSteps = [
    { label: "Phone Verification", icon: Phone },
    { label: "User Details", icon: User },
    { label: "Ticket", icon: Calendar },
  ];
  return (
    // <div className="h-full bg-gray-50 p-2">
    //   {/* Progress Indicator */}
    //   <div className="flex justify-start items-center mt-2 mb-2 gap-2">
    //     {["Phone Verification", "User Details", "Ticket"].map((label, index) => (
    //       <div key={index} className={` py-2 px-2 text-sm font-bold rounded-lg ${step === index + 1 ? "bg-black text-white" : "bg-gray-300 text-gray-700"}`}>
    //         {label}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Step 1: Phone Verification */}
    //   {!isPhoneVerified ? (
    //     <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
    //       <VerifyPhoneNumber isPhoneVerified={isPhoneVerified} onVerificationSuccess={handleVerificationSuccess} />
    //     </motion.div>
    //   ) : !showTicket ? (
    //     // Step 2: User Details Form
    //     <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
    //       <div className="max-w-full  p-1  bg-green-100 border border-green-400 text-green-700 rounded-lg">
    //         <p className="text-center text-sm">
    //           ✅ Phone number <strong>{userPhone}</strong> verified successfully! Please fill in your details below.
    //         </p>
    //       </div>
    //       <UserDetailsForm phoneNumber={userPhone} onSubmitSuccess={handleFormSubmit} />
    //     </motion.div>
    //   ) : (
    //     // Step 3: Ticket Display
    //     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
    //       <Ticket userDetails={userDetails} phoneNumber={userPhone} />
    //       {/* <div className="text-center mt-4">
    //         <button
    //           className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
    //           onClick={handleDownloadTicket}
    //         >
    //           📥 Download Ticket
    //         </button>
    //         <button
    //           className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
    //           onClick={handleShareWhatsApp}
    //         >
    //           📲 Share via WhatsApp
    //         </button>
    //       </div> */}
    //     </motion.div>
    //   )}

    //   {/* Event Countdown */}
    //   <div className="text-center mt-6">
    //     <p className="text-lg font-thin  bg-stone-400 bg-opacity-40 p-2 w-fit  font-serif text-red-800">⏳ Event Starts In: <span className="text-black font-bold font-sans  text-xl">{countdown}</span> </p>
    //   </div>
    // </div>
    <div className="bg-stone-50 rounded-lg shadow-xl p-6 h-fit md:h-[700px] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full -mr-20 -mt-20 opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full -ml-16 -mb-16 opacity-50" />

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        {progressSteps.map((s, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: step === index + 1 ? 1 : 0.8, opacity: 1 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${
                step === index + 1
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : step > index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {React.createElement(s.icon, { size: 20 })}
            </motion.div>
            <span className={`text-sm font-medium ${step === index + 1 ? "text-purple-600" : "text-gray-500"}`}>
              {s.label}
            </span>
            {index < progressSteps.length - 1 && (
              <div className="absolute h-[2px] w-[calc(33.333%-2rem)] bg-gray-200 top-6 left-[calc(16.666%+1rem)]" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {!isPhoneVerified ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VerifyPhoneNumber isPhoneVerified={isPhoneVerified} onVerificationSuccess={handleVerificationSuccess} />
          </motion.div>
        ) : !showTicket ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Phone className="text-white" size={16} />
                </div>
                <p className="text-green-800">
                  Phone number <span className="font-semibold">{userPhone}</span> verified successfully!
                </p>
              </div>
            </div>
            <UserDetailsForm phoneNumber={userPhone} onSubmitSuccess={handleFormSubmit} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Ticket userDetails={userDetails} phoneNumber={userPhone} />
          </motion.div>
        )}
      </div>

      {/* Event Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 relative z-10"
      >
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-center space-x-4">
            <Clock className="text-purple-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-purple-900">Event Countdown</h3>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {countdown}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormComponent;
