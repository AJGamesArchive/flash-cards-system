// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Collection from "../../types/global/Collection";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the states exposed by the useAddToCollection hook
 */
export type UseAddToCollectionHHook = {
  collections: Collection[];
  collectionsRequest: {
    toast: ToastWatch;
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    reTrigger: () => Promise<number>;
  };
};

/**
 * Hook to handle adding sets to collections
 */
function useAddToCollection(): UseAddToCollectionHHook {
  // Hooks & states
  const [collections, setCollections] = useState<Collection[]>([]);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);
  const getCollectionsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/collections`,
    {},
  );

  // Hook to type-cast data received from the API
  useEffect(() => {
    if(getCollectionsRequest.data) castData(
      'Sets',
      getCollectionsRequest,
      null,
      setCollections,
      setCastingError,
    );
  }, [getCollectionsRequest.data]);
  
  // Return states
  return {
    collections,
    collectionsRequest: {
      toast: getCollectionsRequest.toast,
      loading: getCollectionsRequest.loading,
      apiError: getCollectionsRequest.error,
      castingError,
      reTrigger: getCollectionsRequest.reTrigger,
    },
  };
};

export default useAddToCollection;