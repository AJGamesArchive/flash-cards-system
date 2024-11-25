// Imports
import './MySets.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import useMySets, { UseMySetsHook } from '../../hook/my-sets/UseMySets';
import ErrorWatch from '../../types/core/ErrorWatch';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import SetCard from '../../components/global/SetCard';
import DeleteSetDialogue from '../../components/my-sets/DeleteSetDialogue';

/**
 * React function to render the my sets page
 * @returns MySetsPage Component
 */
const MySetsPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const mySetsController: UseMySetsHook = useMySets();

  // Event listeners
  const error: ErrorWatch = useErrorListener([
    mySetsController.mySetsRequest.error,
    mySetsController.castingError,
  ]);
  const loading: boolean = useLoadingListener([
    mySetsController.mySetsRequest.loading,
  ]);
  const disableButtons: boolean = useLoadingListener([
    mySetsController.deleteSetRequest.loading,
    mySetsController.preparingDeletion,
  ]);
  useToastListener(toast, [
    mySetsController.mySetsRequest.toast,
  ], ['success']);
  useToastListener(toast, [
    mySetsController.deleteSetRequest.toast,
  ], []);

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Top'
      pageHorizontalAlignment='Center'
      selectedItemIndex={4}
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
          <b className='my-sets-title' style={{
            fontSize:
              (windowSize.width > 768)
                ? '2rem'
                : '1.5rem'
          }}>
            My Sets
          </b>
          {
            //? Set Card mapping
          }
          <div className='my-sets-grid'>
            {mySetsController.mySets.map((set, index) => (
              <div key={index} className='my-sets-grid-item'>
                <SetCard set={set}>
                  <Button
                    icon='pi pi-play'
                    disabled={disableButtons}
                    outlined
                  />
                  <Button
                    icon='pi pi-pencil'
                    severity='info'
                    onClick={() => window.location.href = `/my-sets/sets-editor/${set.setUUID}`}
                    disabled={disableButtons}
                    outlined
                  />
                  <Button
                    icon='pi pi-comments'
                    severity='help'
                    onClick={() => window.location.href = `/sets/${set.setUUID}/reviews`}
                    disabled={disableButtons}
                    outlined
                  />
                  <Button
                    icon='pi pi-trash'
                    severity='danger'
                    onClick={() => mySetsController.selectSetForDeletion(set)}
                    disabled={disableButtons}
                    outlined
                  />
                </SetCard>
              </div>
            ))}
          </div>
          {
            //? Set Deletion Dialogue Box
          }
          <DeleteSetDialogue
            mySetsController={mySetsController}
          />
        </>
      )}
    </ToolBarPage>
  );
};

export default MySetsPage;

//* window.location.href = `/my-sets/sets-editor/new`
//* 