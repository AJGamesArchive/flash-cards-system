// Core Imports
import React from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import commonColors from '../../static/Colors';

// Component Props Interface
interface PageLoadingProps {
  color: 'BgDarkBlue' | 'BgLightBlue';
};

/**
 * React function to render the page loading component
 * @returns PageLoading Component
 */
const PageLoading: React.FC<PageLoadingProps> = ({
  color,
}) => {
  // Return JSX
  return <ScrollTop 
    style={{
      background: 
        color === 'BgDarkBlue'
          ? commonColors.BackgroundDarkBlue
          : commonColors.BackgroundLightBlue,
      borderRadius: '45px',
    }}
    icon='pi pi-arrow-up'
  />
};

export default PageLoading;
