// Imports
import { useEffect } from "react";

/**
 * Hook to update the core app CSS to apply top page alignment upon render and revert to center page alignment upon dismount
 */
function useTopAlignmentStyle(): void {
  useEffect(() => {
    // Change the body CSS class upon page load
    document.body.classList.add('body-page-none');
    document.body.classList.remove('body-page-center');
    return () => {
      // Reset the body CSS page upon component unmount
      document.body.classList.add('body-page-center');
      document.body.classList.remove('body-page-none');
    };
  }, []);
  return;
};

export default useTopAlignmentStyle;