// Imports
import './MySets.css';
import ToolBarPage from '../../components/tool-bar-page/ToolBarPage';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';

/**
 * React function to render the my sets page
 * @returns MySetsPage Component
 */
const MySetsPage: React.FC = () => {
  // Page hooks
  const windowSize: WindowSize = useWindowSize();

  // Return JSX
  return (
    <ToolBarPage
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
    </ToolBarPage>
  );
};

export default MySetsPage;
