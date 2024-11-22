// Imports
import './MySets.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';
import useMySets, { UseMySetsHook } from '../../hook/my-sets/UseMySets';
import ErrorWatch from '../../types/core/ErrorWatch';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';

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
  useToastListener(toast, [
    mySetsController.mySetsRequest.toast,
  ], ['success']);

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={3}
    >
      {windowSize.width > 768 && <h1>My Sets</h1>}
      {windowSize.width <= 768 && <h2>My Sets</h2>}
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
      <Button
        label='Create Set'
        icon='pi pi-plus'
        onClick={() => window.location.href = `/my-sets/sets-editor/new`}
        outlined
      />
      <pre>
        Loading: {JSON.stringify(loading, null, 2)}<br/>
        Error: {JSON.stringify(error, null, 2)}<br/>
        Sets: {JSON.stringify(mySetsController.mySets, null, 2)}
      </pre>
    </ToolBarPage>
  );
};

export default MySetsPage;
