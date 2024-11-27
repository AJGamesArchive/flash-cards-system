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
import DebugBlock from '../../components/core/DebugBlock';
import useFlashcardReviser, { UseFLashcardReviserHook } from '../../hook/revise-flashcards/UseFlashcardReviser';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import useToastListener from '../../hook/core/UseToastListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import FlashcardCard from '../../components/revise-flashcards/FlashcardCard';

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

  // Flashcard Render Template
  const renderFlashcard = (flashcard: Flashcard) => (
    <FlashcardCard
      flashcard={flashcard}
      flipped={revisionController.cardFlipped}
      onFlipped={revisionController.flipCard}
      onRefresh={() => {}}
      onHide={() => {}}
    />
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
          {revisionController.flashcards.length === 0 && (
            <ProgressSpinner/>
          )}
          {revisionController.flashcards.length > 0 && 
            renderFlashcard(revisionController.flashcards[revisionController.currentFlashcardIndex])}
          {
            //! Debug Block - Remove Later
          }
          <DebugBlock>
            Params: {JSON.stringify(params, null, 2)}<br/>
            Current Flashcard Index: {JSON.stringify(revisionController.currentFlashcardIndex, null, 2)}<br/>
            Card Flipped: {JSON.stringify(revisionController.cardFlipped, null, 2)}<br/>
            Set: {JSON.stringify(revisionController.set, null, 2)}<br/>
            FLashcards: {JSON.stringify(revisionController.flashcards, null, 2)}<br/>
            Hidden Cards: {JSON.stringify(revisionController.hiddenCards, null, 2)}<br/>
          </DebugBlock>
        </>
      )}
    </ToolBarPage>
  );
};

export default ReviseFlashcardsPage;
