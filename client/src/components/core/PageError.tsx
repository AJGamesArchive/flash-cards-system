// Core Imports
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import RefreshButton from './RefreshButton';
import BackButton from './BackButton';
import commonColors from '../../static/Colors';

// Component Props Interface
interface PageErrorProps {
  displayError: string;
  toast: RefObject<Toast>;
};

/**
 * React function to render the page error component
 * @returns PageError Component
 */
const PageError: React.FC<PageErrorProps> = ({
  displayError,
  toast
}) => {
  // Return JSX
  return (
    <div className='body-page-center' style={{
      minWidth: "100%",
      maxWidth: "800px",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Toast ref={toast}/>
      <div style={{
        color: commonColors.Red,
      }}>
        <i className='pi pi-exclamation-triangle' style={{
          fontSize: '100px'
        }}/>
      </div>
      <h1>Unexpected Error</h1>
      <h2>{displayError}</h2>
      <RefreshButton
        label="Try Again"
        icon="pi pi-refresh"
        severity='help'
        outlined
      />
      <BackButton
        label='Back To Portal'
        icon='pi pi-home'
        severity='secondary'
        backFactor={-1}
        outlined
      />
    </div>
  );
};

export default PageError;
