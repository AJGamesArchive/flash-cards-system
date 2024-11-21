// Core Imports
import './CreateAccountDialogue.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import useAccountCreator, { UseAccountCreatorHook } from '../../hook/login/UseAccountCreator';
import useLoadingListener from '../../hook/core/UseLoadingListener';
import useToastListener from '../../hook/core/UseToastListener';
import useErrorListener from '../../hook/core/UseErrorListener';
import ErrorWatch from '../../types/core/ErrorWatch';

// Component Props Interface
interface CreateAccountDialogueProps {
  toast: RefObject<Toast>;
  visible: boolean;
  setVisible: (state: boolean) => void;
};

/**
 * React function to render the account creation form dialogue component
 * @returns CreateAccountDialogue Component
 */
const CreateAccountDialogue: React.FC<CreateAccountDialogueProps> = ({
  toast,
  visible,
  setVisible,
}) => {
  // Component Hooks
  const creationController: UseAccountCreatorHook = useAccountCreator(setVisible, false, false);
  const loading: boolean = useLoadingListener([
    creationController.loading,
  ]);
  const error: ErrorWatch = useErrorListener([
    creationController.apiError,
    creationController.passwordError,
  ]);
  useToastListener(toast, [
    creationController.toastMessage,
    creationController.missingDetailsToast,
  ]);

  // Template to define the footer of the dialogue box
  const footer = (
    <React.Fragment>
      <div className="account-create-dialogue-footer">
        <div className="account-create-dialogue-footer-button">
          <Button
            label="Cancel"
            disabled={loading}
            icon="pi pi-times"
            onClick={creationController.onDialogueHide}
            severity='secondary'
            raised
          />
        </div>
        <div className="account-create-dialogue-footer-button">
          <Button
            label="Create"
            loading={loading}
            icon="pi pi-plus"
            onClick={creationController.createAccount}
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
      header='Create an Account'
      footer={footer} 
      onHide={creationController.onDialogueHide}
    >
      {
        //? Heading Text
      }
      <div className='account-create-dialogue-heading-text'>
        <b>Please create a username and password::</b>
      </div>
      {
        //? Username Form Field
      }
      <div className="account-create-dialogue-form-field">
        <label htmlFor="account-create-username">
          <b>Username</b>
        </label>
        <div className="p-inputgroup flex-1">
          <InputText 
            id="account-create-username"
            value={creationController.accountDetails.username}
            name={'username'}
            onChange={creationController.saveInput}
            className={classNames({ 'p-invalid': creationController.apiError })}
            placeholder='Create a Username'
            disabled={loading}
          />
        </div>
      </div>
      {
        //? Password Form Field
      }
      <div className='account-create-dialogue-form-field'>
        <label htmlFor="account-create-password">
          <b>Password</b>
        </label>
        <div className="p-inputgroup flex-1">
          <Password 
            id="account-create-password"
            value={creationController.accountDetails.password}
            name={'password'}
            onChange={creationController.saveInput}
            className={classNames({ 'p-invalid': error })}
            placeholder='Create a Password'
            feedback={false}
            disabled={loading}
          />
        </div>
      </div>
      {
        //? Password Confirmation Form Field
      }
      <div className='account-create-dialogue-form-field'>
        <label htmlFor="account-create-password-confirm">
          <b>Confirm Password</b>
        </label>
        <div className="p-inputgroup flex-1">
          <Password 
            id="account-create-password-confirm"
            value={creationController.accountDetails.confirmPassword}
            name={'confirmPassword'}
            onChange={creationController.saveInput}
            className={classNames({ 'p-invalid': error })}
            placeholder="Confirm you're Password"
            feedback={false}
            disabled={loading}
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

export default CreateAccountDialogue;
