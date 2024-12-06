// Imports
import './Admin.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import useAdminConfig, { UseAdminConfigHook } from '../../hook/admin/UseAdminConfig';
import ErrorWatch from '../../types/core/ErrorWatch';
import useErrorListener from '../../hook/core/UseErrorListener';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import PageLoading from '../../components/core/PageLoading';
import PageError from '../../components/core/PageError';
import SetCreationLimitCard from '../../components/system-config/SetCreationLimitCard';

/**
 * React function to render the admin page
 * @returns AdminPage Component
 */
const AdminPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const adminConfigHandler: UseAdminConfigHook = useAdminConfig();
  const pageError: ErrorWatch = useErrorListener([
    adminConfigHandler.getSetCreationConfig.apiError,
    adminConfigHandler.getSetCreationConfig.castingError,
  ]);
  const pageLoading: boolean = useLoadingListener([
    adminConfigHandler.getSetCreationConfig.loading,
  ]);
  const loadingRequest: boolean = useLoadingListener([
    adminConfigHandler.updateSetCreationLimitRequest.loading,
    adminConfigHandler.resetCreationCounterRequest.loading,
  ]);
  useToastListener(toast, [
    adminConfigHandler.getSetCreationConfig.toast,
  ], ['success']);
  useToastListener(toast, [
    adminConfigHandler.updateSetCreationLimitRequest.toast,
    adminConfigHandler.resetCreationCounterRequest.toast,
  ], []);

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={6}
    >
      {pageError && (
        <PageError
          displayError={String(pageError)}
        />
      )}
      {(!pageError && pageLoading) && (
        <PageLoading/>
      )}
      {(!pageError && !pageLoading) && (
        <>
          {
            //? Page Content
          }
          <SetCreationLimitCard
            windowSize={windowSize}
            adminConfigHandler={adminConfigHandler}
            loading={loadingRequest}
          />
        </>
      )}
    </ToolBarPage>
  );
};

export default AdminPage;
