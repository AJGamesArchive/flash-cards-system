// Imports
import './CollectionSets.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';
import CollectionSetsParams from '../../interfaces/CollectionSetsParams';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import useToastListener from '../../hook/core/UseToastListener';
import ErrorWatch from '../../types/core/ErrorWatch';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import commonColors from '../../static/Colors';
import SetCard from '../../components/global/SetCard';
import { Button } from 'primereact/button';
import TripleButton from '../../components/core/TripleButton';
import useCollectionSets, { UseCollectionSetsHook } from '../../hook/collection-sets/UseCollectionSets';

/**
 * React function to render the collection sets page
 * @returns CollectionSetsPage Component
 */
const CollectionSetsPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const params = useParams<CollectionSetsParams>();
  const windowSize: WindowSize = useWindowSize();
  const collectionSetsHandler: UseCollectionSetsHook = useCollectionSets(
    params.collectionUUID ?? ''
  );
  const loading: boolean = useLoadingListener([
    collectionSetsHandler.setsRequest.loading,
  ]);
  const removingSet: boolean = useLoadingListener([
    collectionSetsHandler.removeRequest.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    collectionSetsHandler.setsRequest.apiError,
    collectionSetsHandler.setsRequest.castingError,
  ]);
  useToastListener(toast, [
    collectionSetsHandler.setsRequest.toast,
  ], ['success']);
  useToastListener(toast, [
    collectionSetsHandler.removeRequest.toast,
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
        <>
          {
            //? Collection Sets Page Title
          }
          <b className='collection-sets-title' style={{
            color: commonColors.Green,
            fontSize:
              (windowSize.width > 768)
                ? '2rem'
                : '1.5rem'
          }}>
            {params.collectionName ?? '[Error: 404]'}
          </b>
          {collectionSetsHandler.sets.length === 0 && (
            <b style={{
              color: commonColors.BluePurple,
            }}>
              <i>You have no sets in this collection. Please add some sets and come back!</i>
            </b>
          )}
          {
            //? Set Mappings
          }
          <div className='collection-sets-grid'>
            {collectionSetsHandler.sets.map((set, index) => (
              <div key={index} className='collection-sets-grid-item'>
                <SetCard
                  set={set}
                >
                  <Button
                    icon='pi pi-play'
                    onClick={() => window.location.href = `/revise-flashcards/${set.setUUID}/shuffle`}
                    outlined
                  />
                  <TripleButton
                    icon='pi pi-bookmark-fill'
                    severity='info'
                    onTripleClick={() => collectionSetsHandler.removeFromCollection(set.setUUID)}
                    disabled={removingSet}
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
        </>
      )}
    </ToolBarPage>
  );
};

export default CollectionSetsPage;
