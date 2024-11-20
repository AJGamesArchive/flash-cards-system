// Imports
import { useState, useEffect } from "react";
import ErrorWatch from "../../types/core/ErrorWatch";

/**
 * Hook to listen to errors and trigger a display error if an error is found
 * @param errors Array of errors to watch
 * @returns ErrorWatch Object
 */
function useErrorListener(errors: ErrorWatch[]): ErrorWatch {
  // Hook states
  const [displayError, setDisplayError] = useState<ErrorWatch>(null);

  // Hook to listen for errors and process them accordingly
  useEffect(() => {
    const error: ErrorWatch | undefined = errors.find((e) => e);
    if(error) setDisplayError(error);
    if(!error) setDisplayError(null);
    return;
  }, errors);

  // Return state
  return displayError;
};

export default useErrorListener;