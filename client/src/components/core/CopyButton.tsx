// Core Imports
import React from 'react';
import { ToastMessage } from 'primereact/toast';
import { Button } from 'primereact/button';

// Component Props Interface
interface CopyButtonProps {
  textToCopy: string;
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
  onAlert: (message: ToastMessage) => void;
};

/**
 * React function to render the copy button component
 * @returns CopyButton Component
 */
const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label, icon,
  severity,
  outlined,
  raised,
  visible,
  disabled,
  style,
  badgeValue,
  badgeClassName,
  onAlert
}) => {
  // Function to handle copying text to device clipboard
  const copyText = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      onAlert({
        severity: `info`,
        summary: `Copied`,
        closeIcon: 'pi pi-times',
        life: 2000,
      });
    } catch (err) {
      onAlert({
        severity: `warn`,
        summary: `Copy Failed`,
        closeIcon: 'pi pi-times',
        life: 3000,
      });
    };
  };

  // Return JSX
  return <Button
    label={label}
    icon={icon}
    onClick={copyText}
    severity={severity}
    outlined={outlined}
    badge={badgeValue}
    badgeClassName={badgeClassName}
    raised={raised}
    visible={visible}
    disabled={disabled}
    style={style}
  />
};

export default CopyButton;
