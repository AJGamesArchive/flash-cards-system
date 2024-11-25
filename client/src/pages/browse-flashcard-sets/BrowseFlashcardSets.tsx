// Imports
import './BrowseFlashcardSets.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import useAllSets, { UseAllSetsHook } from '../../hook/browse-flashcard-sets/UseAllSets';
import ErrorWatch from '../../types/core/ErrorWatch';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import DebugBlock from '../../components/core/DebugBlock';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import SetCard from '../../components/global/SetCard';
import { Button } from 'primereact/button';

/**
 * React function to render the browse flashcard sets page
 * @returns BrowseFlashcardSetsPage Component
 */
const BrowseFlashcardSetsPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const allSetsController: UseAllSetsHook = useAllSets();

  // Event listeners
  const error: ErrorWatch = useErrorListener([
    allSetsController.allSetsRequest.error,
    allSetsController.castingError,
  ]);
  const loading: boolean = useLoadingListener([
    allSetsController.allSetsRequest.loading,
  ]);
  useToastListener(toast, [
    allSetsController.allSetsRequest.toast,
  ], ['success']);

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Top'
      pageHorizontalAlignment='Center'
      selectedItemIndex={2}
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
            //? Set Editor Title
          }
          <b className='browse-sets-title' style={{
            fontSize:
              (windowSize.width > 768)
                ? '2rem'
                : '1.5rem'
          }}>
            Browse All Sets
          </b>
          {
            //? Set Card mapping
          }
          <div className='browse-sets-grid'>
            {allSetsController.allSets.map((set, index) => (
              <div key={index} className='browse-sets-grid-item'>
                <SetCard set={set}>
                  <Button
                    icon='pi pi-play'
                    onClick={() => window.location.href = `/revise-flashcards/${set.setUUID}/shuffle`}
                    outlined
                  />
                  <Button
                    icon='pi pi-bookmark'
                    severity='info'
                    outlined
                  />
                  <Button
                    icon='pi pi-comments'
                    severity='help'
                    onClick={() => window.location.href = `/sets/${set.setUUID}/reviews`}
                    outlined
                  />
                </SetCard>
              </div>
            ))}
          </div>
          {
            //! Debug Block - Remove later
          }
          <DebugBlock>
            Loading: {JSON.stringify(loading, null, 2)}<br/>
            Error: {JSON.stringify(error, null, 2)}<br/>
            Sets: {JSON.stringify(allSetsController.allSets, null, 2)}
          </DebugBlock>
        </>
      )}
    </ToolBarPage>
  );
};

export default BrowseFlashcardSetsPage;
