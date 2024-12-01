// Imports
import './SetReviews.css';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import SetReviewsParams from '../../interfaces/SetReviewsParams';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import useSetReviews, { UseSetReviewsHook } from '../../hook/set-reviews/UseSetReviews';
import ErrorWatch from '../../types/core/ErrorWatch';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import useToastListener from '../../hook/core/UseToastListener';
import PageError from '../../components/core/PageError';
import PageLoading from '../../components/core/PageLoading';
import SetDetailsPageHeader from '../../components/global/SetDetailsPageHeader';
import SetReviewEditor from '../../components/set-reviews/SetReviewEditor';
import SetReviewCard from '../../components/set-reviews/SetReviewCard';
import commonColors from '../../static/Colors';

/**
 * React function to render the set reviews page
 * @returns SetReviewsPage Component
 */
const SetReviewsPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const params = useParams<SetReviewsParams>();
  const reviewHandler: UseSetReviewsHook = useSetReviews(params.setUUID || '');
  const loading: boolean = useLoadingListener([
    reviewHandler.getReviewsRequest.loading,
    reviewHandler.getSetRequest.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    reviewHandler.getReviewsRequest.apiError,
    reviewHandler.getReviewsRequest.castingError,
    reviewHandler.getSetRequest.apiError,
    reviewHandler.getSetRequest.castingError,
  ]);
  useToastListener(toast, [
    reviewHandler.getReviewsRequest.toast,
    reviewHandler.getSetRequest.toast,
  ], ['success', 'info']);

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Top'
      pageHorizontalAlignment='Center'
      selectedItemIndex={0}
    >
      {error && (
        <PageError
          displayError={String(error)}
        />
      )}
      {(!error && loading) && (
        <PageLoading/>
      )}
      {(!error && !loading) && (
        <>
          {
            //? Set Details Page Header
          }
          <SetDetailsPageHeader
            set={reviewHandler.set}
            windowSize={windowSize}
          >
            <Button
              label='Post Review'
              icon='pi pi-comment'
              onClick={() => reviewHandler.createReview.setFlag(true)}
              visible={!reviewHandler.createReview.flag}
              outlined
            />
          </SetDetailsPageHeader>
          {
            //? Create Set Review Panel
          }
          {reviewHandler.createReview.flag && (
            <SetReviewEditor
              setUUID={params.setUUID ? params.setUUID : ''}
              toast={toast}
              reviewHandler={reviewHandler}
            />
          )}
          {
            //? Set Review Mappings
          }
          {(!reviewHandler.createReview.flag && reviewHandler.reviews.length === 0) && (
            <i style={{color: commonColors.BluePurple}}>
              There are currently no reviews for this set!
            </i>
          )}
          {!reviewHandler.createReview.flag && reviewHandler.reviews.map((review, index) => (
            <div key={index} className='set-review-mapping-container'>
              <SetReviewCard
                review={review}
              />
            </div>
          ))}
        </>
      )}
    </ToolBarPage>
  );
};

export default SetReviewsPage;
