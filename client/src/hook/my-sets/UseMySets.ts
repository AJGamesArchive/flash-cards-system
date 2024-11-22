// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Set from "../../types/global/Set";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the states exposed by the useMySets hook
 */
export type UseMySetsHook = {
  mySets: Set[];
  mySetsRequest: {
    toast: ToastWatch;
    loading: boolean;
    error: ErrorWatch;
  };
  castingError: ErrorWatch;
};

/**
 * Hook to type-cast and manage a users sets
 */
function useMySets(): UseMySetsHook {
  // Hooks & states
  const mySetsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/sets`,
    {},
  );
  const [mySets, setMySets] = useState<Set[]>([]);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);

  // Hook to type-cast data received from the API
  useEffect(() => {
    if(mySetsRequest.data) castData(
      'Sets',
      mySetsRequest,
      null,
      setMySets,
      setCastingError,
    );
  }, [mySetsRequest.data]);
  
  // Return states
  return {
    mySets,
    mySetsRequest: {
      toast: mySetsRequest.toast,
      loading: mySetsRequest.loading,
      error: mySetsRequest.error,
    },
    castingError,
  };
};

export default useMySets;