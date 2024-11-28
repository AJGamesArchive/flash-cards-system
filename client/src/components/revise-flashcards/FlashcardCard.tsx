// Core Imports
import './FlashcardCard.css';
import React from 'react';
import { Button } from 'primereact/button';
import Flashcard from '../../types/global/Flashcard';
import commonColors from '../../static/Colors';
import getDifficultyTag from '../global/DifficultyTag';

// Component Props Interface
interface FlashcardCardProps {
  flashcard: Flashcard;
  flipped: boolean;
  onFlipped: () => void;
  hidingCard: boolean;
  onHide: (cardUUID: string) => void;
  onRefresh: () => void;
};

/**
 * React function to render the flashcard card component
 * @returns FlashcardCard Component
 */
const FlashcardCard: React.FC<FlashcardCardProps> = ({
  flashcard,
  flipped,
  onFlipped,
  hidingCard,
  onHide,
  onRefresh,
}) => {
  // Flashcard Header Template
  const renderFlashcardHeader = (sideTitle: string) => (
    <>
      {
        //? Flashcard Top Button Bar
      }
      <div>
        <div className='flashcard-card-top-bar'>
          <div>
            <Button
              icon='pi pi-refresh'
              onClick={onRefresh}
              severity='help'
              outlined
            />
          </div>
          <div>
            {getDifficultyTag(flashcard.difficulty)}<br/>
          </div>
          <div>
            <Button
              icon='pi pi-eye-slash'
              onClick={() => onHide(flashcard.cardUUID)}
              loading={hidingCard}
              severity='help'
              outlined
            />
          </div>
        </div>
        <div className='flashcard-card-prefix' style={{
          color: commonColors.IceBlue,
        }}>
          {sideTitle}
        </div>
      </div>
    </>
  );

  // Flashcard Footer Template
  const flashcardFooter = (
    <div className='flashcard-card-inner-bottom-container'>
      <div className='flashcard-card-icon-bar'>
        <Button
          label='Flip Flashcard'
          icon='pi pi-sync'
          onClick={onFlipped}
          style={{
            color:
              flashcard.difficulty === 'Easy' ? commonColors.Green :
              flashcard.difficulty === 'Medium' ? commonColors.Yellow :
              flashcard.difficulty === 'Hard' ? commonColors.Red :
              commonColors.BluePurple,
          }}
          outlined
        />
      </div>
    </div>
  );

  // Return JSX
  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
      <div className="flashcard-inner" style={{
        backgroundColor: commonColors.BackgroundDarkBlue,
        borderColor:
          flashcard.difficulty === 'Easy' ? commonColors.Green :
          flashcard.difficulty === 'Medium' ? commonColors.Yellow :
          flashcard.difficulty === 'Hard' ? commonColors.Red :
          commonColors.BluePurple,
      }}>
        {
          //? Flashcard Front
        }
        {!flipped && (
          <div className="flashcard-front">
            {renderFlashcardHeader('Question')}
            <div className='flashcard-card-question'>
              {flashcard.question}
            </div>
            {flashcardFooter}
          </div>
        )}
        {
          //? Flashcard Back
        }
        {flipped && (
          <div className="flashcard-back">
            {renderFlashcardHeader('Answer')}
            <div className='flashcard-card-question'>
              {flashcard.answer}
            </div>
            {flashcardFooter}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardCard;
