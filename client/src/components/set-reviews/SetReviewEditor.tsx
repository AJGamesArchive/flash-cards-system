// Core Imports
import './SetReviewEditor.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import commonColors from '../../static/Colors';
import useSetReviewEditor, { UseSetReviewEditorHook } from '../../hook/set-reviews/UseSetReviewEditor';
import useToastListener from '../../hook/core/UseToastListener';
import { UseSetReviewsHook } from '../../hook/set-reviews/UseSetReviews';

// Component Props Interface
interface SetReviewEditorProps {
  setUUID: string;
  toast: RefObject<Toast>
  reviewHandler: UseSetReviewsHook;
};

/**
 * React function to render the set review editor component
 * @returns SetReviewEditor Component
 */
const SetReviewEditor: React.FC<SetReviewEditorProps> = ({
  setUUID,
  toast,
  reviewHandler,
}) => {
  // Hooks
  const editorController: UseSetReviewEditorHook = useSetReviewEditor(setUUID, reviewHandler);
  useToastListener(toast, [
    editorController.creationRequest.toast,
    editorController.editorToast,
  ], []);

  // Return JSX
  return (
    <div className='set-review-editor-container'>
      <div className='set-review-editor-container-card' style={{
        backgroundColor: commonColors.BackgroundBlue,
      }}>
        {
          //? Editor Title
        }
        <div className='set-review-editor-title'>
          <b>
            Write a Review!
          </b>
        </div>
        {
          //? Star Rating Selection
        }
        <div className='set-review-editor-star-selection'>
          <b className='set-review-editor-star-selection-heading'>
            Set Star Rating:
          </b>
          <Rating
            value={editorController.data.starRating}
            onChange={editorController.saveStarRating}
            cancel={false}
            disabled={editorController.creationRequest.loading}
          />
        </div>
        {
          //? Review Input Box
        }
        <div className='set-review-editor-form-field'>
          <label htmlFor="set-review-editor-review">
            <b>Review Message</b>
          </label>
          <div className="p-inputgroup flex-1">
            <InputTextarea
              id="set-review-editor-review"
              value={editorController.data.review}
              name={'review'}
              onChange={editorController.saveReview}
              className={classNames({ 'p-invalid': !editorController.data.review })}
              placeholder='Type your Review'
              disabled={editorController.creationRequest.loading}
              autoResize
            />
          </div>
        </div>
        {
          //? Action Buttons
        }
        <div className='set-review-editor-button-field'>
          <Button
            label='Cancel'
            icon='pi pi-times'
            severity='secondary'
            onClick={() => reviewHandler.createReview.setFlag(false)}
            disabled={editorController.creationRequest.loading}
            outlined
          />
          <Button
            label='Post Review'
            icon='pi pi-comment'
            severity='success'
            onClick={editorController.postReview}
            loading={editorController.creationRequest.loading}
            outlined
          />
        </div>
      </div>
    </div>
  );
};

export default SetReviewEditor;
