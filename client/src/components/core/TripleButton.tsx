// Core Imports
import React, { useState } from 'react';
import { Button } from 'primereact/button';

// Component Props Interface
interface TripleButtonProps {
  label?: string;
  icon?: string;
  severity?: 'help' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  outlined?: boolean;
  raised?: boolean;
  visible?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  badgeValue?: string;
  badgeClassName?: 'p-badge-success' | 'p-badge-warning' | 'p-badge-danger' | 'p-badge-info' | 'p-badge-secondary';
  onTripleClick: () => void;
};

/**
 * React function to render the triple button component
 * @returns TripleButton Component
 */
const TripleButton: React.FC<TripleButtonProps> = ({
  label,
  icon,
  severity,
  outlined,
  raised,
  visible,
  disabled,
  loading,
  className,
  style,
  badgeValue,
  badgeClassName,
  onTripleClick
}) => {
  // Component variable
  const [clickNum, setClickNum] = useState<1 | 2 | 3>(1);
  
  // Function to handle processing the triple click mechanism
  function tripleClickHandler(): void {
    switch(clickNum) {
      case 1:
        setClickNum(2);
        setTimeout(() => {
          setClickNum(1);
        }, 3000);
        break;
      case 2:
        setClickNum(3);
        break;
      case 3:
        setClickNum(1);
        onTripleClick();
        break;
    };
  };

  // Return JSX
  return <Button
    label={label}
    icon={icon}
    onClick={tripleClickHandler}
    severity={clickNum === 1 ? severity : clickNum === 2 ? 'warning' : 'danger'}
    badge={badgeValue}
    badgeClassName={badgeClassName}
    outlined={outlined}
    raised={raised}
    visible={visible}
    disabled={disabled}
    loading={loading}
    className={className}
    style={clickNum === 1 ? style : undefined}
  />
};

export default TripleButton;
