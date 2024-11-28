// Core Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

// Component Props Interface
interface BackButtonProps {
  label?: string;
  icon?: string;
  severity?: 'help' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  outlined?: boolean;
  raised?: boolean;
  visible?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  badgeValue?: string;
  badgeClassName?: 'p-badge-success' | 'p-badge-warning' | 'p-badge-danger' | 'p-badge-info' | 'p-badge-secondary';
  backFactor: number;
};

/**
 * React function to render the back button component
 * @returns BackButton Component
 */
const BackButton: React.FC<BackButtonProps> = ({
  label,
  icon,
  severity,
  outlined,
  raised,
  visible,
  disabled,
  style,
  backFactor,
  badgeValue,
  badgeClassName,
}) => {
  // Component variable
  const navigate = useNavigate();

  // Function to call useNavigation to go back a page
  const goBack = async (): Promise<void> => {
    navigate(backFactor);
    return;
  };

  // Return JSX
  return <Button
    label={label}
    icon={icon}
    onClick={goBack}
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

export default BackButton;
