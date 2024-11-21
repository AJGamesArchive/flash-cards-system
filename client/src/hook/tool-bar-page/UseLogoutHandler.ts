// Imports
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import { useState } from "react";

/**
 * Type to define the states exposed by the useLogoutHandler hook
 */
export type UseLogoutHandlerHook = {
  logout: () => Promise<void>;
  loading: boolean;
};

/**
 * Hook to manage the logout process
 */
function useLogoutHandler(): UseLogoutHandlerHook {
  // Hooks
  const logoutRequest: APIResponse<any> = useServerAPI(
    'DELETE',
    '/logout',
    {},
    { immediate: false },
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Function to logout a user
  const logout = async () => {
    setLoading(true);
    logoutRequest.reTrigger();
    localStorage.removeItem('fc-admin');
    localStorage.removeItem('fc-uuid');
    localStorage.removeItem('fc-username');
    setTimeout(() => {
      localStorage.removeItem('fc-jwt');
      window.location.reload();
    }, 1000);
    return;
  };

  // Return states
  return {
    logout,
    loading,
  };
};

export default useLogoutHandler;