// Core Imports
import './ToolBarPage.css';
import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import WindowSize from '../../types/core/WindowSize';
import useWindowSize from '../../hook/core/UseWindowSize';
import commonColors from '../../static/Colors';
import SideBarItem from './SideBarItem';
import TopBarItem from './TopBarItem';
import toolBarPageMenuItems from '../../static/ToolBarPageMenuItems';
import useLogoutHandler, { UseLogoutHandlerHook } from '../../hook/tool-bar-page/UseLogoutHandler';

//TODO Implement the page scroll to top component in both children divs if time permits

// Component Props Interface
interface ToolBarPageProps {
  children: React.ReactNode;
  toastRef?: RefObject<Toast>;
  pageDirection: 'Row' | 'Column';
  pageVerticalAlignment: 'Bottom' | 'Center' | 'Top';
  pageHorizontalAlignment: 'Left' | 'Center' | 'Right';
  selectedItemIndex: number;
};

/**
 * React function to render the toolbar page template component
 * @returns ToolBarPage Component
 */
const ToolBarPage: React.FC<ToolBarPageProps> = ({
  children,
  pageDirection,
  toastRef,
  pageVerticalAlignment,
  pageHorizontalAlignment,
  selectedItemIndex,
}) => {
  // Page hooks
  const windowSize: WindowSize = useWindowSize();
  const logoutController: UseLogoutHandlerHook = useLogoutHandler();

  // Return Mobile JSX
  if(windowSize.width <= 870) return (
    <div 
      className='tool-bar-page-mobile'
      style={{
        width: `${windowSize.width - 1}px`,
        height: `${windowSize.height - 1}px`,
      }}
    >
      {
        //? Mobile Top Bar
      }
      <div
        className='tool-bar-page-mobile-top-bar'
        style={{
          backgroundColor: commonColors.BackgroundBlue,
        }}
      >
        <div className='tool-bar-page-mobile-top-bar-item-container'>
          {
            //? Company Logo
          }
          <img
            className='tool-bar-page-mobile-top-bar-icon'
            src="/vite.svg"
          />
          {
            //? Top Bar Menu Items Mapping
          }
          {toolBarPageMenuItems.map((item, index) => {
            if(item.itemName === 'Admin Settings' && localStorage.getItem('fc-admin') !== 'true') return;
            return (
            <div key={index}>
              <TopBarItem
                icon={item.icon}
                selected={selectedItemIndex === index + 1}
                onClick={(selectedItemIndex === index + 1) ? undefined : item.onCLick}
              />
            </div>
          )})}
        </div>
        <div className='tool-bar-page-mobile-top-bar-item-container'>
          <TopBarItem
            icon={logoutController.loading ? 'pi pi-circle' : 'pi pi-sign-out'}
            selected={logoutController.loading}
            onClick={logoutController.loading ? undefined : logoutController.logout}
            logoutButton
          />
        </div>
      </div>
      {
        //? Mobile Main Page
      }
      <div className='tool-bar-page-mobile-content'>
        {
          //? Page Content Passed As Children
        }
        <Toast ref={toastRef}/>
        {children}
      </div>
    </div>
  );
  // Return Desktop JSX
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
            src="/vite.svg"
          />
          {
            //? Side Bar Menu Items Mapping
          }
          {toolBarPageMenuItems.map((item, index) => {
            if(item.itemName === 'Admin Settings' && localStorage.getItem('fc-admin') !== 'true') return;
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
        <div className='tool-bar-page-side-bar-item-container'>
          <SideBarItem
            itemName='Logout'
            icon={logoutController.loading ? 'pi pi-circle' : 'pi pi-sign-out'}
            selected={logoutController.loading}
            onClick={logoutController.loading ? undefined : logoutController.logout}
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
        <Toast ref={toastRef}/>
        {children}
      </div>
    </div>
  );
};

export default ToolBarPage;
