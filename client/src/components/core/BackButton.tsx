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
  disabled?: boolean;
  style?: React.CSSProperties;
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
  disabled,
  style,
  backFactor
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
    label={label ? label : undefined}
    icon={icon ? icon : undefined}
    onClick={goBack}
    severity={severity ? severity : undefined}
    outlined={outlined}
    raised={raised}
    disabled={disabled}
    style={style}
  />
};

export default BackButton;
