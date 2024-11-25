// Imports
import { useState } from "react";
import { RatingChangeEvent } from 'primereact/rating';
import APIResponse from "../../types/services/APIResponse";
import useServerAPI from "../api/UseServerAPI";
import ErrorWatch from "../../types/core/ErrorWatch";
import ToastWatch from "../../types/core/ToastWatch";
import saveUserTextInputToObject from "../../functions/core/SaveUserTextInputToObject";
import { Nullable } from "primereact/ts-helpers";
import useToastMessage, { UseToastMessageHook } from "../core/UseToastMessage";
import { UseSetReviewsHook } from "./UseSetReviews";

/**
 * Type to define the 
 */
type NewReview = {
  review: string;
  starRating: number;
};

/**
 * Type to define the states exposed by the useSetReviews hook
 */
export type UseSetReviewEditorHook = {
  data: NewReview;
  saveReview: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  saveStarRating: (e: RatingChangeEvent) => void;
  creationRequest: {
    loading: boolean;
    error: ErrorWatch;
    toast: ToastWatch;
  };
  editorToast: ToastWatch;
  postReview: () => void;
};

/**
 * Hook to type-cast and manage reviews for a given set
 */
function useSetReviewEditor(
  setUUID: string,
  reviewHandler: UseSetReviewsHook,
): UseSetReviewEditorHook {
  // Hooks & states
  const [data, setData] = useState<NewReview>({
    review: '',
    starRating: 3,
  });
  const editorToast: UseToastMessageHook = useToastMessage();
  const creationRequest: APIResponse<object> = useServerAPI(
    'POST',
    `/sets/${setUUID}/review`,
    data,
    { immediate: false },
  );

  // Function to save a user review to the data object
  const saveReview = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => saveUserTextInputToObject<NewReview>(e, setData);

  // Function to save a users star rating input to the data object
  const saveStarRating = (e: RatingChangeEvent) => {
    const rating: Nullable<number> = e.value;
    if(!rating) return;
    setData((prev) => ({
      ...prev,
      starRating: Number(rating),
    }));
    return;
  };

  // Function to validate data and post the review
  const postReview = async () => {
    // Validate data
    if(!data.review) {
      editorToast.setToast({
        severity: 'info',
        summary: 'Missing Data',
        detail: 'You have not entered a review message. Please provide a review message and try again.',
        closable: false,
        life: 3000,
      });
      return;
    };

    // Post review
    const status: number = await creationRequest.reTrigger();
    if(status !== 201) return;
    setTimeout(() => {
      reviewHandler.getReviewsRequest.reTrigger();
      reviewHandler.getSetRequest.reTrigger();
      reviewHandler.createReview.setFlag(false);
      setData({
        review: '',
        starRating: 3,
      });
    }, 2);
    return;
  };

  // Return states
  return {
    data,
    saveReview,
    saveStarRating,
    creationRequest: {
      loading: creationRequest.loading,
      error: creationRequest.error,
      toast: creationRequest.toast,
    },
    editorToast: editorToast.toast,
    postReview,
  };
};

export default useSetReviewEditor;