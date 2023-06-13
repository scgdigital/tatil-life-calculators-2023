/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const useDebouncedEffect = (effect: Function, deps: any[], delay: number, instantEffect?: Function) => {
  useEffect(() => {
    // Perform instant effect for dependencies
    if (instantEffect) {
      instantEffect();
    }

    // Set up debounced effect
    const handler = setTimeout(() => effect(), delay);

    // Clean up timeout
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};