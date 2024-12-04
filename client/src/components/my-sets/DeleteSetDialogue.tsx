// Core Imports
import './DeleteSetDialogue.css';
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import TripleButton from '../core/TripleButton';
import { UseMySetsHook } from '../../hook/my-sets/UseMySets';
import commonColors from '../../static/Colors';
import useLoadingListener from '../../hook/core/UseLoadingListener';

// Component Props Interface
interface DeleteSetDialogueProps {
  mySetsController: UseMySetsHook;
};

/**
 * React function to render the delete set dialogue component
 * @returns DeleteSetDialogue Component
 */
const DeleteSetDialogue: React.FC<DeleteSetDialogueProps> = ({
  mySetsController,
}) => {
  // Event listeners
  const processingDeletion: boolean = useLoadingListener([
    mySetsController.deleteSetRequest.loading,
    mySetsController.preparingDeletion,
  ]);

  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="delete-set-dialogue-footer">
        <div className="delete-set-dialogue-footer-button">
          <Button
            label="Cancel"
            disabled={mySetsController.deleteSetRequest.loading}
            icon="pi pi-times"
            onClick={mySetsController.cancelSetDeletion}
            severity='secondary'
            raised
          />
        </div>
        <div className="delete-set-dialogue-footer-button">
          <TripleButton
            label="Delete Set"
            loading={processingDeletion}
            icon="pi pi-trash"
            onTripleClick={mySetsController.deleteSelectedSet}
            raised
          />
        </div>
      </div>
    </React.Fragment>
  );

  // Return JSX
  return (
    <Dialog 
      visible={!!mySetsController.deletedSet}
      resizable={false}
      draggable={false}
      closable={!mySetsController.deleteSetRequest.loading}
      closeIcon='pi pi-times'
      focusOnShow={false}
      closeOnEscape={true}
      breakpoints={{ '1250px': '55vw', '1000px': '70vw', '820px': '75vw', '768px': '90vw', '400px': '95vw' }} 
      header='Confirm Set Deletion'
      footer={footer} 
      onHide={mySetsController.cancelSetDeletion}
    >
      <div className='delete-set-dialogue-content'>
        <b>Are you sure you want to delete the set:</b><br/>
        <div style={{
          color: commonColors.Blue,
        }}>
          <b>{mySetsController.deletedSet?.name}</b>
        </div>
        <i style={{
          color: commonColors.Orange,
        }}>
          <b>This will delete the set and all of it's flashcards for all users!</b>
        </i>
      </div>
    </Dialog>
  );
};

export default DeleteSetDialogue;
