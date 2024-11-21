// Imports
import './Welcome.css';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import commonColors from '../../static/Colors';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';

/**
 * React function to render the welcome page
 * @returns WelcomePage Component
 */
const WelcomePage: React.FC = () => {
  // Page hooks
  const windowSize: WindowSize = useWindowSize();

  // Return JSX
  return (
    <ToolBarPage
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
    </ToolBarPage>
  );
};

export default WelcomePage;
