import React from 'react';
import { toast } from "sonner";

const Toast = ({ message, type }) => {
  const toastStyle = {
    background: type === 'success' ? 'rgba(0,150,0,0.6)' : 'rgba(200,0,0,0.6)',
    color: 'white',
    border: 'none',
    transform: 'translateY(100%)',
  };

  const toastOptions = {
    position: 'top-right',
    autoClose: type === 'success' ? 1000 : 2000, // Auto close duration based on type
    style: toastStyle,
  };

  // Manually map the type to the corresponding toast method
  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'fail':
      toast.error(message, toastOptions);
      break;
    default:
      console.error(`Unsupported toast type: ${type}`);
      break;
  }

  return null; // Custom toast component does not render any UI directly
};

export default Toast;
