// Core Imports
import './CollectionCard.css';
import React from 'react';
import Collection from '../../types/global/Collection';
import commonColors from '../../static/Colors';
import getReadableTimestamp from '../../functions/global/Timestamps';

// Component Props Interface
interface CollectionCardProps {
  collection: Collection;
  children: React.ReactNode;
};

/**
 * React function to render the set card component
 * @returns SetCard Component
 */
const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  children,
}) => {
  // Return JSX
  return (
    <div className='collection-card-container' style={{
      backgroundColor: commonColors.BackgroundDarkBlue,
      borderColor: commonColors.LightGreen,
    }}>
      <div>
        <div className='collection-card-title'>
          <b className='collection-card-title-main' style={{
            color: commonColors.Green
          }}>
            {collection.name}
          </b>
          <br/>
        </div>
        <i>
          {collection.description}
        </i>
      </div>
      <div className='collection-card-inner-bottom-container'>
        <div className='collection-card-icon-bar'>
          <div>
            <i className='pi pi-folder collection-card-icon'/>
            <b>
              {` ${collection.numSets}`}
            </b>
          </div>
        </div>
        <div className='collection-card-icon-bar' style={{
          color: commonColors.LightGreen,
        }}>
          <div>
            Ctd: {` ${getReadableTimestamp(collection.createdOn)}`}
          </div>
          <div>
            Upd: {` ${getReadableTimestamp(collection.updatedOn)}`}
          </div>
        </div>
        <div className='collection-card-icon-bar'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
