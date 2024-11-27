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
  nextFlashcard: () => void;
  previousFlashcard: () => void;
  resyncFlashcards: () => void;
  cardFlipped: boolean;
  flipCard: () => void;
  hiddenCards: string[];
  hideFlashcard: (cardUUID: string) => Promise<void>;
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
  hideCardRequest: {
    loading: boolean;
    toast: ToastWatch;
  },
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
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
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
  const hideCardRequest: APIResponse<object> = useServerAPI(
    'POST',
    `/hiddenCards/${localStorage.getItem('fc-uuid')}`,
    {},
    { immediate: false },
  );

  // Function to flip the flashcard
  const flipCard = () => setCardFlipped(!cardFlipped);

  // Function to move to the next flashcard
  const nextFlashcard = () => {
    if(currentFlashcardIndex < filteredFlashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    } else {
      setCurrentFlashcardIndex(0);
    };
    setCardFlipped(false);
    return;
  };

  // Function to move to the previous flashcard
  const previousFlashcard = () => {
    if(currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    } else {
      setCurrentFlashcardIndex(filteredFlashcards.length - 1);
    };
    setCardFlipped(false);
    return;
  };

  // Function to re-sync the flashcards
  const resyncFlashcards = () => getFlashcardsRequest.reTrigger();

  // Function to hide a flashcard
  const hideFlashcard = async (cardUUID: string) => {
    const status: number = await hideCardRequest.reTrigger({ cardUUID });
    if(status !== 201) return;
    getHiddenCardsRequest.reTrigger();
    return;
  };

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

  // Hook to filter flashcards based on hidden cards
  useEffect(() => {
    if(flashcards.length > 0 && hiddenCards.length > 0) {
      setFilteredFlashcards(flashcards.filter((flashcard) => !hiddenCards.includes(flashcard.cardUUID)));
    } else {
      setFilteredFlashcards(flashcards);
    };
    setCurrentFlashcardIndex(0);
    setCardFlipped(false);
  }, [flashcards, hiddenCards]);

  // Return states
  return {
    set,
    flashcards: filteredFlashcards,
    currentFlashcardIndex,
    nextFlashcard,
    previousFlashcard,
    resyncFlashcards,
    cardFlipped,
    flipCard,
    hiddenCards,
    hideFlashcard,
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
    hideCardRequest: {
      loading: hideCardRequest.loading,
      toast: hideCardRequest.toast,
    }
  };
};

export default useFlashcardReviser;