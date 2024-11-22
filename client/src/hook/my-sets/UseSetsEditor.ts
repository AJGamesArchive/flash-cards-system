// Imports
import { useEffect, useState } from "react";
import { SetEditable } from "./UseSetsEditorSetup";
import { cloneDeep } from "lodash";

/**
 * Type to define the states exposed by the useSetsEditor hook
 */
export type UseSetsEditorHook = {
  data: SetEditable | null;
};

/**
 * Hook to manage the sets editor
 */
function useSetsEditor(
  preppedData: SetEditable | null,
): UseSetsEditorHook {
  // Hooks & states
  const [data, setData] = useState<SetEditable | null>(null);

  // Hook to load the prepared data into the editor
  useEffect(() => {
    if(preppedData) setData(cloneDeep(preppedData));
  }, [preppedData]);
  
  // Return states
  return {
    data,
  };
};

export default useSetsEditor;