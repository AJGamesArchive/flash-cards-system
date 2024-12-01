// Imports
import './ReviseFlashcards.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { useParams } from 'react-router-dom';
import Flashcard from '../../types/global/Flashcard';
import ReviseFLashcardsParams from '../../interfaces/ReviseFlashcardsParams';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import SetDetailsPageHeader from '../../components/global/SetDetailsPageHeader';
import useFlashcardReviser, { UseFLashcardReviserHook } from '../../hook/revise-flashcards/UseFlashcardReviser';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import useToastListener from '../../hook/core/UseToastListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import FlashcardCard from '../../components/revise-flashcards/FlashcardCard';
import commonColors from '../../static/Colors';
import HoverButton from '../../components/core/HoverButton';
import HiddenFlashcardsDialogue from '../../components/revise-flashcards/HiddenFlashcardsDialogue';

/**
 * React function to render the revise flashcards page
 * @returns ReviseFlashcardsPage Component
 */
const ReviseFlashcardsPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const params = useParams<ReviseFLashcardsParams>();
  const revisionController: UseFLashcardReviserHook = useFlashcardReviser(
    params.setUUID || '',
    params.query || '',
  );
  const loading: boolean = useLoadingListener([
    revisionController.getSetRequest.loading,
  ]);
  const loadingFlashcards: boolean = useLoadingListener([
    revisionController.getFlashcardsRequest.loading,
    revisionController.getHiddenCardsRequest.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    revisionController.getSetRequest.apiError,
    revisionController.getSetRequest.castingError,
    revisionController.getFlashcardsRequest.apiError,
    revisionController.getFlashcardsRequest.castingError,
    revisionController.getHiddenCardsRequest.apiError,
    revisionController.getHiddenCardsRequest.castingError,
  ]);
  useToastListener(toast, [
    revisionController.getSetRequest.toast,
    revisionController.getFlashcardsRequest.toast,
    revisionController.getHiddenCardsRequest.toast,
  ], ['success']);
  useToastListener(toast, [
    revisionController.hideCardRequest.toast,
    revisionController.unhideCardRequest.toast,
  ], []);

  // View Hidden Cards Button Template
  const viewHiddenCardsButton = (
    <div>
      <HoverButton
        label='View Hidden Cards'
        icon='pi pi-eye'
        onClick={revisionController.toggleHiddenCards}
        backgroundColor={commonColors.BackgroundBlue}
        hoverColor={commonColors.IceBlue}
        textColor={commonColors.White}
        hoverTextColor={commonColors.Black}
        visible={revisionController.getHiddenCardUUIDs().length !== 0}
        badgeValue={String(revisionController.getHiddenCardUUIDs().length)}
        raised
      />
    </div>
  );

  // Flashcard Reviser Render Template
  const renderFlashcard = (flashcard: Flashcard) => (
    <div className='flashcard-reviser-flashcard-container'>
      <FlashcardCard
        flashcard={flashcard}
        flipped={revisionController.cardFlipped}
        onFlipped={revisionController.flipCard}
        onRefresh={revisionController.resyncFlashcards}
        hidingCard={revisionController.hideCardRequest.loading}
        hideToggleIcon='pi pi-eye-slash'
        onHide={revisionController.hideFlashcard}
      />
      <div className='flashcard-reviser-buttons'>
        <HoverButton
          icon='pi pi-arrow-left'
          onClick={revisionController.previousFlashcard}
          backgroundColor={commonColors.BackgroundBlue}
          hoverColor={commonColors.BluePurple}
          textColor={commonColors.White}
          hoverTextColor={commonColors.Black}
          raised
        />
        <div className='flashcard-reviser-card-counter' style={{
          backgroundColor: commonColors.BackgroundDarkBlue,
        }}>
          {`${revisionController.currentFlashcardIndex + 1} / ${revisionController.flashcards.length}`}
        </div>
        <HoverButton
          icon='pi pi-arrow-right'
          onClick={revisionController.nextFlashcard}
          backgroundColor={commonColors.BackgroundBlue}
          hoverColor={commonColors.Blue}
          textColor={commonColors.White}
          hoverTextColor={commonColors.Black}
          raised
        />
      </div>
      {viewHiddenCardsButton}
    </div>
  );

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Top'
      pageHorizontalAlignment='Center'
      selectedItemIndex={0}
    >
      {error && (
        <PageError
          displayError={String(error)}
        />
      )}
      {(!error && loading) && (
        <PageLoading/>
      )}
      {(!error && !loading) && (
        <>
          {
            //? Set Details Page Header
          }
          <SetDetailsPageHeader
            set={revisionController.set}
            windowSize={windowSize}
          >
            <></>
          </SetDetailsPageHeader>
          <Divider/>
          {
            //? Flashcard Viewer
          }
          {(loadingFlashcards && revisionController.flashcards.length === 0 && revisionController.getHiddenCardUUIDs().length === 0) && (
            <div className='flashcard-reviser-loading-cards'>
              <ProgressSpinner/>
            </div>
          )}
          {(!loadingFlashcards && revisionController.flashcards.length === 0 && revisionController.getHiddenCardUUIDs().length !== 0) && (
            <div>
              <i style={{
                color: commonColors.Yellow,
              }}>
                <b>All flashcards have been hidden. Please un-hide some flashcards!</b>
              </i>
              <br/><br/>
              {viewHiddenCardsButton}
            </div>
          )}
          {(!loadingFlashcards && revisionController.flashcards.length > 0) && 
            renderFlashcard(revisionController.flashcards[revisionController.currentFlashcardIndex])}
          {
            //? Hidden Cards Dialogue Box
          }
          <HiddenFlashcardsDialogue
            revisionController={revisionController}
          />
        </>
      )}
    </ToolBarPage>
  );
};

export default ReviseFlashcardsPage;
