// Core Imports
import './SideBarItem.css';
import React from 'react';

// Component Props Interface
interface SideBarItemProps {
  itemName: string;
  icon: string;
  selected: boolean;
  logoutButton?: boolean;
  onClick?: () => void;
};

/**
 * React function to render the side bar item component
 * @returns SideBarItem Component
 */
const SideBarItem: React.FC<SideBarItemProps> = ({
  itemName,
  icon,
  selected,
  logoutButton,
  onClick,
}) => {
  // Return JSX
  return (
    <div
      className={`side-bar-item${selected ? ' selected' : ''}${logoutButton ? ' logout' : ''}`}
      onClick={onClick}
    >
      <b><i className={icon}/> {itemName}</b>
    </div>
  );
};

export default SideBarItem;
