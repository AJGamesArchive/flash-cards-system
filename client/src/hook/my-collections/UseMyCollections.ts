// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Collection from "../../types/global/Collection";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";
import { CoreCollectionDetails } from "./UseCollectionEditor";

/**
 * Type to define the states exposed by the useMyCollections hook
 */
export type UseMyCollectionsHook = {
  myCollections: Collection[];
  selectedCollection: CoreCollectionDetails | null | undefined;
  openCollectionEditor: (collection?: Collection) => void;
  closeCollectionEditor: () => void;
  myCollectionsRequest: {
    toast: ToastWatch;
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    reTrigger: () => Promise<number>;
  };
  deleteCollection: (collectionUUID: string) => Promise<void>;
  deletionRequest: {
    loading: boolean;
    toast: ToastWatch;
  };
};

/**
 * Hook to type-cast and manage a users collections
 */
function useMyCollections(): UseMyCollectionsHook {
  // Hooks & states
  const [myCollections, setMyCollections] = useState<Collection[]>([]);
  const [collectionCastingError, setCollectionCastingError] = useState<ErrorWatch>(null);
  const [selectedCollection, setSelectedCollection] = useState<CoreCollectionDetails | null | undefined>(undefined);
  const myCollectionsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/collections`,
    {},
    { immediate: true, ignoreStatusCodes: [404] },
  );
  const deletionRequest: APIResponse<object> = useServerAPI(
    'DELETE',
    ``,
    {},
    { immediate: false },
  );

  // Function to open the collection editor in the required mode
  const openCollectionEditor = (collection?: Collection) => setSelectedCollection(
    collection ? {
      uuid: collection.collectionUUID,
      name: collection.name,
      description: collection.description
    } : null,
  );

  // Function to close the collection editor
  const closeCollectionEditor = () => setSelectedCollection(undefined);

  // Function to delete a request
  const deleteCollection = async (collectionUUID: string) => {
    const status: number = await deletionRequest.reTrigger(
      undefined,
      `/users/${localStorage.getItem('fc-uuid')}/collections/${collectionUUID}`,
    );
    if(status === 204) myCollectionsRequest.reTrigger();
  };

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
    selectedCollection,
    openCollectionEditor,
    closeCollectionEditor,
    myCollectionsRequest: {
      toast: myCollectionsRequest.toast,
      loading: myCollectionsRequest.loading,
      apiError: myCollectionsRequest.error,
      castingError: collectionCastingError,
      reTrigger: myCollectionsRequest.reTrigger,
    },
    deleteCollection,
    deletionRequest: {
      loading: deletionRequest.loading,
      toast: deletionRequest.toast,
    },
  };
};

export default useMyCollections;