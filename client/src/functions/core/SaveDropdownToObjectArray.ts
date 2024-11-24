// Imports
import { SetStateAction } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";

/**
 * Function to take a dropdown menu selection input from a UI dropdown menu and save it's value to the state of a given state object array
 * @param e UI Dropdown Menu Event Object
 * @param setStateObject State Object Array
 */
const saveDropdownToObjectArray = <T>(
  e: DropdownChangeEvent,
  setStateObject: (value: SetStateAction<T[] | null>) => void,
): void => {
  const input: string = e.value;
  const location: string[] = e.target.name.split('-');
  const key: string = location[0];
  const arrayIndex: number = Number(location[1]);
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

export default saveDropdownToObjectArray;