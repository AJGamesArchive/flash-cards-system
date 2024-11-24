// Core Imports
import './SetEditor.css';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from "primereact/divider";
import { classNames } from 'primereact/utils';
import { UseSetsEditorHook } from '../../hook/sets-editor/UseSetsEditor';
import commonColors from '../../static/Colors';
import WindowSize from '../../types/core/WindowSize';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import getReadableTimestamp from '../../functions/global/Timestamps';
import { difficulties } from '../../types/global/Difficulty';
import getDifficultyTag from '../global/DifficultyTag';
import TripleButton from '../core/TripleButton';

// Component Props Interface
interface SetsEditorProps {
  windowSize: WindowSize;
  editorController: UseSetsEditorHook;
};

/**
 * React function to render the sets editor component
 * @returns SetsEditor Component
 */
const SetsEditor: React.FC<SetsEditorProps> = ({
  windowSize,
  editorController,
}) => {
  // Hooks
  const loading: boolean = useLoadingListener([
    editorController.createRequest.loading,
    editorController.updateRequest.loading,
  ]);

  // Return JSX
  return (
    <>
      {
        //? Set Editor Title
      }
      <b className='set-editor-title' style={{
        fontSize:
          (windowSize.width > 768)
            ? '2rem'
            : '1.5rem'
      }}>
        {editorController.newSet ? 'Set Creator' : 'Set Editor'}
      </b>
      {
        //? Set Details Editor
      }
      <div className='set-editor-flex-row-full-div'>
        {
          //? Set Editor Controls
        }
        <div className='set-editor-set-details-container set-editor-set-details-left' style={{
          backgroundColor: commonColors.BackgroundBlue,
        }}>
          <div className='set-editor-set-details-container-title'>
            Editor Controls:
          </div>
          <div className='set-editor-set-details-container-buttons'>
            <Button
              label='Save All'
              icon='pi pi-save'
              severity='success'
              onClick={editorController.save}
              loading={loading}
              outlined
            />
            <Button
              label='Add Flashcard'
              icon='pi pi-plus'
              onClick={editorController.createFlashcard}
              disabled={loading}
              outlined
            />
          </div>
          <Divider/>
          <div className='set-editor-set-details-container-title'>
            Other Set Details:
          </div>
          <div>
            <b>Set Created On: </b>{getReadableTimestamp(editorController.setData?.createdAt)}
          </div>
          <div>
            <b>Set Last Updated On: </b>{getReadableTimestamp(editorController.setData?.updatedAt)}
          </div>
          <div>
            <b>Total Flashcards: </b>{editorController.flashcardData?.length}
          </div>
        </div>
        {
          //? Set Details
        }
        <div className='set-editor-set-details-container set-editor-set-details-right' style={{
          backgroundColor: commonColors.BackgroundBlue,
        }}>
          <div className='set-editor-set-details-container-title'>
            Set Details:
          </div>
          <div className='set-editor-form-field'>
            <label htmlFor="sets-editor-set-name">
              <b>Set Name</b>
            </label>
            <div className="p-inputgroup flex-1">
              <InputText 
                id="sets-editor-set-name"
                value={editorController.setData?.name}
                name={'name'}
                onChange={editorController.saveSetData}
                className={classNames({ 'p-invalid': !editorController.setData?.name })}
                placeholder='Enter a Set Name'
                disabled={loading}
              />
            </div>
          </div>
          <div className='set-editor-form-field'>
            <label htmlFor="sets-editor-set-description">
              <b>Set Description</b>
            </label>
            <div className="p-inputgroup flex-1">
              <InputTextarea 
                id="sets-editor-set-description"
                value={editorController.setData?.description}
                name={'description'}
                onChange={editorController.saveSetData}
                className={classNames({ 'p-invalid': !editorController.setData?.description })}
                placeholder='Enter a Set Description'
                disabled={loading}
                autoResize
              />
            </div>
          </div>
        </div>
      </div>
      {
        //? Flashcard Editor Title
      }
      <b className='set-editor-title' style={{
        fontSize:
          (windowSize.width > 768)
            ? '1.5rem'
            : '1.3rem'
      }}>
        Flashcards
      </b>
      {
        //? Flashcard Mapping
      }
      {editorController.flashcardData?.length === 0 && (
        <i style={{color: commonColors.Orange}}>
          There are currently no Flashcards in this set! Please create some flashcards.
        </i>
      )}
      <div className='set-editor-flex-col-full-div'>
        {editorController.flashcardData?.map((flashcard, index) => (
          <div className='set-editor-flashcards-container' key={index} style={{
            backgroundColor: commonColors.BackgroundBlue
          }}>
            {
              //? Card Number
            }
            <div className='set-editor-set-details-container-title'>
              Flashcard: {index + 1}
            </div>
            {
              //? Card Details
            }
            <div className='set-editor-form-field'>
              <label htmlFor="sets-editor-flashcard-question">
                <b>Flashcard Question</b>
              </label>
              <div className="p-inputgroup flex-1">
                <InputTextarea
                  id="sets-editor-flashcard-question"
                  value={flashcard.question}
                  name={'question'}
                  tabIndex={index}
                  onChange={editorController.saveFlashcardData}
                  className={classNames({ 'p-invalid': !flashcard.question })}
                  placeholder='Enter a Question'
                  disabled={loading}
                  autoResize
                />
              </div>
            </div>
            <div className='set-editor-form-field'>
              <div className='set-editor-flex-row-full-div'>
                <div className='set-editor-flex-row-half-div'>
                  <label htmlFor="sets-editor-flashcard-answer">
                    <b>Flashcard Answer</b>
                  </label>
                  <div className="p-inputgroup flex-1">
                    <InputText
                      id="sets-editor-flashcard-answer"
                      value={flashcard.answer}
                      name={'answer'}
                      tabIndex={index}
                      onChange={editorController.saveFlashcardData}
                      className={classNames({ 'p-invalid': !flashcard.answer })}
                      placeholder='Enter the Question Answer'
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className='set-editor-flex-row-half-div'>
                  <label htmlFor="sets-editor-flashcard-difficulty">
                    <b>Flashcard Difficulty</b>
                  </label>
                  <div className="p-inputgroup flex-1">
                    <Dropdown
                      id='sets-editor-flashcard-difficulty'
                      name={`difficulty-${index}`}
                      value={flashcard.difficulty}
                      options={difficulties}
                      itemTemplate={getDifficultyTag}
                      valueTemplate={getDifficultyTag}
                      onChange={editorController.saveDifficultySelection}
                      placeholder='Select Difficulty'
                      tabIndex={index}
                      disabled={loading}
                    />
                    <Button
                      icon='pi pi-times-circle'
                      severity={flashcard.difficulty === null ? 'secondary' : 'warning'}
                      onClick={() => editorController.clearDifficultySelection(index)}
                      style={{borderRadius: '0px'}}
                    />
                  </div>
                </div>
              </div>
            </div>
            {
              //? Delete Button
            }
            <div className='set-editor-flex-row-full-div'>
              <div className='set-editor-flex-row-half-div' style={{ textAlign: 'left' }}>
                <b>Flashcard Created On: </b>{getReadableTimestamp(flashcard.createdAt)}<br/>
                <b>Flashcard Last Updated On: </b>{getReadableTimestamp(flashcard.updatedAt)}
              </div>
              <div className='set-editor-flex-row-half-div'>
                <div className='set-editor-flashcards-delete-button'>
                  <TripleButton
                    label='Delete Flashcard'
                    icon='pi pi-trash'
                    severity='secondary'
                    onTripleClick={() => editorController.deleteFlashcard(flashcard.cardUUID)}
                    outlined
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SetsEditor;
