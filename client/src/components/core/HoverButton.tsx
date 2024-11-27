// Core Imports
import React, { useState } from 'react';
import { Button } from 'primereact/button';

// Component Props Interface
interface HoverButtonProps {
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
  hoverTextColor: string;
  label?: string;
  icon?: string;
  severity?: 'help' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  outlined?: boolean;
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
};

/**
 * React function to render the hover button component
 * @returns HoverButton Component
 */
const HoverButton: React.FC<HoverButtonProps> = ({
  backgroundColor,
  hoverColor,
  textColor,
  hoverTextColor,
  label,
  icon,
  severity,
  outlined,
  raised,
  disabled,
  className,
  style,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    ...style,
    backgroundColor: isHovered ? hoverColor : backgroundColor,
    color: isHovered ? hoverTextColor : textColor,
  };

  // Return JSX
  return <Button
    label={label ? label : undefined}
    icon={icon ? icon : undefined}
    onClick={onClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    severity={severity ? severity : undefined}
    outlined={outlined}
    raised={raised}
    disabled={disabled}
    className={className}
    style={buttonStyle}
  />
};

export default HoverButton;
