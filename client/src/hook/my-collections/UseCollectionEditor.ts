// Imports
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import APIResponse from "../../types/services/APIResponse";
import useServerAPI from "../api/UseServerAPI";
import saveUserTextInputToObject from "../../functions/core/SaveUserTextInputToObject";
import useToastMessage, { UseToastMessageHook } from "../core/UseToastMessage";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the core details of a collection
 */
export type CoreCollectionDetails = {
  uuid: string;
  name: string;
  description: string;
};
const defaultCoreDetails: CoreCollectionDetails = {
  uuid: '',
  name: '',
  description: '',
};

/**
 * Type to define the states exposed by the useCollectionEditor hook
 */
export type UseCollectionEditorHook = {
  coreDetails: CoreCollectionDetails;
  toastMessage: ToastWatch;
  saveInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveCollection: () => Promise<void>;
  creationRequest: {
    loading: boolean;
    error: string | null;
    toast: ToastWatch;
  },
  updateRequest: {
    loading: boolean;
    error: string | null;
    toast: ToastWatch;
  },
};

/**
 * Hook to control the collection editor
 */
function useCollectionEditor(
  visible: boolean,
  selectedCollection: CoreCollectionDetails | null | undefined,
  closeEditor: () => void,
  reFetchCollections: () => Promise<number>,
): UseCollectionEditorHook {
  // Hooks & states
  const toastMessage: UseToastMessageHook = useToastMessage();
  const [coreDetails, setCoreDetails] = useState<CoreCollectionDetails>(cloneDeep(defaultCoreDetails));
  const creationRequest: APIResponse<object> = useServerAPI(
    'POST',
    `/users/${localStorage.getItem('fc-uuid')}/collections`,
    {
      name: coreDetails.name,
      description: coreDetails.description,
    },
    { immediate: false },
  );
  const updateRequest: APIResponse<object> = useServerAPI(
    'PATCH',
    `/users/${localStorage.getItem('fc-uuid')}/collections/${selectedCollection?.uuid}`,
    {
      name: coreDetails.name,
      description: coreDetails.description,
    },
    { immediate: false },
  );

  // Save collection detail inputs
  const saveInput = (e: React.ChangeEvent<HTMLInputElement>) => saveUserTextInputToObject(e, setCoreDetails);

  // Save the collection details to DB
  const saveCollection = async () => {
    // Validate data
    const missingData: string[] = [];
    if(!coreDetails.name) missingData.push('Collection Name');
    if(!coreDetails.description) missingData.push('Collection Description');
    if(missingData.length !== 0) {
      toastMessage.setToast({
        severity: 'info',
        summary: 'Missing Data',
        detail: `You have not entered:${missingData.map((key) => ` ${key}`).join(',')}. Please enter all missing details.`,
        closable: false,
        life: 3000,
      });
      return;
    };

    // Send request
    const status: number = (selectedCollection)
      ? await updateRequest.reTrigger()
      : await creationRequest.reTrigger();
    if(status !== 201 && status !== 200) return;
    closeEditor();
    reFetchCollections();
    return;
  };

  // Hook to listen to the dialogue visibility and update the core details upon editor show
  useEffect(() => {
    if(!visible) return;
    if(selectedCollection) {
      setCoreDetails(cloneDeep(selectedCollection));
    } else {
      setCoreDetails(cloneDeep(defaultCoreDetails));
    };
  }, [visible]);

  // Return states
  return {
    coreDetails,
    toastMessage: toastMessage.toast,
    saveInput,
    saveCollection,
    creationRequest: {
      loading: creationRequest.loading,
      error: creationRequest.error,
      toast: creationRequest.toast,
    },
    updateRequest: {
      loading: updateRequest.loading,
      error: updateRequest.error,
      toast: updateRequest.toast,
    },
  };
};

export default useCollectionEditor;