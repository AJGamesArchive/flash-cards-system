// Imports
import { useState, SetStateAction } from "react";

// Import types
import ToastWatch from "../../types/core/ToastWatch";
import { ToastMessage } from "primereact/toast";

/**
 * Type to define the states exposed by the useToastMessage hook
 */
export type UseToastMessageHook = {
  toast: ToastWatch;
  setToast: (message: SetStateAction<ToastMessage>) => void;
};

/**
 * Hook to create and manage a toast message
 */
function useToastMessage(): UseToastMessageHook {
  // Hook states
  const [toast, setToast] = useState<ToastMessage>({});

  // Function to clear the toast message object
  function clearToast(): void {
    setToast({});
    return;
  };

  // Return states
  return {
    toast: {
      toast: toast,
      clearFunction: clearToast,
    },
    setToast,
  };
};

export default useToastMessage;