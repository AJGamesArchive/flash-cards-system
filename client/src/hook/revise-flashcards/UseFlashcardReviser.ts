// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";
import Set from "../../types/global/Set";
import Flashcard from "../../types/global/Flashcard";
import FlashcardUsageLog from "../../types/global/FlashcardUsageLog";
import FlashcardUsageTimer from "../../classes/FlashcardUsageTimer";

/**
 * Type to define the states exposed by the useFlashcardReviser hook
 */
export type UseFLashcardReviserHook = {
  set: Set | null;
  flashcards: Flashcard[];
  allFlashcards: Flashcard[];
  currentFlashcardIndex: number;
  nextFlashcard: () => void;
  previousFlashcard: () => void;
  resyncFlashcards: () => void;
  cardFlipped: boolean;
  flipCard: () => void;
  hiddenCards: string[];
  hideFlashcard: (cardUUID: string) => Promise<void>;
  showHiddenCards: boolean;
  toggleHiddenCards: () => void;
  getHiddenCardUUIDs: () => string[];
  unhideHiddenCard: (cardUUID: string) => Promise<void>;
  unhideAllHiddenCards: () => Promise<void>;
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
  unhideCardRequest: {
    loading: boolean;
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
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [flashcardCastingError, setFlashcardCastingError] = useState<ErrorWatch>(null);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);
  const [hiddenCards, setHiddenCards] = useState<string[]>([]);
  const [hiddenCardsCastingError, setHiddenCardsCastingError] = useState<ErrorWatch>(null);
  const [showHiddenCards, setShowHiddenCards] = useState<boolean>(false);
  const [logs, setLogs] = useState<FlashcardUsageLog[]>([]);
  const [recorder] = useState<FlashcardUsageTimer>(new FlashcardUsageTimer());
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
  const unhideCardRequest: APIResponse<object> = useServerAPI(
    'DELETE',
    `/hiddenCards/${localStorage.getItem('fc-uuid')}`,
    {},
    { immediate: false },
  );
  const logRequest: APIResponse<object> = useServerAPI(
    'POST',
    `/logs/flashcards`,
    {},
    { immediate: false },
  );

  // Function to flip the flashcard and record the flip
  const flipCard = () => {
    recorder.logFlip(cardFlipped);
    setCardFlipped(!cardFlipped);
    return;
  };

  // Function to move to the next flashcard and save current card log
  const nextFlashcard = () => {
    recorder.saveLog(
      filteredFlashcards[currentFlashcardIndex].cardUUID,
      setLogs,
    );
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
    recorder.saveLog(
      filteredFlashcards[currentFlashcardIndex].cardUUID,
      setLogs,
    );
    if(currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    } else {
      setCurrentFlashcardIndex(filteredFlashcards.length - 1);
    };
    setCardFlipped(false);
    return;
  };

  // Function to re-sync the flashcards
  const resyncFlashcards = () => {
    recorder.saveLog(
      filteredFlashcards[currentFlashcardIndex].cardUUID,
      setLogs,
    );
    getFlashcardsRequest.reTrigger();
    return;
  };

  // Function to hide a flashcard
  const hideFlashcard = async (cardUUID: string) => {
    recorder.saveLog(
      filteredFlashcards[currentFlashcardIndex].cardUUID,
      setLogs,
    );
    const status: number = await hideCardRequest.reTrigger({ cardUUID });
    if(status !== 201) return;
    getHiddenCardsRequest.reTrigger();
    return;
  };

  // Function to toggle showing hidden flashcards
  const toggleHiddenCards = () => setShowHiddenCards(!showHiddenCards);

  // Function to return the UUIDs of all hidden cards
  const getHiddenCardUUIDs = (): string[] => flashcards.filter((flashcard) =>
    hiddenCards.includes(flashcard.cardUUID)).map((flashcard)=>
      flashcard.cardUUID);

  // Function to un-hide a flashcard
  const unhideHiddenCard = async (cardUUID: string) => {
    const status: number = await unhideCardRequest.sendBackgroundRequest(
      `/hiddenCards/${localStorage.getItem('fc-uuid')}/${cardUUID}`,
    );
    if(status !== 204) return;
    getHiddenCardsRequest.reTrigger();
    return;
  };

  // Function to un-hide all flashcards
  const unhideAllHiddenCards = async () => {
    const hiddenCards: string[] = getHiddenCardUUIDs();
    for(const card of hiddenCards) {
      await unhideCardRequest.sendBackgroundRequest(
        `/hiddenCards/${localStorage.getItem('fc-uuid')}/${card}`,
      );
    };
    getHiddenCardsRequest.reTrigger();
    setShowHiddenCards(false);
    return;
  };

  // Function to save a flashcard log
  const saveLog = async () => {
    const status: number = await logRequest.reTrigger(logs[0]);
    if(status !== 201) return;
    setLogs((prev) => prev.slice(1));
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
    if(getFlashcardsRequest.data) castData(
      'Flashcards',
      getFlashcardsRequest,
      null,
      setFLashcards,
      setFlashcardCastingError,
    );
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
    recorder.startLog();
  }, [flashcards, hiddenCards]);

  // Hook to log flashcard usage
  useEffect(() => {
    if(logs.length > 0 && !logRequest.loading) saveLog();
  }, [logs]);

  // Return states
  return {
    set,
    flashcards: filteredFlashcards,
    allFlashcards: flashcards,
    currentFlashcardIndex,
    nextFlashcard,
    previousFlashcard,
    resyncFlashcards,
    cardFlipped,
    flipCard,
    hiddenCards,
    hideFlashcard,
    getHiddenCardUUIDs,
    showHiddenCards,
    toggleHiddenCards,
    unhideHiddenCard,
    unhideAllHiddenCards,
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
    },
    unhideCardRequest: {
      loading: unhideCardRequest.loading,
      toast: unhideCardRequest.toast,
    },
  };
};

export default useFlashcardReviser;