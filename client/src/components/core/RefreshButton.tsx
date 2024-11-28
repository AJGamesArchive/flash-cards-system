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
  visible?: boolean;
  disabled?: boolean;
  badgeValue?: string;
  badgeClassName?: 'p-badge-success' | 'p-badge-warning' | 'p-badge-danger' | 'p-badge-info' | 'p-badge-secondary';
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
  visible,
  disabled,
  badgeValue,
  badgeClassName,
  style,
}) => {
  // Return JSX
  return <Button
    label={label}
    icon={icon}
    onClick={() => window.location.reload()}
    severity={severity}
    badge={badgeValue}
    badgeClassName={badgeClassName}
    outlined={outlined}
    raised={raised}
    visible={visible}
    disabled={disabled}
    style={style}
  />
};

export default RefreshButton;
