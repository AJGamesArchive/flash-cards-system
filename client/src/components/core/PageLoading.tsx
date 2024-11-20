// Core Imports
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

// Component Props Interface
interface PageLoadingProps {
  toast?: RefObject<Toast>
};

/**
 * React function to render the page loading component
 * @returns PageLoading Component
 */
const PageLoading: React.FC<PageLoadingProps> = ({
  toast
}) => {
  // Return JSX
  return (
    <div className='body-page-center'>
      <Toast ref={toast}/>
      <ProgressSpinner/>
    </div>
  );
};

export default PageLoading;
