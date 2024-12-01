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
  hideToggleIcon: 'pi pi-eye' | 'pi pi-eye-slash';
  onRefresh?: () => void;
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
  hideToggleIcon,
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
              disabled={!onRefresh}
              severity={!onRefresh ? 'secondary' : 'help'}
              outlined
            />
          </div>
          <div>
            {getDifficultyTag(flashcard.difficulty)}<br/>
          </div>
          <div>
            <Button
              icon={hideToggleIcon}
              onClick={() => onHide(flashcard.cardUUID)}
              loading={hidingCard}
              severity={hideToggleIcon === 'pi pi-eye' ? 'info' : 'help'}
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
    <div className='flashcard-base-container'>
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
    </div>
  );
};

export default FlashcardCard;
