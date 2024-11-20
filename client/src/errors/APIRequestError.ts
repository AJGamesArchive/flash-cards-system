// Imports
import { ToastMessage } from "primereact/toast";
import axios from "axios";

/**
 * Function to handle processing API request errors and return corresponding Toast Messages
 * @param error Caught Error
 * @returns UI ToastMessage
 */
function apiRequestError(error: any): ToastMessage {
  if (error.code === 'ECONNABORTED') {
    return { // 408 Timeout
      severity: `warn`,
      summary: `Process Timed Out`,
      detail: `The requested process has failed due to timeout. This is likely due to poor internet connection. Please check your internet connection and refresh the page.`,
      closeIcon: 'pi pi-times',
      sticky: true,
    };
  };
  if(axios.isAxiosError(error)) {
    if(error.response) {
      return {
        severity: `error`,
        summary: `${error.response.status}: ${error.response.data.message}`,
        detail: `${error.name}: ${error.message}`,
        closeIcon: 'pi pi-times',
        sticky: true,
      };
    };
  };
  console.error(error);
  return {
    severity: `error`,
    summary: `Unexpected Error`,
    detail: `${error.message}`,
    closeIcon: 'pi pi-times',
    sticky: true,
  };
};

export default apiRequestError;