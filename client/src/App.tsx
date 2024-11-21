// Imports
import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuthListener, { UseAuthListenerHook } from './hook/auth/UseAuthListener';
import PageError from './components/core/PageError';
import PageLoading from './components/core/PageLoading';
import LoginPage from './pages/login/Login';
import WelcomePage from './pages/welcome/Welcome';

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
  if(authListener.runningCheck) return <PageLoading/>;
  if(!authListener.allowAccess) return (
    <PageError
      displayError='You are not logged in, please login!'
      notLoggedIn
    />
  );
  return (
    <Routes>
      <Route path="/" Component={LoginPage}/>
      <Route path="/login" Component={LoginPage}/>
      <Route path="/welcome" Component={WelcomePage}/>
    </Routes>
  );
};

export default App;
