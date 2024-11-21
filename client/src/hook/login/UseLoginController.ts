// Imports
import { useEffect, useState } from "react";
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import ErrorWatch from "../../types/core/ErrorWatch";
import ToastWatch from "../../types/core/ToastWatch";
import castData from "../../functions/core/CastData";
import saveUserTextInputToObject from "../../functions/core/SaveUserTextInputToObject";

/**
 * Type to define the login credentials the user must provide
 */
type LoginCredentials = {
  username: string;
  password: string;
};

/**
 * Type to define the user data returned from the API upon successful login
 */
type UserDetails = {
  token: string;
  username: string;
  uuid: string;
  isAdmin: boolean;
};

/**
 * Type to define the states exposed by the useLoginController hook
 */
export type UseLoginControllerHook = {
  loginCredentials: LoginCredentials;
  loading: boolean;
  toastMessage: ToastWatch;
  apiError: ErrorWatch;
  castingError: ErrorWatch;
  onDialogueHide: () => void;
  saveInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
};

/**
 * Hook to manage the user login process
 */
function useLoginController(
  showDialogue: (value: boolean) => void,
): UseLoginControllerHook {
  // Hooks & states
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [fetchedUserData, setFetchedUserData] = useState<UserDetails | null>(null);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);
  const loginRequest: APIResponse<any> = useServerAPI(
    'POST',
    '/login',
    {
      username: loginCredentials.username,
      password: loginCredentials.password,
    },
    { immediate: false },
  );

  // Function to save a user input
  const saveInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    saveUserTextInputToObject(e, setLoginCredentials);

  // Function to trigger the login process
  const login = () => loginRequest.reTrigger();

  // Function to save the user login token(s) and proceed
  const proceed = () => {
    if(!fetchedUserData) return;
    localStorage.setItem('fc-username', fetchedUserData.username);
    localStorage.setItem('fc-uuid', fetchedUserData.uuid);
    localStorage.setItem('fc-admin', String(fetchedUserData.isAdmin));
    localStorage.setItem('fc-jwt', fetchedUserData.token);
    window.location.href = `/welcome`;
    return;
  };

  // Function to close the dialogue box
  const onDialogueHide = () => {
    showDialogue(false);
    return;
  };

  // Hook to trigger data type-cast when data is returned from the API
  useEffect(() => {
    setCastingError(null);
    if(loginRequest.data) castData<UserDetails | null>(
      'Fetched User Data',
      loginRequest,
      null,
      setFetchedUserData,
      setCastingError,
    );
  }, [loginRequest.data]);

  // Hook to proceed with the login once required data has been fetched
  useEffect(proceed, [fetchedUserData]);

  // Return states
  return {
    loginCredentials,
    loading: loginRequest.loading,
    toastMessage: loginRequest.toast,
    apiError: loginRequest.error,
    castingError,
    onDialogueHide,
    saveInput,
    login,
  };
};

export default useLoginController;