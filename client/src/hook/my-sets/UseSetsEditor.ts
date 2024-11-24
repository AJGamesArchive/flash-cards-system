// Imports
import { useEffect, useState } from "react";
import { v4 as uuidGen } from 'uuid';
import { SetEditable } from "./UseSetsEditorSetup";
import { BaseSet } from "../../types/global/Set";
import Flashcard from "../../types/global/Flashcard";
import saveUserTextInputToObject from "../../functions/core/SaveUserTextInputToObject";
import saveUserTextInputToObjectArray from "../../functions/core/SaveUserTextInputToObjectArray";
import saveDropdownToObjectArray from "../../functions/core/SaveDropdownToObjectArray";
import useToastMessage, { UseToastMessageHook } from "../core/UseToastMessage";
import ToastWatch from "../../types/core/ToastWatch";
import { cloneDeep } from "lodash";
import { DropdownChangeEvent } from "primereact/dropdown";
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import ErrorWatch from "../../types/core/ErrorWatch";
import { useNavigate, NavigateFunction } from "react-router-dom";

/**
 * Type to define the states exposed by the useSetsEditor hook
 */
export type UseSetsEditorHook = {
  newSet: boolean;
  setData: BaseSet | null;
  flashcardData: Flashcard[] | null;
  saveSetData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  saveFlashcardData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  saveDifficultySelection: (e: DropdownChangeEvent) => void;
  clearDifficultySelection: (cardIndex: number) => void;
  createFlashcard: () => void;
  deleteFlashcard: (cardUUID: string) => void;
  save: () => void;
  editorToast: ToastWatch;
  createRequest: {
    loading: boolean;
    error: ErrorWatch;
    toast: ToastWatch;
  },
  updateRequest: {
    loading: boolean;
    error: ErrorWatch;
    toast: ToastWatch;
  };
  awaitPageReturn: boolean;
};

/**
 * Hook to manage the sets editor
 */
function useSetsEditor(
  newSet: boolean,
  preppedData: SetEditable | null,
): UseSetsEditorHook {
  // Hooks & states
  const nav: NavigateFunction = useNavigate();
  const editorToast: UseToastMessageHook = useToastMessage();
  const [setData, setSetData] = useState<BaseSet | null>(null);
  const [flashcardData, setFlashcardData] = useState<Flashcard[] | null>(null);
  const [awaitPageReturn, setAwaitingPageReturn] = useState<boolean>(false);

  // API Requests
  const createRequest: APIResponse<object> = useServerAPI(
    'POST',
    '/sets',
    {
      setDetails: {
        name: setData?.name,
        description: setData?.description,
        author: setData?.authorUUID,
      },
      flashCards: flashcardData?.map((flashcard) => ({
        question: flashcard.question,
        answer: flashcard.answer,
        difficulty: flashcard.difficulty,
      })),
    },
    { immediate: false },
  );
  const updateRequest: APIResponse<object> = useServerAPI(
    'PUT',
    `/sets/${setData?.setUUID}`,
    {
      setDetails: setData,
      flashCards: flashcardData,
    },
    { immediate: false },
  );

  // Function to save a user input to set data
  const saveSetData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => saveUserTextInputToObject<BaseSet | null>(e, setSetData);

  // Function to save a user input to flashcard data
  const saveFlashcardData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => saveUserTextInputToObjectArray(e, setFlashcardData);

  // Function to save a flashcard difficulty selection
  const saveDifficultySelection = (e: DropdownChangeEvent) => saveDropdownToObjectArray(e, setFlashcardData);

  // Function to clear a flashcard difficulty
  const clearDifficultySelection = (cardIndex: number) => setFlashcardData((prev) =>
    prev === null
      ? null
      : prev.map((card, index) =>
        index !== cardIndex
          ? card
          : ({
            ...card,
            difficulty: null,
          })
      )
  );

  // Function to delete a flashcard
  const deleteFlashcard = (cardUUID: string) => setFlashcardData((prev) =>
    prev === null
      ? null
      : prev.filter((flashcard) =>
        flashcard.cardUUID !== cardUUID
      )
  )

  // Function to create a new flashcard
  const createFlashcard = () => setFlashcardData((prev) => (prev === null) ? null : [
    ...prev,
    {
      cardUUID: uuidGen(),
      question: '',
      answer: '',
      difficulty: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      setUUID: '',
    },
  ]);

  // Function to save the set and it#s flashcards
  const save = async () => {
    // Ensure all required data has been entered
    const missingData: string[] = [];
    if(!setData || !flashcardData) {
      editorToast.setToast({
        severity: 'error',
        summary: 'Unexpected Error',
        detail: `Something went wrong when setting up the editor. Please refresh your page.`,
        closable: false,
        life: 7000,
      });
      return;
    };
    if(flashcardData.length === 0) {
      editorToast.setToast({
        severity: 'warn',
        summary: 'Missing Flashcards',
        detail: `You cannot create a set with no flashcards. Please create some flashcards and try again.`,
        closable: false,
        life: 7000,
      });
      return;
    };
    if(!setData.name) missingData.push('Set Name');
    if(!setData.description) missingData.push('Set Description');
    for(let i = 0; i < flashcardData.length; i++) {
      if(!flashcardData[i].question) missingData.push(`Flashcard ${i + 1} Question`);
      if(!flashcardData[i].answer) missingData.push(`Flashcard ${i + 1} Answer`);
    };
    if(missingData.length !== 0) {
      editorToast.setToast({
        severity: 'info',
        summary: 'Missing Data',
        detail: `You have not entered:${missingData.map((key) => ` ${key}`).join(',')}. Please enter all missing details.`,
        closable: false,
        life: 3000,
      });
      return;
    };
    // Send API request to create / update data
    let status: number;
    if(newSet) {
      status = await createRequest.reTrigger();
    } else {
      status = await updateRequest.reTrigger();
    };
    if(status !== 200 && status !== 201) return;
    setAwaitingPageReturn(true);
    setTimeout(() => {
      nav(-1);
    }, 1500);
    return;
  };

  // Hook to load the prepared data into the editor
  useEffect(() => {
    if(preppedData) {
      setSetData(cloneDeep(preppedData.setDetails));
      setFlashcardData(cloneDeep(preppedData.flashcards));
    };
  }, [preppedData]);
  
  // Return states
  return {
    newSet,
    setData,
    flashcardData,
    saveSetData,
    saveFlashcardData,
    saveDifficultySelection,
    clearDifficultySelection,
    createFlashcard,
    deleteFlashcard,
    save,
    editorToast: editorToast.toast,
    createRequest: {
      loading: createRequest.loading,
      error: createRequest.error,
      toast: createRequest.toast,
    },
    updateRequest: {
      loading: updateRequest.loading,
      error: updateRequest.error,
      toast: updateRequest.toast,
    },
    awaitPageReturn,
  };
};

export default useSetsEditor;