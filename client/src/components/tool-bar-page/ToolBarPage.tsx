// Core Imports
import './ToolBarPage.css';
import React from 'react';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';
import SideBarItem from './SideBarItem';
import toolBarPageMenuItems from '../../static/ToolBarPageMenuItems';

// Component Props Interface
interface ToolBarPageProps {
  children: React.ReactNode;
  pageDirection: 'Row' | 'Column';
  pageVerticalAlignment: 'Bottom' | 'Center' | 'Top';
  pageHorizontalAlignment: 'Left' | 'Center' | 'Right';
  selectedItemIndex: number;
};

//TODO Make this component fully mobile compatible time permitting
//TODO Implement the logout button with API integration

/**
 * React function to render the toolbar page template component
 * @returns ToolBarPage Component
 */
const ToolBarPage: React.FC<ToolBarPageProps> = ({
  children,
  pageDirection,
  pageVerticalAlignment,
  pageHorizontalAlignment,
  selectedItemIndex,
}) => {
  // Page hooks
  const windowSize: WindowSize = useWindowSize();

  // Return JSX
  return (
    <div 
      className='tool-bar-page'
      style={{
        width: `${windowSize.width - 1}px`,
        height: `${windowSize.height - 1}px`,
      }}
    >
      {
        //? Desktop Side Bar
      }
      <div 
        className='tool-bar-page-side-bar'
        style={{
          backgroundColor: commonColors.BackgroundBlue,
        }}
      >
        <div className='tool-bar-page-side-bar-item-container'>
          {
            //? Company Logo
          }
          <img
            className='tool-bar-page-side-bar-icon'
            src="vite.svg"
          />
          {
            //? Side Bar Menu Items Mapping
          }
          {toolBarPageMenuItems.map((item, index) => {
            if(item.itemName === 'Admin' && localStorage.getItem('fc-admin') !== 'true') return;
            return (
            <div key={index}>
              <SideBarItem
                itemName={item.itemName}
                icon={item.icon}
                selected={selectedItemIndex === index + 1}
                onClick={(selectedItemIndex === index + 1) ? undefined : item.onCLick}
              />
            </div>
          )})}
        </div>
        <div style={{ width: '100%' }}>
          <SideBarItem
            itemName='Logout'
            icon='pi pi-sign-out'
            selected={false}
            onClick={() => {}} 
            logoutButton
          />
        </div>
      </div>
      {
        //? Desktop Main Page
      }
      <div 
        className='tool-bar-page-content'
        style={{
          flexDirection: 
            (pageDirection === 'Row')
              ? 'row'
              : 'column',
          justifyContent:
            (pageVerticalAlignment === 'Top')
              ? 'start' :
            (pageVerticalAlignment === 'Center')
              ? 'center'
              : 'end',
          alignItems:
            (pageHorizontalAlignment === 'Left')
              ? 'start' :
            (pageHorizontalAlignment === 'Center')
              ? 'center'
              : 'end',
        }}
      >
        {
          //? Page Content Passed As Children
        }
        {children}
      </div>
    </div>
  );
};

export default ToolBarPage;
