// Imports
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import APIResponse from "../../types/services/APIResponse";

/**
 * Type to define the core details of a collection
 */
type CoreCollectionDetails = {
  name: string;
  description: string;
};
const defaultCoreDetails: CoreCollectionDetails = {
  name: '',
  description: '',
};

/**
 * Type to define the states exposed by the useCollectionEditor hook
 */
export type UseCollectionEditorHook = {
  coreDetails: CoreCollectionDetails;
};

/**
 * Hook to control the collection editor
 */
function useCollectionEditor(
  visible: boolean,
  newFLag: boolean,
  name: string | null,
  description: string | null,
): UseCollectionEditorHook {
  // Hooks & states
  const [coreDetails, setCoreDetails] = useState<CoreCollectionDetails>(cloneDeep(defaultCoreDetails));

  // Hook to listen to the dialogue visibility and update the core details upon editor show
  useEffect(() => {
    if(!visible) return;
    if (name && description && newFLag) {
      setCoreDetails({
        name: name,
        description: description
      });
    } else {
      setCoreDetails(cloneDeep(defaultCoreDetails));
    };
  }, [visible]);

  // Return states
  return {
    coreDetails,
  };
};

export default useCollectionEditor;