// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import Set from "../../types/global/Set";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";

/**
 * Type to define the states exposed by the useMySets hook
 */
export type UseMySetsHook = {
  mySets: Set[];
  mySetsRequest: {
    toast: ToastWatch;
    loading: boolean;
    error: ErrorWatch;
  };
  deleteSetRequest: {
    toast: ToastWatch;
    loading: boolean;
    error: ErrorWatch;
  };
  castingError: ErrorWatch;
  selectSetForDeletion: (set: Set) => void;
  deletedSet: Set | null;
  preparingDeletion: boolean;
  cancelSetDeletion: () => void;
  deleteSelectedSet: () => Promise<void>;
};

/**
 * Hook to type-cast and manage a users sets
 */
function useMySets(): UseMySetsHook {
  // Hooks & states
  const [mySets, setMySets] = useState<Set[]>([]);
  const [deletedSet, setDeleteSet] = useState<Set | null>(null);
  const [preparingDeletion, setPreparingDeletion] = useState<boolean>(false);
  const [castingError, setCastingError] = useState<ErrorWatch>(null);
  const mySetsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/users/${localStorage.getItem('fc-uuid')}/sets`,
    {},
  );
  const deleteSetRequest: APIResponse<object> = useServerAPI(
    'DELETE',
    `/sets/${deletedSet?.setUUID}`,
    {},
    { immediate: false },
  );

  // Function to select a set to delete
  const selectSetForDeletion = (set: Set) => {
    setPreparingDeletion(true);
    setDeleteSet(set);
    setTimeout(() => {
      setPreparingDeletion(false);
    }, 2000);
    return;
  };

  // Function to cancel a set deletion
  const cancelSetDeletion = () => setDeleteSet(null);

  // Function to delete the selected set
  const deleteSelectedSet = async () => {
    const deletionStatus: number = await deleteSetRequest.reTrigger();
    if(deletionStatus !== 204) return;
    setDeleteSet(null);
    mySetsRequest.reTrigger();;
    return;
  };

  // Hook to type-cast data received from the API
  useEffect(() => {
    if(mySetsRequest.data) castData(
      'Sets',
      mySetsRequest,
      null,
      setMySets,
      setCastingError,
    );
  }, [mySetsRequest.data]);
  
  // Return states
  return {
    mySets,
    mySetsRequest: {
      toast: mySetsRequest.toast,
      loading: mySetsRequest.loading,
      error: mySetsRequest.error,
    },
    deleteSetRequest: {
      loading: deleteSetRequest.loading,
      error: deleteSetRequest.error,
      toast: deleteSetRequest.toast,
    },
    castingError,
    selectSetForDeletion,
    deletedSet,
    preparingDeletion,
    cancelSetDeletion,
    deleteSelectedSet,
  };
};

export default useMySets;