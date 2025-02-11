import React, { useState } from 'react';
import VerifyPhoneNumber from './VerifyPhoneNumber';
import UserDetailsForm from './UserDetailsForm';
import Ticket from './Ticket';

const FormComponent = () => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  // Handle phone verification success
  const handleVerificationSuccess = (phoneNumber) => {
    setIsPhoneVerified(true);
    setUserPhone(phoneNumber);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    setUserDetails(formData);
    setShowTicket(true);
  };

  return (
    <div className="h-full bg-gray-50">
      {!isPhoneVerified ? (
        <div className="w-full">
          <VerifyPhoneNumber onVerificationSuccess={handleVerificationSuccess} />
        </div>
      ) : !showTicket ? (
        <div className="w-full">
          <div className="max-w-md mx-auto p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="text-center">
              Phone number {userPhone} verified successfully! Please fill in your details below.
            </p>
          </div>
          <UserDetailsForm 
            phoneNumber={userPhone} 
            onSubmitSuccess={handleFormSubmit}
          />
        </div>
      ) : (
        <Ticket userDetails={userDetails} phoneNumber={userPhone} />
      )}
    </div>
  );
};

export default FormComponent;