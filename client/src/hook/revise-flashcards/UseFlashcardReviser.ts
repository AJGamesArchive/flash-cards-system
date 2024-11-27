// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";
import Set from "../../types/global/Set";
import Flashcard from "../../types/global/Flashcard";

/**
 * Type to define the states exposed by the useFlashcardReviser hook
 */
export type UseFLashcardReviserHook = {
  set: Set | null;
  flashcards: Flashcard[];
  currentFlashcardIndex: number;
  cardFlipped: boolean;
  flipCard: () => void;
  hiddenCards: string[];
  getSetRequest: {
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    toast: ToastWatch;
  };
  getFlashcardsRequest: {
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    toast: ToastWatch;
  };
  getHiddenCardsRequest: {
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    toast: ToastWatch;
  };
};

/**
 * Hook to control flashcard revising
 */
function useFlashcardReviser(
  setUUID: string,
  query: string,
): UseFLashcardReviserHook {
  // Hooks & states
  const [set, setSet] = useState<Set | null>(null);
  const [setCastingError, setSetCastingError] = useState<ErrorWatch>(null);
  const [flashcards, setFLashcards] = useState<Flashcard[]>([]);
  const [flashcardCastingError, setFlashcardCastingError] = useState<ErrorWatch>(null);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);
  const [hiddenCards, setHiddenCards] = useState<string[]>([]);
  const [hiddenCardsCastingError, setHiddenCardsCastingError] = useState<ErrorWatch>(null);
  const getSetRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets/${setUUID}`,
    {},
  );
  const getFlashcardsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets/${setUUID}/cards`,
    {},
    { immediate: true },
    { shuffle: (query === 'shuffle') }
  );
  const getHiddenCardsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/hiddenCards/${localStorage.getItem('fc-uuid')}`,
    {},
  );

  // Function to flip the flashcard
  const flipCard = () => setCardFlipped(!cardFlipped);

  // Hook to type-cast set data received from the API
  useEffect(() => {
    if(getSetRequest.data) castData(
      'Set',
      getSetRequest,
      null,
      setSet,
      setSetCastingError,
    );
  }, [getSetRequest.data]);

  // Hook to type-cast flashcard data received from the API
  useEffect(() => {
    if(getFlashcardsRequest.data) {
      castData(
        'Flashcards',
        getFlashcardsRequest,
        null,
        setFLashcards,
        setFlashcardCastingError,
      );
      setCardFlipped(false);
      setCurrentFlashcardIndex(0);
    };
  }, [getFlashcardsRequest.data]);

  // Hook to type-cast hidden cards data received from the API
  useEffect(() => {
    if(getHiddenCardsRequest.data) castData(
      'Hidden Cards',
      getHiddenCardsRequest,
      null,
      setHiddenCards,
      setHiddenCardsCastingError,
    );
  }, [getHiddenCardsRequest.data]);

  // Return states
  return {
    set,
    flashcards,
    currentFlashcardIndex,
    cardFlipped,
    flipCard,
    hiddenCards,
    getSetRequest: {
      loading: getSetRequest.loading,
      apiError: getSetRequest.error,
      castingError: setCastingError,
      toast: getSetRequest.toast,
    },
    getFlashcardsRequest: {
      loading: getFlashcardsRequest.loading,
      apiError: getFlashcardsRequest.error,
      castingError: flashcardCastingError,
      toast: getFlashcardsRequest.toast,
    },
    getHiddenCardsRequest: {
      loading: getHiddenCardsRequest.loading,
      apiError: getHiddenCardsRequest.error,
      castingError: hiddenCardsCastingError,
      toast: getHiddenCardsRequest.toast,
    },
  };
};

export default useFlashcardReviser;