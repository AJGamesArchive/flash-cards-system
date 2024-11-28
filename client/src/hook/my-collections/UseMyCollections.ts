// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Collection from "../../types/global/Collection";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the states exposed by the useMyCollections hook
 */
export type UseMyCollectionsHook = {
  myCollections: Collection[];
  myCollectionsRequest: {
    toast: ToastWatch;
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
  };
};

/**
 * Hook to type-cast and manage a users collections
 */
function useMyCollections(): UseMyCollectionsHook {
  // Hooks & states
  const [myCollections, setMyCollections] = useState<Collection[]>([]);
  const [collectionCastingError, setCollectionCastingError] = useState<ErrorWatch>(null);
  const myCollectionsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/collections`,
    {},
    { immediate: true, ignoreStatusCodes: [404] },
  );

  // Hook to type-cast collection data received from the API
  useEffect(() => {
    if(myCollectionsRequest.data) castData(
      'Sets',
      myCollectionsRequest,
      null,
      setMyCollections,
      setCollectionCastingError,
    );
  }, [myCollectionsRequest.data]);
  
  // Return states
  return {
    myCollections,
    myCollectionsRequest: {
      toast: myCollectionsRequest.toast,
      loading: myCollectionsRequest.loading,
      apiError: myCollectionsRequest.error,
      castingError: collectionCastingError,
    },
  };
};

export default useMyCollections;