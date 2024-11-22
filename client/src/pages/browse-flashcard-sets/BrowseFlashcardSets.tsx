// Imports
import './BrowseFlashcardSets.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';
import useAllSets, { UseAllSetsHook } from '../../hook/browse-flashcard-sets/UseAllSets';
import ErrorWatch from '../../types/core/ErrorWatch';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';

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
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={2}
    >
      {windowSize.width > 768 && <h1>Browse Flashcard Sets</h1>}
      {windowSize.width <= 768 && <h2>Browse Flashcard Sets</h2>}
      <b style={{
        fontSize:
          (windowSize.width > 768)
            ? '1.5rem'
            : '1rem',
        color:
          (localStorage.getItem('fc-admin') === 'true')
            ? commonColors.Green
            : commonColors.Yellow
      }}>
        {localStorage.getItem('fc-username')}
      </b>
      <pre>
        Loading: {JSON.stringify(loading, null, 2)}<br/>
        Error: {JSON.stringify(error, null, 2)}<br/>
        Sets: {JSON.stringify(allSetsController.allSets, null, 2)}
      </pre>
    </ToolBarPage>
  );
};

export default BrowseFlashcardSetsPage;
