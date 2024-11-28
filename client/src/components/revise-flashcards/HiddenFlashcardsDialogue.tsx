// Core Imports
import './HiddenFlashcardsDialogue.css';
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { UseFLashcardReviserHook } from '../../hook/revise-flashcards/UseFlashcardReviser';
import Flashcard from '../../types/global/Flashcard';
import FlashcardCard from './FlashcardCard';

// Component Props Interface
interface HiddenFlashcardsDialogueProps {
  revisionController: UseFLashcardReviserHook;
};

/**
 * React function to render the hidden flashcards dialogue component
 * @returns HiddenFlashcardsDialogue Component
 */
const HiddenFlashcardsDialogue: React.FC<HiddenFlashcardsDialogueProps> = ({
  revisionController,
}) => {
  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="hidden-cards-dialogue-footer">
        <div className="hidden-cards-dialogue-footer-button">
          <Button
            label="Cancel"
            disabled={false}
            icon="pi pi-times"
            onClick={revisionController.toggleHiddenCards}
            severity='secondary'
            raised
          />
        </div>
        <div className="login-dialogue-footer-button">
          <Button
            label="Un-Hide All"
            icon="pi pi-eye"
            onClick={revisionController.unhideAllHiddenCards}
            disabled={revisionController.getHiddenCardUUIDs().length === 0}
            loading={revisionController.unhideCardRequest.loading}
            raised
          />
        </div>
      </div>
    </React.Fragment>
  );

  // Hidden Flashcard Template
  const hiddenFlashcardTemplate = (flashcard: Flashcard, index: number) => {
    const [flipped, setFlipped] = React.useState(false);
    if(!revisionController.getHiddenCardUUIDs().includes(flashcard.cardUUID)) return;
    return (
      <div key={index} className='hidden-cards-dialogue-flashcard'>
        <FlashcardCard
          flashcard={flashcard}
          flipped={flipped}
          onFlipped={() => setFlipped(!flipped)}
          hidingCard={revisionController.unhideCardRequest.loading}
          onHide={revisionController.unhideHiddenCard}
          hideToggleIcon='pi pi-eye'
        />
      </div>
    );
  };

  // Return JSX
  return (
    <Dialog 
      visible={revisionController.showHiddenCards}
      resizable={false}
      draggable={false}
      closable={!revisionController.unhideCardRequest.loading}
      closeIcon='pi pi-times'
      focusOnShow={false}
      closeOnEscape={true}
      breakpoints={{ '9999px': '75vw', '1250px': '80vw', '1000px': '85vw', '820px': '90vw', '768px': '95vw', '400px': '95vw' }} 
      header='Hidden Flashcards' 
      footer={footer} 
      onHide={revisionController.toggleHiddenCards}
    >
      <div className='hidden-cards-dialogue-content'>
        {revisionController.allFlashcards.map(hiddenFlashcardTemplate)}
      </div>
    </Dialog>
  );
};

export default HiddenFlashcardsDialogue;
