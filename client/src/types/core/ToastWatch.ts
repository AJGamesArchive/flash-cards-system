// Imports
import { ToastMessage } from "primereact/toast";

/**
 * Type to define the toast data required to power the useToastListener hook
 */
type ToastWatch = {
  toast: ToastMessage;
  clearFunction: () => void;
};

export default ToastWatch;