// Core Imports
import './LoginDialogue.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import useLoginController, { UseLoginControllerHook } from '../../hook/login/UseLoginController';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import ErrorWatch from '../../types/core/ErrorWatch';

// Component Props Interface
interface LoginDialogueProps {
  toast: RefObject<Toast>;
  visible: boolean;
  setVisible: (state: boolean) => void;
};

/**
 * React function to render the login form dialogue component
 * @returns LoginDialogue Component
 */
const LoginDialogue: React.FC<LoginDialogueProps> = ({
  toast,
  visible,
  setVisible,
}) => {
  // Component Hooks
  const loginController: UseLoginControllerHook = useLoginController(setVisible);
  const loading: boolean = useLoadingListener([
    loginController.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    loginController.apiError,
    loginController.castingError,
  ]);
  useToastListener(toast, [
    loginController.toastMessage,
  ], ['success']);

  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="login-dialogue-footer">
        <div className="login-dialogue-footer-button">
          <Button
            label="Cancel"
            disabled={loading}
            icon="pi pi-times"
            onClick={loginController.onDialogueHide}
            severity='secondary'
            raised
          />
        </div>
        <div className="login-dialogue-footer-button">
          <Button
            label="Login"
            loading={loading}
            icon="pi pi-sign-in"
            onClick={loginController.login}
            raised
          />
        </div>
      </div>
    </React.Fragment>
  );

  // Return JSX
  return (
    <Dialog 
      visible={visible} 
      resizable={false}
      draggable={false}
      closable={!loading}
      closeIcon='pi pi-times'
      focusOnShow={false}
      closeOnEscape={true}
      breakpoints={{ '1250px': '55vw', '1000px': '70vw', '820px': '75vw', '768px': '90vw', '400px': '95vw' }} 
      header='Login' 
      footer={footer} 
      onHide={loginController.onDialogueHide}
    >
      {
        //? Heading Text
      }
      <div className='login-dialogue-heading-text'>
        <b>Please enter your credentials:</b>
      </div>
      {
        //? Username Form Field
      }
      <div className="login-form-field">
        <label htmlFor="login-username">
          <b>Username</b>
        </label>
        <div className="p-inputgroup flex-1">
          <InputText 
            id="login-username"
            value={loginController.loginCredentials.username}
            name={'username'}
            onChange={loginController.saveInput}
            className={classNames({ 'p-invalid': loginController.apiError })}
            placeholder='Enter your Username'
            disabled={loginController.loading}
          />
        </div>
      </div>
      {
        //? Password Form Field
      }
      <div>
        <label htmlFor="login-password">
          <b>Password</b>
        </label>
        <div className="p-inputgroup flex-1">
          <Password 
            id="login-password"
            value={loginController.loginCredentials.password}
            name={'password'}
            onChange={loginController.saveInput}
            className={classNames({ 'p-invalid': loginController.apiError })}
            placeholder='Enter your Password'
            feedback={false}
            disabled={loginController.loading}
          />
        </div>
      </div>
      {
        //? Output any errors returned by the API
      }
      {(error) && (
        <div className="p-error" style={{
          textAlign: 'center',
          paddingTop: '10px',
        }}>
          <b>{error}</b>
        </div>
      )}
    </Dialog>
  );
};

export default LoginDialogue;
