// Imports
import './SetEditor.css';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';
import SetsEditorParams from '../../interfaces/SetsEditorParams';
import useSetsEditorSetup, { UseSetsEditorSetupHook } from '../../hook/my-sets/UseSetsEditorSetup';
import useSetsEditor, { UseSetsEditorHook } from '../../hook/my-sets/UseSetsEditor';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';

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
  const editorController: UseSetsEditorHook = useSetsEditor(editorSetup.editorData);
  const error: ErrorWatch = useErrorListener([
    editorSetup.setRequest.error,
    editorSetup.cardsRequest.error,
    editorSetup.castingErrors.set,
    editorSetup.castingErrors.cards,
  ]);
  const loading: boolean = useLoadingListener([
    editorSetup.preparing,
    !editorController.data,
  ]);
  useToastListener(toast, [], []);

  // Data loading template
  const pageLoading: JSX.Element = (
    <PageLoading/>
  );

  // Data error template
  const pageError: JSX.Element = (
    <PageError
      displayError={String(error)}
    />
  );

  // Page Content template
  const pageContent: JSX.Element = (
    <>
      {windowSize.width > 768 && <h1>Sets Editor</h1>}
      {windowSize.width <= 768 && <h2>Sets Editor</h2>}
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
        Params: {JSON.stringify(params, null, 2)}
      </pre>
    </>
  );

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={0}
    >
      <>
        {error && pageError}
        {(!error && loading) && pageLoading}
        {(!error && !loading) && pageContent}
      </>
    </ToolBarPage>
  );
};

export default SetsEditorPage;
