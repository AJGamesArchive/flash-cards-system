// Imports
import './App.css';
import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuthListener, { UseAuthListenerHook, AuthStates } from './hook/auth/UseAuthListener';
import PageError from './components/core/PageError';
import PageLoading from './components/core/PageLoading';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/login/Login'));
const WelcomePage = lazy(() => import('./pages/welcome/Welcome'));
const BrowseFlashcardSetsPage = lazy(() => import('./pages/browse-flashcard-sets/BrowseFlashcardSets'));
const MySetsPage = lazy(() => import('./pages/my-sets/MySets'));
const SetsEditorPage = lazy(() => import('./pages/sets-editor/SetEditor'));
const SetReviewsPage = lazy(() => import('./pages/set-reviews/SetReviews'));
const ReviseFlashcardsPage = lazy(() => import('./pages/revise-flashcards/ReviseFlashcards'));
const MyCollectionsPage = lazy(() => import('./pages/my-collections/MyCollections'));
const CollectionSetsPage = lazy(() => import('./pages/collection-sets/CollectionSets'));
const ViewHiddenFlashcardsPage = lazy(() => import('./pages/view-hidden-flashcards/ViewHiddenFlashcards'));
const AdminPage = lazy(() => import('./pages/admin/Admin'));

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
      <Suspense fallback={<PageLoading/>}>
        <Routes>
          <Route path="/" Component={LoginPage}/>
          <Route path="/login" Component={LoginPage}/>
          <Route path="/welcome" Component={WelcomePage}/>
          <Route path="/browse-flashcard-sets" Component={BrowseFlashcardSetsPage}/>
          <Route path="/my-sets" Component={MySetsPage}/>
          <Route path="/my-sets/sets-editor/:setUUID" Component={SetsEditorPage}/>
          <Route path="/sets/:setUUID/reviews" Component={SetReviewsPage}/>
          <Route path="/revise-flashcards/:setUUID/:query" Component={ReviseFlashcardsPage}/>
          <Route path="/my-collections" Component={MyCollectionsPage}/>
          <Route path="/my-collections/:collectionUUID/:collectionName/sets" Component={CollectionSetsPage}/>
          <Route path="/view-hidden-flashcards" Component={ViewHiddenFlashcardsPage}/>
          <Route path="/admin-panel" Component={AdminPage}/>
        </Routes>
      </Suspense>
    );
  } else {
    return (
      <PageLoading/>
    );
  };
};

export default App;
