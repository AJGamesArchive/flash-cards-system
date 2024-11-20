// Imports
import { useState, useEffect } from "react";

/**
 * Hook to listen to loading flags provide an overall loading flag
 * @param loadingFlags Array of flags to watch
 * @returns Flag to indicate overall loading
 */
function useLoadingListener(loadingFlags: boolean[]): boolean {
  // Hook states
  const [overallFlag, setOverallFlag] = useState<boolean>(false);

  // Hook to listen for errors and process them accordingly
  useEffect(() => {
    const activeFlag: boolean | undefined = loadingFlags.find((flag) => flag);
    if(activeFlag) setOverallFlag(true);
    if(!activeFlag) setOverallFlag(false);
    return;
  }, loadingFlags);

  // Return state
  return overallFlag;
};

export default useLoadingListener;