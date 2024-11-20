// Imports
import './Login.css';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { MenuItem } from 'primereact/menuitem';
import commonColors from '../../static/Colors';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import build from '../../static/Build';
import { PanelMenu } from 'primereact/panelmenu';

/**
 * React function to render the login page
 * @returns LoginPage Component
 */
const LoginPage: React.FC = () => {
  // Page refs
  const toast = useRef<Toast>(null);

  // Page hooks
  const windowSize: WindowSize = useWindowSize();

  // Const to define the login options menu options
  const menuOptions: MenuItem[] = [
    {
      label: "Login",
      icon: "pi pi-sign-in",
      items: [
        {
          label: "User Login",
          icon: "pi pi-user",
          command: () => {},
        },
        {
          label: "Generate API Key",
          icon: "pi pi-key",
          command: () => {},
        },
      ]
    },
    {
      label: "Help",
      icon: "pi pi-question-circle",
      items: [
        {
          label: "Forgot Password",
          icon: "pi pi-question-circle",
          command: () => {},
        },
      ]
    },
  ];
  
  // Return JSX
  return (
    <>
      <Toast ref={toast}/>
      {
        //? Core Login Panel
      }
      <div
        className='login-panel-core'
        style={{
          backgroundColor: commonColors.BackgroundBlue,
          borderColor: commonColors.BackgroundDarkBlue,
        }}
      >
        {
          //? Left / Top Section - Logo
        }
        <div
          className={
            windowSize.width > 768
              ? "login-panel-left-div"
              : "login-panel-top-div"
          }
        >
          <img 
            src="vite.svg"
            className='login-panel-logo'
          />
        </div>
        {
          //? Right / Button Section - Login Menu
        }
        <div
          className={
            windowSize.width > 768
              ? "login-panel-right-div"
              : "login-panel-button-div"
          }
        >
          <h1>
            Welcome!
          </h1>
          <h4>
            Please login:
          </h4>
          <PanelMenu 
            className='login-panel'
            model={menuOptions}
          />
        </div>
      </div>
      {
        //? App Build Number
      }
      <div
        className={
          windowSize.width > 768
            ? "build-number"
            : "build-number-mobile"
        }
      >
        <p>
          <i className='pi pi-book'/> TestVar Flashcards - Build {build}
        </p>
      </div>
    </>
  );
};

export default LoginPage;
