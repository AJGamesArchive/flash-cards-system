// Core Imports
import './SetReviewCard.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import commonColors from '../../static/Colors';
import SetReview from '../../types/global/SetReview';
import getReadableTimestamp from '../../functions/global/Timestamps';

//TODO Clean up and compact this UI a little if time permits

// Component Props Interface
interface SetReviewCardProps {
  key: number;
  review: SetReview;
};

/**
 * React function to render the set review card component
 * @returns SetReviewCard Component
 */
const SetReviewCard: React.FC<SetReviewCardProps> = ({
  key,
  review,
}) => {
  // Return JSX
  return (
    <div key={key} className='set-review-card-container'>
      <div className='set-review-card-container-card' style={{
        backgroundColor: commonColors.BackgroundDarkBlue,
        borderColor: commonColors.BluePurple,
      }}>
        {
          //? Editor Title
        }
        <div className='set-review-card-title'>
          <b>Review by: </b>
          <b style={{color: commonColors.Purple}}>{review.authorUsername}</b>
        </div>
        {
          //? Star Rating Selection
        }
        <div className='set-review-card-star-selection'>
          <b className='set-review-card-star-selection-heading'>
            Star Rating:
          </b>
          <Rating
            value={review.starRating}
            readOnly={true}
            cancel={false}
          />
        </div>
        {
          //? Review Input Box
        }
        <div className='set-review-card-review'>
          "<i>{review.review}</i>"
        </div>
        {
          //? Action Buttons
        }
        <div className='set-review-card-misc-field'>
          <b>Review Date: </b>
          <b style={{color: commonColors.BluePurple}}>{getReadableTimestamp(review.updatedAt)}</b>
        </div>
      </div>
    </div>
  );
};

export default SetReviewCard;
