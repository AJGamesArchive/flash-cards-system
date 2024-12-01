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

//TODO Future me - make this hook store endpoint, body, queries, etc... as states and expose functions to update them instead of doing dodgy param overrides and duplicating functions you dombass

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
  options: APIRequestHookOptions = {
    immediate: true,
    ignoreStatusCodes: [],
  },
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
   * Function to send a stateless HTTP request
   * @param overrideIgnoreStatusCodes Optional list of status codes to ignore
   * @param reqEndpoint Optional request endpoint
   * @param reqBody Optional request body
   * @param reqQueries Optional request queries
   * @note If no params are passed, the hook will use the default values
   * @note Will not update any hook states
   * @note Will still trigger UI toasts
   * @returns HTTP status code
   */
  const sendBackgroundRequest = async (
    overrideIgnoreStatusCodes?: number[],
    reqEndpoint?: string,
    reqBody?: object,
    reqQueries?: object,
  ): Promise<number> => {
    // Send request
    try {
      // Send HTTP request based on given params
      var response; 
      switch(method) {
        case 'GET':
          response = await api.get<T>(`${reqEndpoint ?? endpoint}`,
            {
              headers: requestHeaders,
              params: reqQueries ?? queries ?? undefined,
            }
          );
          break;
        case 'POST':
          response = await api.post<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: requestHeaders,
              params: reqQueries ?? queries ?? undefined,
            }
          );
          break;
        case 'PUT':
          response = await api.put<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: requestHeaders,
              params: reqQueries ?? queries ?? undefined,
            }
          );
          break;
        case 'PATCH':
          response = await api.patch<T>(
            `${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: requestHeaders,
              params: reqQueries ?? queries ?? undefined,
            }
          );
          break;
        case 'DELETE':
          response = await api.delete<T>(
            `${reqEndpoint ?? endpoint}`,
            {
              headers: requestHeaders,
              params: reqQueries ?? queries ?? undefined,
            }
          );
          break;
        default:
          throw new Error('Invalid HTTP Method');
      };

      // Handle successful request
      toastMessage.setToast({
        severity: 'success',
        summary: 'Success!',
        detail: (response.data as any).message ? (response.data as any).message : undefined,
        closeIcon: 'pi pi-times',
        life: 3000,
      });
      return response.status;
    } catch (error: any) {
      // Handle failed request
      const axiosError: AxiosError = error as AxiosError;

      // Return a neutral response if the error code is in the ignore list
      if(
        axiosError.response &&
        ((overrideIgnoreStatusCodes)
          ? overrideIgnoreStatusCodes.includes(axiosError.response.status)
          : options.ignoreStatusCodes?.includes(axiosError.response.status)
        )
      ) {
        if(axiosError.response && axiosError.response.data) toastMessage.setToast({
          severity: 'info',
          summary: (axiosError.response.data as any).message,
          closeIcon: 'pi pi-times',
          life: 3000,
        });
        setStatus(axiosError.response.status);
        setLoading(false);
        return axiosError.response.status;
      };

      // Handle error and return status code
      const toast: ToastMessage = apiRequestError(error);
      toastMessage.setToast(toast);
      return axiosError.response ? axiosError.response.status : 0;
    };
  };

  /**
   * Function to send the HTTP request
   * @param overrideIgnoreStatusCodes Optional list of status codes to ignore
   * @param reqBody Optional request body
   * @returns HTTP status code
   */
  const sendRequest = useCallback(async (
    overrideIgnoreStatusCodes?: number[],
    reqEndpoint?: string,
    reqBody?: object
  ): Promise<number> => {
    // Reset states
    setLoading(true);
    setError(null);
    setData(null);

    // Send request
    try {
      // Send HTTP request based on given params
      var response; 
      switch(method) {
        case 'GET':
          response = await api.get<T>(`${ reqEndpoint ?? endpoint}`,
            {
              headers: requestHeaders,
              params: queries ?? undefined,
            }
          );
          break;
        case 'POST':
          response = await api.post<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: requestHeaders,
              params: queries ?? undefined,
            }
          );
          break;
        case 'PUT':
          response = await api.put<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: requestHeaders,
              params: queries ?? undefined,
            }
          );
          break;
        case 'PATCH':
          response = await api.patch<T>(`${reqEndpoint ?? endpoint}`,
            reqBody ?? body,
            {
              headers: requestHeaders,
              params: queries ?? undefined,
            }
          );
          break;
        case 'DELETE':
          response = await api.delete<T>(`${reqEndpoint ?? endpoint}`,
            {
              headers: requestHeaders,
              params: queries ?? undefined,
            }
          );
          break;
        default:
          throw new Error('Invalid HTTP Method');
      };

      // Handle successful request
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
      // Handle failed request
      const axiosError: AxiosError = error as AxiosError;

      // Return a neutral response if the error code is in the ignore list
      if(
        axiosError.response &&
        ((overrideIgnoreStatusCodes)
          ? overrideIgnoreStatusCodes.includes(axiosError.response.status)
          : options.ignoreStatusCodes?.includes(axiosError.response.status)
        )
      ) {
        if(axiosError.response && axiosError.response.data) toastMessage.setToast({
          severity: 'info',
          summary: (axiosError.response.data as any).message,
          closeIcon: 'pi pi-times',
          life: 3000,
        });
        setStatus(axiosError.response.status);
        setLoading(false);
        return axiosError.response.status;
      };

      // Handle error and return status code
      const toast: ToastMessage = apiRequestError(error);
      toastMessage.setToast(toast);
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
    reTrigger: sendRequest,
    sendBackgroundRequest,
  };
};

export default useServerAPI;