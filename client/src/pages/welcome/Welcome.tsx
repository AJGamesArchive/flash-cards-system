// Imports
import './Welcome.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import commonColors from '../../static/Colors';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';

/**
 * React function to render the welcome page
 * @returns WelcomePage Component
 */
const WelcomePage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();

  // Return JSX
  return (
    <ToolBarPage
      toastRef={toast}
      pageDirection='Column'
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={1}
    >
      {windowSize.width > 768 && <h1>Welcome, {localStorage.getItem('fc-username')}!</h1>}
      {windowSize.width <= 768 && <h2>Welcome, {localStorage.getItem('fc-username')}!</h2>}
      <b style={{
        fontSize:
          (windowSize.width > 768)
            ? '1.5rem'
            : '1rem',
      }}>
        Rank:
      </b>
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
        {(localStorage.getItem('fc-admin') === 'true') ? ' Admin' : ' User'}
      </b>
      <b style={{
        fontSize:
          (windowSize.width > 768)
            ? '1.5rem'
            : '1rem',
      }}>
        User ID:
      </b>
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
        {localStorage.getItem('fc-uuid')}
      </b>
      <br/><br/>
      <div>
        <Button
          label='Edit Account'
          icon='pi pi-user-edit'
          severity='help'
          onClick={() => toast.current?.show({ //TODO Implement this time permitting
            severity: 'info',
            summary: 'Feature Not Implemented Yet',
            closable: false,
            life: 3000,
          })}
          raised
        />
      </div>
    </ToolBarPage>
  );
};

export default WelcomePage;
