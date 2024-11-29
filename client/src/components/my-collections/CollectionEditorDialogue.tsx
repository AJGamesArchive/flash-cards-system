// Core Imports
import './CollectionEditorDialogue.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import useCollectionEditor, { UseCollectionEditorHook } from '../../hook/my-collections/UseCollectionEditor';

// Component Props Interface
interface CollectionEditorDialogueProps {
  toast: RefObject<Toast>;
  visible: boolean;
  setVisible: (state: boolean) => void;
  newCollectionFlag: boolean;
  collectionName: string | null;
  collectionDescription: string | null;
};

/**
 * React function to render the collection editor dialogue component
 * @returns CollectionEditorDialogue Component
 */
const CollectionEditorDialogue: React.FC<CollectionEditorDialogueProps> = ({
  toast,
  visible,
  setVisible,
  newCollectionFlag,
  collectionName,
  collectionDescription
}) => {
  // Component Hooks
  const editorController: UseCollectionEditorHook = useCollectionEditor(
    visible,
    newCollectionFlag,
    collectionName,
    collectionDescription
  );
  const saving: boolean = useLoadingListener([
    
  ]);
  const error: ErrorWatch = useErrorListener([
    
  ]);
  useToastListener(toast, [
    
  ], ['success']);

  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="collection-editor-dialogue-footer">
        <div className="collection-editor-dialogue-footer-button">
          <Button
            label="Cancel"
            disabled={saving}
            icon="pi pi-times"
            onClick={() => {}}
            severity='secondary'
            raised
          />
        </div>
        <div className="collection-editor-dialogue-footer-button">
          <Button
            label={newCollectionFlag ? 'Create' : 'Save'}
            loading={saving}
            icon={newCollectionFlag ? 'pi pi-plus' : 'pi pi-save'}
            onClick={() => {}}
            raised
          />
        </div>
      </div>
    </React.Fragment>
  );

  // Return JSX
  return (
    <Dialog 
      visible={visible} 
      resizable={false}
      draggable={false}
      closable={!saving}
      closeIcon='pi pi-times'
      focusOnShow={false}
      closeOnEscape={true}
      breakpoints={{ '1250px': '55vw', '1000px': '70vw', '820px': '75vw', '768px': '90vw', '400px': '95vw' }} 
      header='Login' 
      footer={footer} 
      onHide={() => {}}
    >
      Beep Boop
    </Dialog>
  );
};

export default CollectionEditorDialogue;
