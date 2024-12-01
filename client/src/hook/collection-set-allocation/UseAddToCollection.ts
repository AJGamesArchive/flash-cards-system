// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Collection from "../../types/global/Collection";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";
import useToastMessage, { UseToastMessageHook } from "../core/UseToastMessage";

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
  addToCollection: (collectionUUID: string) => Promise<void>;
  allocationRequest: {
    toast: ToastWatch;
    loading: boolean;
  },
  infoToast: ToastWatch;
};

/**
 * Hook to handle adding sets to collections
 */
function useAddToCollection(
  setUUID: string,
  setName: string,
  cancelAction: () => void,
): UseAddToCollectionHHook {
  // Hooks & states
  const infoToast: UseToastMessageHook = useToastMessage();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);
  const getCollectionsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/collections`,
    {},
    { immediate: true, ignoreStatusCodes: [404] },
  );
  const allocationRequest: APIResponse<object> = useServerAPI(
    'POST',
    ``,
    { setUUID },
    { immediate: false, ignoreStatusCodes: [404] },
  );

  // Function to add a set to a collection
  const addToCollection = async (collectionUUID: string): Promise<void> => {
    const status: number = await allocationRequest.reTrigger(
      undefined,
      `/users/${localStorage.getItem('fc-uuid')}/collections/${collectionUUID}/sets`,
    );
    if(status === 404) infoToast.setToast({
      severity: 'info',
      summary: 'Set Already In Collection',
      detail: `You have already added '${setName}' to this collection. Please select a different collection.`,
      life: 7000,
      closable: false,
    });
    if(status !== 201) return;
    cancelAction();
    getCollectionsRequest.reTrigger();
    return;
  };

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
    addToCollection,
    allocationRequest: {
      toast: allocationRequest.toast,
      loading: allocationRequest.loading,
    },
    infoToast: infoToast.toast,
  };
};

export default useAddToCollection;