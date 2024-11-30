// Core Imports
import './CollectionEditorDialogue.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import useCollectionEditor, { UseCollectionEditorHook, CoreCollectionDetails } from '../../hook/my-collections/UseCollectionEditor';

// Component Props Interface
interface CollectionEditorDialogueProps {
  toast: RefObject<Toast>;
  visible: boolean;
  closeEditor: () => void;
  selectedCollection: CoreCollectionDetails | null | undefined;
  reFetchCollections: () => Promise<number>;
};

/**
 * React function to render the collection editor dialogue component
 * @returns CollectionEditorDialogue Component
 */
const CollectionEditorDialogue: React.FC<CollectionEditorDialogueProps> = ({
  toast,
  visible,
  closeEditor,
  selectedCollection,
  reFetchCollections,
}) => {
  // Component Hooks
  const editorController: UseCollectionEditorHook = useCollectionEditor(
    visible,
    selectedCollection,
    closeEditor,
    reFetchCollections,
  );
  const saving: boolean = useLoadingListener([
    editorController.creationRequest.loading,
    editorController.updateRequest.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    editorController.creationRequest.error,
    editorController.updateRequest.error,
  ]);
  useToastListener(toast, [
    editorController.creationRequest.toast,
    editorController.updateRequest.toast,
  ], []);

  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="collection-editor-dialogue-footer">
        <div className="collection-editor-dialogue-footer-button">
          <Button
            label="Cancel"
            disabled={saving}
            icon="pi pi-times"
            onClick={closeEditor}
            severity='secondary'
            raised
          />
        </div>
        <div className="collection-editor-dialogue-footer-button">
          <Button
            label={!selectedCollection ? 'Create' : 'Save'}
            loading={saving}
            icon={!selectedCollection ? 'pi pi-plus' : 'pi pi-save'}
            onClick={editorController.saveCollection}
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
      header={!selectedCollection ? 'Create Collection' : 'Edit Collection'}
      footer={footer} 
      onHide={closeEditor}
    >
      {
        //? Heading Text
      }
      <div className='collection-editor-dialogue-heading-text'>
        <b>Please enter collection details:</b>
      </div>
      {
        //? Name Field
      }
      <div className="collection-editor-form-field">
        <label htmlFor="collection-editor-name">
          <b>Name</b>
        </label>
        <div className="p-inputgroup flex-1">
          <InputText 
            id="collection-editor-name"
            value={editorController.coreDetails.name}
            name={'name'}
            onChange={editorController.saveInput}
            className={classNames({ 'p-invalid': !editorController.coreDetails.name })}
            placeholder='Enter Collection Name'
            disabled={saving}
          />
        </div>
      </div>
      {
        //? Description Field
      }
      <div>
        <label htmlFor="collection-editor-description">
          <b>Description</b>
        </label>
        <div className="p-inputgroup flex-1">
          <InputText 
            id="collection-editor-description"
            value={editorController.coreDetails.description}
            name={'description'}
            onChange={editorController.saveInput}
            className={classNames({ 'p-invalid': !editorController.coreDetails.description })}
            placeholder='Enter Collection Description'
            disabled={saving}
          />
        </div>
      </div>
      {
        //? Output any errors returned by the API
      }
      {(error) && (
        <div className="p-error" style={{
          textAlign: 'center',
          paddingTop: '10px',
        }}>
          <b>{error}</b>
        </div>
      )}
    </Dialog>
  );
};

export default CollectionEditorDialogue;
