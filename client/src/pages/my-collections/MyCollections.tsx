// Imports
import './MyCollections.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import useMyCollections, { UseMyCollectionsHook } from '../../hook/my-collections/UseMyCollections';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import useToastListener from '../../hook/core/UseToastListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import DebugBlock from '../../components/core/DebugBlock';
import commonColors from '../../static/Colors';
import CollectionEditorDialogue from '../../components/my-collections/CollectionEditorDialogue';

/**
 * React function to render the my collections page
 * @returns MyCollectionsPage Component
 */
const MyCollectionsPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const myCollectionHandler: UseMyCollectionsHook = useMyCollections();
  const loading: boolean = useLoadingListener([
    myCollectionHandler.myCollectionsRequest.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    myCollectionHandler.myCollectionsRequest.apiError,
    myCollectionHandler.myCollectionsRequest.castingError,
  ]);
  useToastListener(toast, [
    myCollectionHandler.myCollectionsRequest.toast,
  ], ['success', 'info']);

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Top'
      pageHorizontalAlignment='Center'
      selectedItemIndex={5}
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
            //? Collection Page Title
          }
          <b className='my-collections-title' style={{
            fontSize:
              (windowSize.width > 768)
                ? '2rem'
                : '1.5rem'
          }}>
            My Collections
          </b>
          {myCollectionHandler.myCollections.length === 0 && (
            <b style={{
              color: commonColors.BluePurple,
            }}>
              <i>You have no collections. Please create some collections and come back!</i>
            </b>
          )}
          {
            //? Collection Editor Dialogue
          }
          <CollectionEditorDialogue
            toast={toast}
            visible={false}
            setVisible={() => {}}
            newCollectionFlag={false}
            collectionName={''}
            collectionDescription={''}
          />
          {
            //! Debug Block - Remove Later
          }
          <DebugBlock>
            Collections: {JSON.stringify(myCollectionHandler.myCollections, null, 2)}<br/>
          </DebugBlock>
        </>
      )}
    </ToolBarPage>
  );
};

export default MyCollectionsPage;
