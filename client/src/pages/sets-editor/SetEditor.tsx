// Imports
import './SetEditor.css';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import SetsEditorParams from '../../interfaces/SetsEditorParams';
import useSetsEditorSetup, { UseSetsEditorSetupHook } from '../../hook/sets-editor/UseSetsEditorSetup';
import useSetsEditor, { UseSetsEditorHook } from '../../hook/sets-editor/UseSetsEditor';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import SetsEditor from '../../components/sets-editor/SetEditor';

/**
 * React function to render the sets editor page
 * @returns SetsEditorPage Component
 */
const SetsEditorPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const params = useParams<SetsEditorParams>();
  const editorSetup: UseSetsEditorSetupHook = useSetsEditorSetup(params.setUUID);
  const editorController: UseSetsEditorHook = useSetsEditor((params.setUUID === 'new'), editorSetup.editorData);
  const error: ErrorWatch = useErrorListener([
    editorSetup.setRequest.error,
    editorSetup.cardsRequest.error,
    editorSetup.castingErrors.set,
    editorSetup.castingErrors.cards,
  ]);
  const loading: boolean = useLoadingListener([
    editorSetup.preparing,
    !editorController.setData,
    !editorController.flashcardData,
    editorController.awaitPageReturn,
  ]);
  useToastListener(toast, [
    editorController.editorToast,
    editorController.createRequest.toast,
    editorController.updateRequest.toast,
  ], []);

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
        <SetsEditor
          windowSize={windowSize}
          editorController={editorController}
        />
      )}
    </ToolBarPage>
  );
};

export default SetsEditorPage;
