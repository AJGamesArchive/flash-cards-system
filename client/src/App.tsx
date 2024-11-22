// Imports
import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuthListener, { UseAuthListenerHook, AuthStates } from './hook/auth/UseAuthListener';
import PageError from './components/core/PageError';
import PageLoading from './components/core/PageLoading';
import LoginPage from './pages/login/Login';
import WelcomePage from './pages/welcome/Welcome';
import BrowseFlashcardSetsPage from './pages/browse-flashcard-sets/BrowseFlashcardSets';
import MySetsPage from './pages/my-sets/MySets';
import SetsEditorPage from './pages/my-sets/SetEditor';
import MyCollectionsPage from './pages/my-collections/MyCollections';
import ViewHiddenFlashcardsPage from './pages/view-hidden-flashcards/ViewHiddenFlashcards';
import AccountSettingsPage from './pages/account-settings/AccountSettings';
import AdminPage from './pages/admin/Admin';

/**
 * React function to render the core APP and handle app routing
 */
const App: React.FC = () => {
  // Core Hooks
  const authListener: UseAuthListenerHook = useAuthListener();

  // Set default root page CSS class upon render
  useEffect(() => {
    document.body.classList.add('body-page-center');
  }, []);

  // Return JSX
  if(authListener.authState === AuthStates.Forbidden) {
    return (
      <PageError
        displayError='You are not logged in, please login!'
        notLoggedIn
      />
    );
  } else if(authListener.authState === AuthStates.Permitted) {
    return (
      <Routes>
        <Route path="/" Component={LoginPage}/>
        <Route path="/login" Component={LoginPage}/>
        <Route path="/welcome" Component={WelcomePage}/>
        <Route path="/browse-flashcard-sets" Component={BrowseFlashcardSetsPage}/>
        <Route path="/my-sets" Component={MySetsPage}/>
        <Route path="/my-sets/sets-editor/:setUUID" Component={SetsEditorPage}/>
        <Route path="/my-collections" Component={MyCollectionsPage}/>
        <Route path="/view-hidden-flashcards" Component={ViewHiddenFlashcardsPage}/>
        <Route path="/account-settings" Component={AccountSettingsPage}/>
        <Route path="/admin-panel" Component={AdminPage}/>
      </Routes>
    );
  } else {
    return (
      <PageLoading/>
    );
  };
};

export default App;
