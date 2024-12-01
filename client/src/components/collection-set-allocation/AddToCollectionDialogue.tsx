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
import DebugBlock from '../core/DebugBlock';

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
  const actionHandler: UseAddToCollectionHHook = useAddToCollection();
  const fetchingData: boolean = useLoadingListener([
    actionHandler.collectionsRequest.loading,
  ]);
  const overallError: ErrorWatch = useErrorListener([
    actionHandler.collectionsRequest.apiError,
    actionHandler.collectionsRequest.castingError,
  ]);
  useToastListener(toast, [
    
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
      header='Add To Collection'
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
              onClick={actionHandler.collectionsRequest.reTrigger}
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
              <b>[Heading_Text_Placeholder]:</b>
            </div>
            {
              //TODO Finish adding the 'add to collection' button(s)
            }
            {
            //! Debug Block - Remove Later
            }
            <DebugBlock>
              Set: {JSON.stringify(set, null, 2)}<br/>
              Collections: {JSON.stringify(actionHandler.collections, null, 2)}<br/>
            </DebugBlock>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default AddToCollectionDialogue;
