// Imports
import './Welcome.css';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import commonColors from '../../static/Colors';

/**
 * React function to render the welcome page
 * @returns WelcomePage Component
 */
const WelcomePage: React.FC = () => {
  // Return JSX
  return (
    <ToolBarPage
      pageDirection='Column'
      pageVerticalAlignment='Center'
      pageHorizontalAlignment='Center'
      selectedItemIndex={1}
    >
      <h1>Welcome, {localStorage.getItem('fc-username')}!</h1>
      <b style={{
        fontSize: '1.5rem',
      }}>
        Rank:
        <b style={{
          color:
            (localStorage.getItem('fc-admin') === 'true')
              ? commonColors.Green
              : commonColors.Yellow
        }}>
          {(localStorage.getItem('fc-admin') === 'true') ? ' Admin' : ' User'}
        </b>
      </b>
      <b style={{
        fontSize: '1.5rem',
      }}>
        User ID:
        <b style={{
          color:
            (localStorage.getItem('fc-admin') === 'true')
              ? commonColors.Green
              : commonColors.Yellow
        }}>
          {` ${localStorage.getItem('fc-uuid')}`}
        </b>
      </b>
    </ToolBarPage>
  );
};

export default WelcomePage;
