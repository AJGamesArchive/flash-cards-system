// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the set creation configuration data
 */
type SetCreationConfig = {
  setCreationLimit: number;
  creationCounter: number;
  date: string;
};

/**
 * Type to define the states exposed by the useAdminConfig hook
 */
export type UseAdminConfigHook = {
  setCreationConfig: SetCreationConfig | null;
  creationConfigUpdated: boolean;
  getSetCreationConfig: {
    toast: ToastWatch;
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
  };
  updateSetCreationLimitRequest: {
    loading: boolean;
    toast: ToastWatch;
  };
  resetCreationCounterRequest: {
    loading: boolean;
    toast: ToastWatch;
  };
  updateSetCreationLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveSetCreationLimit: () => Promise<number>;
  resetCreationCounter: () => Promise<number>;
};

/**
 * Hook to manage admin configuration settings
 */
function useAdminConfig(): UseAdminConfigHook {
  // Hooks & states
  const [setCreationConfig, setSetCreationConfig] = useState<SetCreationConfig | null>(null);
  const [creationConfigUpdated, setCreationConfigUpdated] = useState<boolean>(false);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);
  const getSetCreationConfig: APIResponse<object> = useServerAPI(
    'GET',
    `/systemConfig/setCreationLimit`,
    {},
  );
  const updateSetCreationLimitRequest: APIResponse<object> = useServerAPI(
    'PATCH',
    `/systemConfig/setCreationLimit`,
    {
      setCreationLimit: setCreationConfig?.setCreationLimit,
    },
    { immediate: false },
  );
  const resetCreationCounterRequest: APIResponse<object> = useServerAPI(
    'DELETE',
    `/systemConfig/setCreationLimit`,
    {},
    { immediate: false },
  );

  // Function to update the set creation limit
  const updateSetCreationLimit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Get input data
    const input: string = e.target.value;
    const key: string = e.target.name;
    let castedInput: number;

    // Type-cast & validate input
    try {
      castedInput = Number(input);
      if(castedInput < 0) throw new Error('Invalid input');
    } catch (error: any) {
      console.error(error);
      return;
    };

    // Save input to state
    setSetCreationConfig((prev) => (!prev) ? prev : ({
      ...prev,
      [key]: castedInput,
    }));
    setCreationConfigUpdated(true);
    return;
  };

  // Function to update the set creation limit
  const saveSetCreationLimit = (): Promise<number> => updateSetCreationLimitRequest.reTrigger();

  // Function to reset the creation counter
  const resetCreationCounter = (): Promise<number> => resetCreationCounterRequest.reTrigger();

  // Hook to type-cast data received from the API
  useEffect(() => {
    if(getSetCreationConfig.data) {
      castData(
        'Admin Config',
        getSetCreationConfig,
        null,
        setSetCreationConfig,
        setCastingError,
      );
      setCreationConfigUpdated(false);
    };
  }, [getSetCreationConfig.data]);
  useEffect(() => {
    if(updateSetCreationLimitRequest.data) {
      castData(
        'Admin Config',
        updateSetCreationLimitRequest,
        null,
        setSetCreationConfig,
        setCastingError,
      );
      setCreationConfigUpdated(false);
    };
  }, [updateSetCreationLimitRequest.data]);
  
  // Return states
  return {
    setCreationConfig,
    creationConfigUpdated,
    getSetCreationConfig: {
      toast: getSetCreationConfig.toast,
      loading: getSetCreationConfig.loading,
      apiError: getSetCreationConfig.error,
      castingError,
    },
    updateSetCreationLimitRequest: {
      loading: updateSetCreationLimitRequest.loading,
      toast: updateSetCreationLimitRequest.toast,
    },
    resetCreationCounterRequest: {
      loading: resetCreationCounterRequest.loading,
      toast: resetCreationCounterRequest.toast,
    },
    updateSetCreationLimit,
    saveSetCreationLimit,
    resetCreationCounter,
  };
};

export default useAdminConfig;