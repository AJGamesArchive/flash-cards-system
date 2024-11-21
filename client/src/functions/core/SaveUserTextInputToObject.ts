// Imports
import { SetStateAction } from "react";

/**
 * Function to save a users text input from a UI input box and save it to the state of a given state object
 * @param e UI Input Text Object
 * @param setStateObject State Object
 */
const saveUserTextInputToObject = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setStateObject: (value: SetStateAction<T>) => void,
): void => {
  const input: string = e.target.value;
  const key: string = e.target.name;
  setStateObject((prev) => ({
    ...prev,
    [key]: input,
  }));
  return;
};

export default saveUserTextInputToObject;