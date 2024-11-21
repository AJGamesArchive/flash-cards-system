// Imports
import { useState } from "react";
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import ErrorWatch from "../../types/core/ErrorWatch";
import ToastWatch from "../../types/core/ToastWatch";
import saveUserTextInputToObject from "../../functions/core/SaveUserTextInputToObject";
import useToastMessage, { UseToastMessageHook } from "../core/UseToastMessage";

/**
 * Type to define the account details the user must provide
 */
type AccountDetails = {
  username: string;
  password: string;
  confirmPassword: string;
  adminFlag: boolean;
  apiAccount: boolean;
};

/**
 * Type to define the states exposed by the useAccountCreator hook
 */
export type UseAccountCreatorHook = {
  accountDetails: AccountDetails;
  loading: boolean;
  toastMessage: ToastWatch;
  missingDetailsToast: ToastWatch;
  apiError: ErrorWatch;
  passwordError: ErrorWatch;
  onDialogueHide: () => void;
  saveInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createAccount: () => void;
};

/**
 * Hook to manage the user account creation process
 */
function useAccountCreator(
  showDialogue: (value: boolean) => void,
  adminAccounts?: boolean,
  apiAccounts?: boolean,
): UseAccountCreatorHook {
  // Hooks & states
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    username: '',
    password: '',
    confirmPassword: '',
    adminFlag: !!adminAccounts,
    apiAccount: !!apiAccounts,
  });
  const [passwordMismatchError, setPasswordMismatchError] = useState<ErrorWatch>(null);
  const missingDetailsToast: UseToastMessageHook = useToastMessage();
  const creationRequest: APIResponse<object> = useServerAPI(
    'POST',
    '/users',
    {
      username: accountDetails.username,
      password: accountDetails.password,
      adminFlag: accountDetails.adminFlag,
      apiAccount: accountDetails.apiAccount,
    },
    { immediate: false },
  );

  // Function to save a user input
  const saveInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    saveUserTextInputToObject<AccountDetails>(e, setAccountDetails);

  // Function to validate provided account details trigger the account creation process
  const createAccount = async () => {
    const missingData: string[] = [];
    if(!accountDetails.username) missingData.push('Username');
    if(!accountDetails.password) missingData.push('Password');
    if(!accountDetails.confirmPassword) missingData.push('Confirm Password');
    if(missingData.length !== 0) {
      missingDetailsToast.setToast({
        severity: 'info',
        summary: 'Missing Data',
        detail: `You have not entered:${missingData.map((key) => ` ${key}`).join(',')}. Please enter all missing details.`,
        closable: false,
        life: 3000,
      });
      return;
    };
    if(accountDetails.password !== accountDetails.confirmPassword) {
      setPasswordMismatchError('Entered passwords do not match. Please re-enter your passwords.');
      return;
    };
    setPasswordMismatchError(null);
    const status: number = await creationRequest.reTrigger();
    if(status === 201) proceed();
    return;
  };

  // Function to proceed once an account has been created successfully
  const proceed = () => {
    missingDetailsToast.setToast({
      severity: 'info',
      summary: 'Verification Required',
      detail: `Please re-login to verify your account.`,
      closable: false,
      life: 7000,
    });
    setAccountDetails({
      username: '',
      password: '',
      confirmPassword: '',
      adminFlag: !!adminAccounts,
      apiAccount: !!apiAccounts,
    });
    onDialogueHide();
    return;
  };

  // Function to close the dialogue box and reset some states
  const onDialogueHide = () => {
    showDialogue(false);
    return;
  };

  // Return states
  return {
    accountDetails,
    loading: creationRequest.loading,
    toastMessage: creationRequest.toast,
    missingDetailsToast: missingDetailsToast.toast,
    apiError: creationRequest.error,
    passwordError: passwordMismatchError,
    onDialogueHide,
    saveInput,
    createAccount
  };
};

export default useAccountCreator;