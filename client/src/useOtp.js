import { useState } from 'react';

export function useOtp({ showAlert, setCustomerInfo, clearCartState }) {
  const [isFirstInstallVerified, setIsFirstInstallVerified] = useState(true);
  const [authStep, setAuthStep] = useState('register'); // 'register' or 'otp'
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!authName || !authPhone) {
      setAuthError('Name and Mobile number are required.');
      return;
    }
    if (authPhone.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setAuthError('');
    setIsSendingOtp(true);
    
    setTimeout(() => {
      // Generate a random 4-digit code
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(newOtp);
      setAuthStep('otp');
      setIsSendingOtp(false);
      
      // Autofill customer context for ease of experience
      setCustomerInfo(prev => ({
        ...prev,
        name: authName,
        phone: authPhone
      }));

      // Deliver simulated OTP through app's notification system
      showAlert(`SMS Gateway: Verification code sent!`, 'success');
      setTimeout(() => {
        showAlert(`🔑 Rasi Auth Code: [ ${newOtp} ]`, 'success');
      }, 1000);
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp) {
      setIsFirstInstallVerified(true);
      showAlert('Welcome! Device authentication successful.');
    } else {
      setAuthError('Incorrect OTP. Please enter the valid code received via SMS.');
      showAlert('Incorrect OTP code.', 'error');
    }
  };

  const handleResetRegistration = () => {
    setAuthStep('register');
    setEnteredOtp('');
    setGeneratedOtp('');
    setAuthError('');
  };

  const handleUserSignOut = () => {
    setIsFirstInstallVerified(false);
    setAuthStep('register');
    setAuthName('');
    setAuthPhone('');
    clearCartState();
    showAlert('You have signed out of Rasi Pharmacy.');
  };

  return {
    isFirstInstallVerified,
    setIsFirstInstallVerified,
    authStep,
    setAuthStep,
    authName,
    setAuthName,
    authPhone,
    setAuthPhone,
    generatedOtp,
    setGeneratedOtp,
    enteredOtp,
    setEnteredOtp,
    authError,
    setAuthError,
    isSendingOtp,
    setIsSendingOtp,
    handleRequestOtp,
    handleVerifyOtp,
    handleResetRegistration,
    handleUserSignOut
  };
}
