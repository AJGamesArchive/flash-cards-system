// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Set from "../../types/global/Set";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the states exposed by the useCollectionSets hook
 */
export type UseCollectionSetsHook = {
  sets: Set[];
  setsRequest: {
    toast: ToastWatch;
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
  };
  removeFromCollection: (setUUID: string) => Promise<void>;
  removeRequest: {
    toast: ToastWatch;
    loading: boolean;
  };
};

/**
 * Hook to type-cast and manage a collections sets
 */
function useCollectionSets(
  collectionUUID: string,
): UseCollectionSetsHook {
  // Hooks & states
  const [sets, setSets] = useState<Set[]>([]);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);
  const getSetsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/collections/${collectionUUID}/sets`,
    {},
  );
  const removeRequest: APIResponse<object> = useServerAPI(
    'DELETE',
    ``,
    {},
    { immediate: false },
  );

  // Function to remove a set from a collection
  const removeFromCollection = async (setUUID: string): Promise<void> => {
    const status: number = await removeRequest.reTrigger(
      undefined,
      `/users/${localStorage.getItem('fc-uuid')}/collections/${collectionUUID}/sets/${setUUID}`,
    );
    if(status !== 204) return;
    getSetsRequest.reTrigger();
    return;
  };

  // Hook to type-cast data received from the API
  useEffect(() => {
    if(getSetsRequest.data) castData(
      'Sets',
      getSetsRequest,
      null,
      setSets,
      setCastingError,
    );
  }, [getSetsRequest.data]);
  
  // Return states
  return {
    sets,
    setsRequest: {
      toast: getSetsRequest.toast,
      loading: getSetsRequest.loading,
      apiError: getSetsRequest.error,
      castingError,
    },
    removeFromCollection,
    removeRequest: {
      toast: removeRequest.toast,
      loading: removeRequest.loading,
    },
  };
};

export default useCollectionSets;