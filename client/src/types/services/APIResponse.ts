// Imports
import ToastWatch from "../core/ToastWatch";
import ErrorWatch from "../core/ErrorWatch";

/**
 * Type to define the data returned from a server API request
 */
type APIResponse<T> = {
  status: number;
  data: T | null;
  loading: boolean;
  error: ErrorWatch;
  toast: ToastWatch;
  reTrigger: (reqBody?: object) => Promise<number>;
  sendBackgroundRequest: (reqEndpoint?: string, reqBody?: object, reqQuery?: object) => Promise<number>;
};

export default APIResponse;