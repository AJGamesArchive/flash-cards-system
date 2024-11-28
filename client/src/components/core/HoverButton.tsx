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
  visible?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  badgeValue?: string;
  badgeClassName?: 'p-badge-success' | 'p-badge-warning' | 'p-badge-danger' | 'p-badge-info' | 'p-badge-secondary';
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
  visible,
  disabled,
  className,
  style,
  badgeValue,
  badgeClassName,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    ...style,
    backgroundColor: isHovered ? hoverColor : backgroundColor,
    color: isHovered ? hoverTextColor : textColor,
  };

  // Return JSX
  return <Button
    label={label}
    icon={icon}
    onClick={onClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    severity={severity}
    badge={badgeValue}
    badgeClassName={badgeClassName}
    outlined={outlined}
    raised={raised}
    visible={visible}
    disabled={disabled}
    className={className}
    style={buttonStyle}
  />
};

export default HoverButton;
