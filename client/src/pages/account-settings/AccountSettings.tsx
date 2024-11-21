// Imports
import './AccountSettings.css';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';

/**
 * React function to render the account settings page
 * @returns AccountSettingsPage Component
 */
const AccountSettingsPage: React.FC = () => {
  // Page hooks
  const windowSize: WindowSize = useWindowSize();

  // Return JSX
  return (
    <ToolBarPage
      pageDirection='Column'
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={6}
    >
      {windowSize.width > 768 && <h1>Account Settings</h1>}
      {windowSize.width <= 768 && <h2>Account Settings</h2>}
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
    </ToolBarPage>
  );
};

export default AccountSettingsPage;
