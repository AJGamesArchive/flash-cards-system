// Imports
import { RefObject, useEffect } from "react";
import { Toast } from "primereact/toast";
import ToastWatch from "../../types/core/ToastWatch";
import ToastSeverity from "../../types/core/ToastSeverity";

/**
 * Hook to listen to a toast object and render a toast message each time the object changes
 * @param toastObjects Array of toast objects to watch
 * @param ignoreSeverity Optional param to specify toast message severities to ignore
 */
function useToastListener(toastRef: RefObject<Toast>, toastMessages: ToastWatch[], ignoreSeverity?: ToastSeverity[]): void {
  // Output toast messages to the UI
  useEffect(() => {
    toastMessages.forEach((toastObject) => {
      if(Object.keys(toastObject.toast).length === 0) return;
      if(ignoreSeverity && ignoreSeverity.includes(toastObject.toast.severity)) return;
      if(toastRef.current) toastRef.current.show(toastObject.toast);
      else console.warn('Cannot output Toast Message');
      toastObject.clearFunction();
      return;
    });
    return;
  }, [toastMessages]);
};

export default useToastListener;