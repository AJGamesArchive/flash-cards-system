// Imports
import Set from "../../types/global/Set";
import Flashcard from "../../types/global/Flashcard";
import useServerAPI from "../api/UseServerAPI";
import APIResponse from "../../types/services/APIResponse";
import { useEffect, useState } from "react";
import ErrorWatch from "../../types/core/ErrorWatch";
import ToastWatch from "../../types/core/ToastWatch";
import useLoadingListener from "../core/UseLoadingListener";
import castData from "../../functions/core/CastData";

/**
 * Type to define the set data that users can edit
 */
export type SetEditable = {
  setDetails: {
    setUUID: string;
    name: string;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    authorUUID: string;
  };
  flashcards: Flashcard[];
};

/**
 * Type to define the states exposed by the useSetsEditorSetup hook
 */
export type UseSetsEditorSetupHook = {
  preparing: boolean;
  editorData: SetEditable | null;
  setRequest: {
    loading: boolean;
    error: ErrorWatch;
  };
  cardsRequest: {
    loading: boolean;
    error: ErrorWatch;
  };
  castingErrors: {
    set: ErrorWatch;
    cards: ErrorWatch;
  },
  toasts: ToastWatch[];
};

/**
 * Hook to prepare data for the sets editor
 */
function useSetsEditorSetup(
  setUUID: string | undefined,
): UseSetsEditorSetupHook {
  // API hooks
  const setRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets/${setUUID}`,
    {},
    { immediate: setUUID !== 'new' },
  );
  const cardsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets/${setUUID}/cards`,
    {},
    { immediate: setUUID !== 'new' },
  );

  // Data states
  const [preparing, setPreparing] = useState<boolean>(setUUID !== 'new');
  const [fetchedSet, setFetchedSet] = useState<Set | null>(null);
  const [setCastingError, setSetCastingError] = useState<ErrorWatch>(null);
  const [fetchedCards, setFetchedCards] = useState<Flashcard[] | null>(null);
  const [cardCastingError, setCardCastingError] = useState<ErrorWatch>(null);
  const [editorData, setEditorData] = useState<SetEditable | null>(
    (setUUID !== 'new') 
      ? null
      : {
        setDetails: {
          setUUID: '',
          name: '',
          description: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          authorUUID: '',
        },
        flashcards: [],
      },
  );

  // Event listeners
  const overallLoading: boolean = useLoadingListener([
    setRequest.loading,
    cardsRequest.loading,
    preparing,
  ]);

  // Function to map together editor data
  const mapData = (): void => {
    if(!fetchedSet || !fetchedCards) return;
    setEditorData({
      setDetails: {
        setUUID: fetchedSet.setUUID,
        name: fetchedSet.name,
        description: fetchedSet.description,
        createdAt: new Date(fetchedSet.createdAt),
        updatedAt: new Date(fetchedSet.updatedAt),
        authorUUID: fetchedSet.authorUUID,
      },
      flashcards: fetchedCards,
    });
    setPreparing(false);
    return;
  };

  // Hook to cast the fetched set data once API request is complete
  useEffect(() => {
    if(setRequest.data && setUUID !== 'new') castData(
      'Set',
      setRequest,
      null,
      setFetchedSet,
      setSetCastingError,
    );
  }, [setRequest.data]);

  // Hook to cast the fetched flashcard data once API request is complete
  useEffect(() => {
    if(cardsRequest.data && setUUID !== 'new') castData(
      'Flashcards',
      cardsRequest,
      null,
      setFetchedCards,
      setCardCastingError,
    );
  }, [cardsRequest.data]);

  // Hook to trigger editor data mapping once all data fetching and casting is complete
  useEffect(() => {
    if(setUUID !== 'new') mapData();
  }, [fetchedSet, fetchedCards]);
  
  // Return states
  return {
    preparing: overallLoading,
    editorData,
    setRequest: {
      loading: setRequest.loading,
      error: setRequest.error,
    },
    cardsRequest: {
      loading: cardsRequest.loading,
      error: cardsRequest.error,
    },
    castingErrors: {
      set: setCastingError,
      cards: cardCastingError,
    },
    toasts: [
      setRequest.toast,
      cardsRequest.toast,
    ],
  };
};

export default useSetsEditorSetup;