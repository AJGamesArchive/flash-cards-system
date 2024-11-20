// Imports
import { SetStateAction } from "react";
import APIResponse from "../../types/services/APIResponse";
import ErrorWatch from "../../types/core/ErrorWatch";

/**
 * Function to typecasting data received from the API
 * @param dataIdentifier Data Key Used To Label Errors
 * @param response API Response Object
 * @param dataKey API Response Object Key To Index Data To Cast - Set to null to cast whole 'Data' object
 * @param setData Set State Function To Cast Data To
 * @param setError Set State Function To Log Error To
 */
function castData<T>(
  dataIdentifier: string,
  response: APIResponse<any>,
  dataKey: string | null,
  setData: (value: SetStateAction<T>) => void,
  setError: (value: SetStateAction<ErrorWatch>) => void
): void {
  setError(null);
  if(response.data) {
    try {
      if(dataKey) {
        if(!response.data[dataKey]) throw new Error(`[Error]: Missing ${dataIdentifier} Data`);
        setData(response.data[dataKey]);
      } else {
        if(!response.data) throw new Error(`[Error]: Missing ${dataIdentifier} Data`);
        setData(response.data);
      };
    } catch (error: any) {
      setError(error.message);
    };
    return;
  };
  return;
};

export default castData;