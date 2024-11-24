// Core Imports
import React from 'react';

// Component Props Interface
interface DebugBlock {
  children: React.ReactNode;
};

/**
 * React function to render the debug block component
 * @returns DebugBlock Component
 */
const DebugBlock: React.FC<DebugBlock> = ({
  children,
}) => {
  // Return JSX
  return (
    <pre style={{
      minHeight: 'fit-content',
      textWrap: 'wrap',
    }}>
      {children}
    </pre>
  );
};

export default DebugBlock;
