// Core Imports
import React from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import commonColors from '../../static/Colors';

// Component Props Interface
interface PageScrollToTopProps {
  color: 'BgDarkBlue' | 'BgBlue' | 'BgLightBlue';
};

/**
 * React function to render the page loading component
 * @returns PageLoading Component
 */
const PageScrollToTop: React.FC<PageScrollToTopProps> = ({
  color,
}) => {
  // Return JSX
  return <ScrollTop 
    style={{
      background: 
        color === 'BgDarkBlue'
          ? commonColors.BackgroundDarkBlue :
        color === 'BgLightBlue'
          ? commonColors.BackgroundLightBlue
          : commonColors.BackgroundBlue,
      borderRadius: '45px',
    }}
    icon='pi pi-arrow-up'
  />
};

export default PageScrollToTop;
