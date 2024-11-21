// Core Imports
import './TopBarItem.css';
import React from 'react';

// Component Props Interface
interface TopBarItemProps {
  icon: string;
  selected: boolean;
  logoutButton?: boolean;
  onClick?: () => void;
};

/**
 * React function to render the top bar item component
 * @returns TopBarItem Component
 */
const TopBarItem: React.FC<TopBarItemProps> = ({
  icon,
  selected,
  logoutButton,
  onClick,
}) => {
  // Return JSX
  return (
    <div
      className={`top-bar-item${selected ? ' selected' : ''}${logoutButton ? ' logout' : ''}`}
      onClick={onClick}
    >
      <i className={icon}/>
    </div>
  );
};

export default TopBarItem;
