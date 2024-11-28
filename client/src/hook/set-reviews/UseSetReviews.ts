// Imports
import { useEffect, useState } from "react";
import APIResponse from "../../types/services/APIResponse";
import castData from "../../functions/core/CastData";
import ErrorWatch from "../../types/core/ErrorWatch";
import useServerAPI from "../api/UseServerAPI";
import ToastWatch from "../../types/core/ToastWatch";
import SetReview from "../../types/global/SetReview";
import Set from "../../types/global/Set";

/**
 * Type to define the states exposed by the useSetReviews hook
 */
export type UseSetReviewsHook = {
  reviews: SetReview[];
  set: Set | null;
  getReviewsRequest: {
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    toast: ToastWatch;
    reTrigger: () => Promise<number>;
  };
  getSetRequest: {
    loading: boolean;
    apiError: ErrorWatch;
    castingError: ErrorWatch;
    toast: ToastWatch;
    reTrigger: () => Promise<number>;
  };
  createReview: {
    flag: boolean;
    setFlag: (value: boolean) => void;
  };
};

/**
 * Hook to type-cast and manage reviews for a given set
 */
function useSetReviews(
  setUUID: string,
): UseSetReviewsHook {
  // Hooks & states
  const [reviews, setReviews] = useState<SetReview[]>([]);
  const [reviewCastingError, setReviewCastingError] = useState<ErrorWatch>(null);
  const [set, setSet] = useState<Set | null>(null);
  const [setCastingError, setSetCastingError] = useState<ErrorWatch>(null);
  const [createReviewFlag, setCreateReviewFlag] = useState<boolean>(false);
  const getReviewsRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets/${setUUID}/reviews`,
    {},
    { immediate: true, ignoreStatusCodes: [404] },
  );
  const getSetRequest: APIResponse<object> = useServerAPI(
    'GET',
    `/sets/${setUUID}`,
    {},
  );

  // Hook to type-cast review data received from the API
  useEffect(() => {
    if(getReviewsRequest.data) castData(
      'Reviews',
      getReviewsRequest,
      null,
      setReviews,
      setReviewCastingError,
    );
  }, [getReviewsRequest.data]);

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

  // Return states
  return {
    reviews,
    set,
    getReviewsRequest: {
      loading: getReviewsRequest.loading,
      apiError: getReviewsRequest.error,
      castingError: reviewCastingError,
      toast: getReviewsRequest.toast,
      reTrigger: getReviewsRequest.reTrigger,
    },
    getSetRequest: {
      loading: getSetRequest.loading,
      apiError: getSetRequest.error,
      castingError: setCastingError,
      toast: getSetRequest.toast,
      reTrigger: getSetRequest.reTrigger,
    },
    createReview: {
      flag: createReviewFlag,
      setFlag: setCreateReviewFlag,
    },
  };
};

export default useSetReviews;