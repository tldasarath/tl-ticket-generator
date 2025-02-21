// import React, { useState, useEffect, useRef } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../firebase";
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// const VerifyPhoneNumber = ({ onVerificationSuccess ,isPhoneVerified}) => {
//   const [phone, setPhone] = useState('');
//   const [verificationCode, setVerificationCode] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const recaptchaVerifierRef = useRef(null);

//   const setupRecaptcha = async () => {
//     try {
//       if (!recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//           size: 'normal',
//           callback: () => setMessage("reCAPTCHA verified successfully"),
//           'expired-callback': () => {
//             setError("reCAPTCHA expired. Please try again.");
//             setupRecaptcha();
//           }
//         });
//         await recaptchaVerifierRef.current.render();
//       }
//     } catch (error) {
//       console.error("Error setting up reCAPTCHA:", error);
//       setError("Failed to initialize verification system. Please refresh the page.");
//     }
//   };

//   useEffect(() => {
//     setupRecaptcha();
//     return () => {
//       if (recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current.clear();
//         recaptchaVerifierRef.current = null;
//       }
//     };
//   }, []);

//   const sendOTP = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       if (!phone) {
//         throw new Error("Please enter a phone number");
//       }

//       if (!recaptchaVerifierRef.current) {
//         await setupRecaptcha();
//       }

//       const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifierRef.current);
//       setConfirmationResult(confirmation);
//       setMessage("OTP sent successfully!");
//     } catch (error) {
//       console.error("Error sending OTP:", error);

//       let errorMessage = "Failed to send OTP. ";

