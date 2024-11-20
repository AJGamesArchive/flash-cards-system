// Imports
import './BrowsSets.css';

/**
 * React function to render the brows sets page
 * @returns BrowsSetsPage Component
 */
const BrowsSetsPage: React.FC = () => {
  // Return JSX
  return (
    <>
      <h1>Welcome, {localStorage.getItem('fc-username')}</h1>
      <h2>API URL: {import.meta.env.API_URL}</h2>
    </>
  );
};

export default BrowsSetsPage;
