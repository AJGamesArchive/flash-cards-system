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
  disabled?: boolean;
  style?: React.CSSProperties;
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
  disabled,
  style,
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
    label={label ? label : undefined}
    icon={icon ? icon : undefined}
    onClick={copyText}
    severity={severity ? severity : undefined}
    outlined={outlined}
    raised={raised}
    disabled={disabled}
    style={style}
  />
};

export default CopyButton;
