// Core Imports
import './SetCard.css';
import React from 'react';
import Set from '../../types/global/Set';
import commonColors from '../../static/Colors';

// Component Props Interface
interface SetCardProps {
  set: Set;
  children: React.ReactNode;
};

/**
 * React function to render the set card component
 * @returns SetCard Component
 */
const SetCard: React.FC<SetCardProps> = ({
  set,
  children,
}) => {
  // Return JSX
  return (
    <div className='set-card-container' style={{
      backgroundColor: commonColors.BackgroundDarkBlue,
      borderColor: commonColors.BluePurple,
    }}>
      <div>
        <div className='set-card-title'>
          <b className='set-card-title-main' style={{
            color: commonColors.Blue
          }}>
            {set.name}
          </b>
          <br/>
          <div className='set-card-title-sub' style={{
            color: commonColors.Purple
          }}>
            {set.authorUsername}
          </div>
        </div>
        <i>
          {set.description}
        </i>
      </div>
      <div className='set-card-inner-bottom-container'>
        <div className='set-card-icon-bar'>
          <div>
            <i className='pi pi-file set-card-icon'/>
            <b>
              {` ${set.numFlashcards}`}
            </b>
          </div>
          <div>
            <i className='pi pi-comment set-card-icon'/>
            <b>
              {` ${set.numReviews}`}
            </b>
          </div>
        </div>
        <div className='set-card-icon-bar'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SetCard;