//       if (error.code === 'auth/invalid-phone-number') {
//         errorMessage += "Please enter a valid phone number with country code (e.g., +1234567890).";
//       } else if (error.code === 'auth/too-many-requests') {
//         errorMessage += "Too many attempts. Please try again later.";
//       } else if (error.code === 'auth/internal-error') {
//         errorMessage += "Please refresh the page and try again.";
//         await setupRecaptcha();
//       } else {
//         errorMessage += "Please try again.";
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOTP = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       if (!verificationCode) {
//         throw new Error("Please enter the verification code");
//       }

//       if (!confirmationResult) {
//         throw new Error("Please send OTP first");
//       }

//       await confirmationResult.confirm(verificationCode);
//       setMessage("Phone number verified successfully!");

//       // Call the success callback with the verified phone number
//       onVerificationSuccess(phone);
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setError("Invalid verification code. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-gray-50 py-4">
//       <div className="w-full space-y-4 bg-stone-300 p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-start text-gray-800">
//           Phone Verification
//         </h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
//             {error}
//           </div>
//         )}

//         {message && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
//             {message}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <PhoneInput
//               defaultCountry="in"
//               value={phone}
//               onChange={setPhone} 
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Include country code (e.g., +91 for India)
//             </p>
//           </div>
//           {!isPhoneVerified&&<div id="recaptcha-container" className="flex justify-start rounded-lg my-4"></div>}


//           <button
//             onClick={sendOTP}
//             disabled={loading}
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>

//           {confirmationResult && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Verification Code
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter 6-digit code"
//                   value={verificationCode}
//                   onChange={(e) => setVerificationCode(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md text-black"
//                   disabled={loading}
//                 />
//               </div>

//               <button
//                 onClick={verifyOTP}
//                 disabled={loading}
//                 className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyPhoneNumber;
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { useFormik } from 'formik';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase';
import ReCAPTCHA from 'react-google-recaptcha';

// interface VerifyPhoneNumberProps {
//   isPhoneVerified: boolean;
//   onVerificationSuccess: (phoneNumber: string) => void;
// }

const VerifyPhoneNumber = ({ onVerificationSuccess, isPhoneVerified, onVerified }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState("+91")
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const recaptchaRef = useRef(null);
  const otpRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return; // Allow only digits and empty string

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  // const [captchaValue, setCaptchaValue] = useState("");

  // const siteKey = "6LcIL94qAAAAAFBHLK_sketF_y4M107RFK7k7Rw7"
  // const handleCaptchaChange = (value) => {
  //   setCaptchaValue(value || "");
  // };
  // const setupRecaptcha = async () => {
  //   try {
  //     if (!recaptchaVerifierRef.current) {
  //       recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //         size: 'normal',
  //         callback: () => setMessage("reCAPTCHA verified successfully"),
  //         'expired-callback': () => {
  //           setError("reCAPTCHA expired. Please try again.");
  //           setupRecaptcha();
  //         }
  //       });
  //       await recaptchaVerifierRef.current.render();
  //     }
  //   } catch (error) {
  //     console.error("Error setting up reCAPTCHA:", error);
  //     // setError("Failed to initialize verification system. Please refresh the page.");
  //   }
  // };
  // const handleSendOtp = (e) => {
  //   e.preventDefault();
  //   if (phoneNumber.length < 10) {
  //     setError('Please enter a valid phone number');
  //     return;
  //   }
  //   setError('');
  //   setShowOtpInput(true);
  // };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      countrycode: countryCode,
      phonenumber: ""
    },
    onSubmit: async (Data) => {
      try {
        if (Data.phonenumber.length < 10) {
          setError('Please enter a valid phone number');
          return;
        } else {
          // e.preventDefault();
          setLoading(true);
          setShowOtpInput(!showOtpInput)
          setError("");

          // if (!validatePhone(Data.phonenumber)) {
          //   setError("Invalid phone number (e.g., +919876543210)");
          //   setLoading(false);
          //   return;
          // }

          // // Execute reCAPTCHA v3 if not already verified
          // if (!captchaToken) {
          //   recaptchaRef.current.execute();
          //   setLoading(false);
          //   return;
          // }

          // try {
          //   // Send OTP with Firebase Authentication
          //   const confirmationResult = await signInWithPhoneNumber(
          //     auth,
          //     Data.phonenumber,
          //     window.recaptchaVerifier
          //   );
          //   window.confirmationResult = confirmationResult; // Store for OTP verification
          //   onVerified(Data.phonenumber); // Move to OTP step
          // } catch (error) {
          //   setError(error.message || "Failed to send OTP");
          //   window.recaptchaVerifier.render().then((widgetId) => {
          //     window.grecaptcha.reset(widgetId); // Reset invisible reCAPTCHA on error
          //   });
          // } finally {
          //   setLoading(false);
          // }



        }
      } catch (error) {
        console.error(error);

      }


    }
  })
  // const handleOtpChange = (e) => {
  //   setOtp((prev) => prev + e.target.value)
  // }
  const handleVerifyOtp = () => {
    // e.preventDefault();
    console.log(otp);

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    // In a real app, you would verify the OTP with your backend
    onVerificationSuccess(phoneNumber);
  };


  // useEffect(() => {

  //     window.recaptchaVerifier = new RecaptchaVerifier(auth,
  //       "recaptcha-container",
  //       {
  //         size: "normal",
  //         "callback": () => {

  //         },
  //         "expired-callback": () => {
  //           setError("reCAPTCHA expired. Please try again.");
  //           setCaptchaToken(null);
  //         },
  //       },
  //       auth
  //     );

  // }, []);
  const validatePhone = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format (e.g., +919876543210)
    return phoneRegex.test(phone);
  };

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token); // Store the reCAPTCHA v3 token
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
          <Phone className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Phone Verification</h2>
        <p className="text-gray-600">Enter your phone number to receive a verification code</p>
      </div>

      {!showOtpInput ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>

            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
              {/* Indian Flag Image */}
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                alt="India Flag"
                className="w-6 h-4 mr-2"
              />

              {/* Fixed +91 Country Code */}
              <span className="text-black font-medium mr-2">{countryCode}</span>

              {/* Phone Number Input */}
              <input
                type="tel"
                id="phonenumber"
                value={values.phonenumber}
                onChange={handleChange}
                className="w-full outline-none text-black"
                placeholder="Enter your phone number"
              />
            </div>
            {/* <ReCAPTCHA
              sitekey="6LcIL94qAAAAAFYFThJqmuNxxGZA907IaSuzLq6N"
              onChange={handleCaptchaVerify}
            /> */}
          </div>
          <div className='w-full h-4 '>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div>

          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {loading ? "Sending..." : "Send OTP"}
            {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
          </button>
        </motion.form>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
           onSubmit={handleVerifyOtp}
          className="space-y-4"
        >
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code:
            </label>
            <div className="flex gap-2 justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  ref={(el) => (otpRefs.current[index] = el)}
                  className="w-10 h-10 text-center text-black text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Verify OTP
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </motion.form>

      )}
    </div>
  );
};

export default VerifyPhoneNumber;