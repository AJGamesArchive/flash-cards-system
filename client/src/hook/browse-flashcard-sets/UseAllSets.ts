// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Set from "../../types/global/Set";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the states exposed by the useAllSets hook
 */
export type UseAllSetsHook = {
  allSets: Set[];
  allSetsRequest: {
    toast: ToastWatch;
    loading: boolean;
    error: ErrorWatch;
  };
  castingError: ErrorWatch;
};

/**
 * Hook to type-cast and expose all sets in the system
 */
function useAllSets(): UseAllSetsHook {
  // Hooks & states
  const allSetsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets`,
    {},
  );
  const [allSets, setAllSets] = useState<Set[]>([]);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);

  // Hook to type-cast data received from the API
  useEffect(() => {
    if(allSetsRequest.data) castData(
      'Sets',
      allSetsRequest,
      null,
      setAllSets,
      setCastingError,
    );
  }, [allSetsRequest.data]);
  
  // Return states
  return {
    allSets,
    allSetsRequest: {
      toast: allSetsRequest.toast,
      loading: allSetsRequest.loading,
      error: allSetsRequest.error,
    },
    castingError,
  };
};

export default useAllSets;