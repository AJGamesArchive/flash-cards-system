// Core Imports
import React from 'react';
import { Button } from 'primereact/button';

// Component Props Interface
interface RefreshButtonProps {
  label?: string;
  icon?: string;
  severity?: 'help' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  outlined?: boolean;
  raised?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
};

/**
 * React function to render the refresh button component
 * @returns RefreshButton Component
 */
const RefreshButton: React.FC<RefreshButtonProps> = ({
  label,
  icon,
  severity,
  outlined,
  raised,
  disabled,
  style,
}) => {
  // Return JSX
  return <Button
    label={label ? label : undefined}
    icon={icon ? icon : undefined}
    onClick={() => window.location.reload()}
    severity={severity ? severity : undefined}
    outlined={outlined}
    raised={raised}
    disabled={disabled}
    style={style}
  />
};

export default RefreshButton;
