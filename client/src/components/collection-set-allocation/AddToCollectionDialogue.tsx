// Core Imports
import './AddToCollectionDialogue.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import Set from '../../types/global/Set';
import useAddToCollection, { UseAddToCollectionHHook } from '../../hook/collection-set-allocation/UseAddToCollection';
import CollectionCard from '../global/CollectionCard';
import commonColors from '../../static/Colors';

// Component Props Interface
interface AddToCollectionDialogueProps {
  toast: RefObject<Toast>;
  set: Set | null;
  cancelAction: () => void;
};

/**
 * React function to render the add to collection dialogue component
 * @returns AddToCollectionDialogue Component
 */
const AddToCollectionDialogue: React.FC<AddToCollectionDialogueProps> = ({
  toast,
  set,
  cancelAction,
}) => {
  // Component Hooks
  const actionHandler: UseAddToCollectionHHook = useAddToCollection(
    set?.setUUID || '',
    set?.name || '',
    cancelAction,
  );
  const fetchingData: boolean = useLoadingListener([
    actionHandler.collectionsRequest.loading,
    !set,
  ]);
  const loadingAllocation: boolean = useLoadingListener([
    actionHandler.allocationRequest.loading,
  ]);
  const overallError: ErrorWatch = useErrorListener([
    actionHandler.collectionsRequest.apiError,
    actionHandler.collectionsRequest.castingError,
  ]);
  useToastListener(toast, [
    actionHandler.allocationRequest.toast,
  ], ['info']);
  useToastListener(toast, [
    actionHandler.infoToast,
  ], []);

  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="add-to-collection-dialogue-footer">
        <div className="add-to-collection-dialogue-footer-button">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={cancelAction}
            severity='secondary'
            raised
          />
        </div>
      </div>
    </React.Fragment>
  );

  // Return JSX
  return (
    <Dialog 
      visible={!!set} 
      resizable={false}
      draggable={false}
      closable={true}
      closeIcon='pi pi-times'
      focusOnShow={false}
      closeOnEscape={true}
      breakpoints={{ '1250px': '55vw', '1000px': '70vw', '820px': '75vw', '768px': '90vw', '400px': '95vw' }} 
      header='Select a Collection'
      footer={footer} 
      onHide={cancelAction}
    >
      <div className='add-to-collection-dialogue-content'>
        {fetchingData && (
          <div className='add-to-collection-dialogue-loading'>
            <ProgressSpinner/>
          </div>
        )}
        {(overallError && !fetchingData) && (
          <div className="p-error add-to-collection-dialogue-error">
            <i className='pi pi-exclamation-triangle' style={{
              fontSize: '90px'
            }}/>
            <div className='add-to-collection-dialogue-padding'>
              <b>{overallError}</b>
            </div>
            <Button
              label='Try Again'
              icon='pi pi-refresh'
              onClick={() => actionHandler.collectionsRequest.reTrigger()}
              disabled={fetchingData}
              severity='help'
              outlined
            />
          </div>
        )}
        {(!fetchingData && !overallError) && (
          <>
            {
              //? Heading Text
            }
            <div className='add-to-collection-dialogue-heading-text'>
              <b>
                Select a collection to add the set '
                <b style={{
                  color: commonColors.Blue,
                }}>
                  {set?.name}
                </b>
                ' to:
              </b>
            </div>
            {actionHandler.collections.length === 0 && (
              <div style={{
                color: commonColors.BluePurple,
              }}>
                <b>
                  <i>You have not made any collections. Please create some collections and try again.</i>
                </b>
                <div>
                  <Button
                    label='Create Collection'
                    icon='pi pi-plus-circle'
                    onClick={() => window.location.href = '/my-collections'}
                    outlined
                  />
                </div>
              </div>
            )}
            {
              //? Collection Card Mapping
            }
            <div className='add-to-collection-dialogue-collection-container'>
              {actionHandler.collections.map((collection, index) => (
                <div key={index} className='add-to-collection-dialogue-collection-card'>
                  <CollectionCard
                    collection={collection}
                    simple
                  >
                    <Button
                      label='Add Set'
                      icon='pi pi-plus-circle'
                      onClick={() => actionHandler.addToCollection(collection.collectionUUID)}
                      disabled={loadingAllocation}
                      severity='success'
                      outlined
                    />
                  </CollectionCard>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default AddToCollectionDialogue;
