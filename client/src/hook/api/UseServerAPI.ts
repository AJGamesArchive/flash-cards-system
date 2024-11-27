// Imports
import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import api from "../../services/api";
import { ToastMessage } from "primereact/toast";
import apiRequestError from "../../errors/APIRequestError";
import useToastMessage, { UseToastMessageHook } from "../core/UseToastMessage";
import APIRequestHookOptions from "../../interfaces/APIRequestOptions";
import APIMethods from "../../types/services/APIMethods";
import APIResponse from "../../types/services/APIResponse";
import build from "../../static/Build";

/**
 * React hook to send HTTP requests to the server API
 * @param method HTTP method to use
 * @param endpoint Server API endpoint to target
 * @param body Object to pass as request body
 * @param options Additional request options
 * @param queries Optional queries to add to the URL
 */
function useServerAPI<T>(
  method: APIMethods,
  endpoint: string,
  body: object,
  options: APIRequestHookOptions = { immediate: true },
  queries?: object,
): APIResponse<T> {
  // Hooks
  const toastMessage: UseToastMessageHook = useToastMessage();

  // Hook states
  const [status, setStatus] = useState<number>(0);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hook static data
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem('fc-jwt')}`,
    'client-build': build,
  };

  /**
   * Function to send the HTTP request
   * @param reqBody Optional request body
   * @returns HTTP status code
   */
  const sendRequest = useCallback(async (reqBody?: object): Promise<number> => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      var response; 
      switch(method) {
        case 'GET':
          response = await api.get<T>(`${endpoint}`, {
            headers: requestHeaders,
            params: queries ? queries : undefined,
          });
          break;
        case 'POST':
          response = await api.post<T>(`${endpoint}`, reqBody ? reqBody : body, {
            headers: requestHeaders,
            params: queries ? queries : undefined,
          });
          break;
        case 'PUT':
          response = await api.put<T>(`${endpoint}`, reqBody ? reqBody : body, {
            headers: requestHeaders,
            params: queries ? queries : undefined,
          });
          break;
        case 'PATCH':
          response = await api.patch<T>(`${endpoint}`, reqBody ? reqBody : body, {
            headers: requestHeaders,
            params: queries ? queries : undefined,
          });
          break;
        case 'DELETE':
          response = await api.delete<T>(`${endpoint}`, {
            headers: requestHeaders,
            params: queries ? queries : undefined,
          });
          break;
        default:
          throw new Error('Invalid HTTP Method');
      };
      toastMessage.setToast({
        severity: 'success',
        summary: 'Success!',
        detail: (response.data as any).message ? (response.data as any).message : undefined,
        closeIcon: 'pi pi-times',
        life: 3000,
      });
      setStatus(response.status);
      setData(response.data);
      setLoading(false);
      return response.status;
    } catch (error: any) {
      const toast: ToastMessage = apiRequestError(error);
      toastMessage.setToast(toast);
      const axiosError: AxiosError = error as AxiosError;
      const errorMessage: string =
        `[Error: ${
          axiosError.response ? axiosError.response.status : 0
        }]: ${
          (axiosError.response && axiosError.response.data) ? (axiosError.response.data as any).message : axiosError.message || 'An error occurred.'
        }`;
      setError(errorMessage);
      setStatus(axiosError.response ? axiosError.response.status : 0);
      setLoading(false);
      return axiosError.response ? axiosError.response.status : 0;
    };
  }, [endpoint, body, queries]);

  // Send request on initial render if immediate option flag is present
  useEffect(() => {
    if(options.immediate) sendRequest();
  }, [options.immediate]);

  // Return states
  return {
    status,
    data,
    loading,
    error,
    toast: toastMessage.toast,
    reTrigger: sendRequest
  };
};

export default useServerAPI;