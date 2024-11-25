// Core Imports
import './SetDetailsPageHeader.css';
import React from 'react';
import Set from '../../types/global/Set';
import commonColors from '../../static/Colors';
import WindowSize from '../../types/core/WindowSize';

// Component Props Interface
interface SetDetailsPageHeaderProps {
  set: Set | null;
  windowSize: WindowSize;
  children: React.ReactNode;
};

/**
 * React function to render the set details page header component
 * @returns SetDetailsPageHeader Component
 */
const SetDetailsPageHeader: React.FC<SetDetailsPageHeaderProps> = ({
  set,
  windowSize,
  children,
}) => {
  // Return JSX
  return (
    <>
      <b className='set-details-page-header-title' style={{
        color: commonColors.Blue,
        fontSize:
          (windowSize.width > 768)
            ? '2rem'
            : '1.5rem'
      }}>
        {set ? `${set.name} Reviews` : 'Set Not Found]'}
      </b>
      <b className='set-details-page-header-title' style={{
        color: commonColors.Purple,
        fontSize:
          (windowSize.width > 768)
            ? '1.5rem'
            : '1.2rem'
      }}>
        {set ? set.authorUsername : 'Set Not Found]'}
      </b>
      <i className='set-details-page-header-title'>
        {set ? set.description : 'Set Not Found]'}
      </i>
      <div className='set-details-page-header-icon'>
        <div>
          <i className='pi pi-file set-card-icon'/>
          <b>
            {` ${set?.numFlashcards}`}
          </b>
        </div>
        <div>
          <i className='pi pi-comment set-card-icon'/>
          <b>
            {` ${set?.numReviews}`}
          </b>
        </div>
      </div>
      <div>
        {children}
      </div>
    </>
  );
};

export default SetDetailsPageHeader;
