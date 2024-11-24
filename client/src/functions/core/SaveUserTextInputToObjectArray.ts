// Imports
import { SetStateAction } from "react";

/**
 * Function to take a users text input from a UI input box and save it to the state of a given state object array
 * @param e UI Input Text Object
 * @param setStateObject State Object Array
 */
const saveUserTextInputToObjectArray = <T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setStateObject: (value: SetStateAction<T[] | null>) => void,
): void => {
  const input: string = e.target.value;
  const key: string = e.target.name;
  const arrayIndex: number = e.target.tabIndex;
  setStateObject((prev) =>
    (prev) === null
      ? null
      : prev.map((element, index) =>
        index !== arrayIndex
          ? element
          : {
            ...element,
            [key]: input,
          }
  ));
  return;
};

export default saveUserTextInputToObjectArray;