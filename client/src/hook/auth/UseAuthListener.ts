// Imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import AuthConfirmation from "../../types/auth/AuthConfirmation";

/**
 * Type to define the states exposed by the useAuthListener hook
 */
export type UseAuthListenerHook = {
  runningCheck: boolean;
  allowAccess: boolean;
};

/**
 * Hook to listen to the users authentication state
 */
function useAuthListener(): UseAuthListenerHook {
  // Hooks & states
  const location = useLocation();
  const apiAuthCheck: APIResponse<any> = useServerAPI(
    'GET',
    '/confirmLogin',
    {},
    { immediate: false },
  );
  const [runningCheck, setRunningCheck] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [allowPageAccess, setAllowPageAccess] = useState<boolean>(false);

  // Function to track whether the user is on the login page
  const isOnLoginPage = (): boolean => !!(
    location.pathname === '/' ||
    location.pathname === '/login'
  );

  // Function to determine whether a user is permitted to access the current page
  function determineAccess(): void {
    if(authenticated && isOnLoginPage()) {
      window.location.href = `/browse-sets`;
      return;
    };
    if(authenticated || isOnLoginPage()) {
      setAllowPageAccess(true);
      return;
    };
    setAllowPageAccess(false);
    return;
  };

  // Function to save a logged in users core data
  function saveUserJWTData(): void {
    if(!apiAuthCheck.data) {
      setAuthenticated(false);
      setRunningCheck(false);
    };
    try {
      const data: AuthConfirmation = apiAuthCheck.data as AuthConfirmation;
      localStorage.setItem('fc-username', data.user.username);
      localStorage.setItem('fc-uuid', data.user.uuid);
      localStorage.setItem('fc-admin', String(data.user.isAdmin));
    } catch (error: any) {
      setAuthenticated(false);
      setRunningCheck(false);
      return;
    };
    setAuthenticated(true);
    setRunningCheck(false);
    return;
  };

  // Async function run a user auth check
  async function runAuthChecker(): Promise<void> {
    setRunningCheck(true);
    // Check for any saved tokens & ids
    const token: string | null = localStorage.getItem('fc-jwt');
    const username: string | null = localStorage.getItem('fc-username');
    const uuid: string | null = localStorage.getItem('fc-uuid');
    const isAdmin: string | null = localStorage.getItem('fc-admin');
    if(!token || !username || !uuid || !isAdmin) {
      setAuthenticated(false);
      setRunningCheck(false);
      return;
    };
    // Send API request to confirm login
    const status: number = await apiAuthCheck.reTrigger();
    if(status !== 200) {
      setAuthenticated(false);
      setRunningCheck(false);
      return;
    };
    return;
  };

  // Hook to trigger the auth check each time the app location changes
  useEffect(() => {
    runAuthChecker();
  }, [location]);

  // Hook to trigger saving user JWT data once the api has received it
  useEffect(() => {
    if(apiAuthCheck.data) saveUserJWTData();
  }, [apiAuthCheck.data]);

  // Hook to trigger the determine access function each time the auth state changes
  useEffect(determineAccess, [authenticated]);

  // Return states
  return {
    runningCheck,
    allowAccess: allowPageAccess,
  };
};

export default useAuthListener;