// Imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import AuthConfirmation from "../../types/auth/AuthConfirmation";

/**
 * Enum to define the possible auth states a user can have
 */
export enum AuthStates {
  Pending,
  Permitted,
  Forbidden,
};

/**
 * Type to define the states exposed by the useAuthListener hook
 */
export type UseAuthListenerHook = {
  authState: AuthStates;
};

/**
 * Hook to listen to the users authentication state
 */
function useAuthListener(): UseAuthListenerHook {
  // Hooks & states
  const location = useLocation();
  const apiAuthCheck: APIResponse<object> = useServerAPI(
    'GET',
    '/confirmLogin',
    {},
    { immediate: false },
  );
  const [authState, setAuthState] = useState<AuthStates>(AuthStates.Pending);

  // Function to track whether the user is on the login page
  const isOnLoginPage = (): boolean => !!(
    location.pathname === '/' ||
    location.pathname === '/login'
  );

  // Function to determine whether a user is permitted to access the current page
  function determineAccess(authenticated: boolean): void {
    if(authenticated && isOnLoginPage()) {
      window.location.href = `/welcome`;
      setTimeout(() => {
        setAuthState(AuthStates.Permitted);
      }, 1000);
      return;
    };
    if(authenticated || isOnLoginPage()) {
      setAuthState(AuthStates.Permitted);
      return;
    };
    setAuthState(AuthStates.Forbidden);
    return;
  };

  // Function to save a logged in users core data
  function saveUserJWTData(): void {
    try {
      const data: AuthConfirmation = apiAuthCheck.data as AuthConfirmation;
      localStorage.setItem('fc-username', data.user.username);
      localStorage.setItem('fc-uuid', data.user.uuid);
      localStorage.setItem('fc-admin', String(data.user.isAdmin));
    } catch (error: any) {
      determineAccess(false);
      return;
    };
    determineAccess(true);
    return;
  };

  // Async function run a user auth check
  async function runAuthChecker(): Promise<void> {
    setAuthState(AuthStates.Pending);
    // Check for any saved tokens & ids
    const token: string | null = localStorage.getItem('fc-jwt');
    const username: string | null = localStorage.getItem('fc-username');
    const uuid: string | null = localStorage.getItem('fc-uuid');
    const isAdmin: string | null = localStorage.getItem('fc-admin');
    if(!token || !username || !uuid || !isAdmin) {
      determineAccess(false);
      return;
    };
    // Send API request to confirm login
    const status: number = await apiAuthCheck.reTrigger();
    if(status !== 200 && status !== 204) {
      determineAccess(false);
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

  // Return states
  return {
    authState,
  };
};

export default useAuthListener;