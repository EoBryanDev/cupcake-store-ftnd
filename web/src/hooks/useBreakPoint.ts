import { useState, useEffect } from 'react';

const useBreakpoint = (delay = 150) => {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateBreakpoints = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setBreakpoints({
          isMobile: width < 640,
          isTablet: width >= 640 && width < 1024,
          isDesktop: width >= 1024,
        });
      }, delay);
    };

    const width = window.innerWidth;
    setBreakpoints({
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
    });

    window.addEventListener('resize', updateBreakpoints);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateBreakpoints);
    };
  }, [delay]);

  return breakpoints;
};

export default useBreakpoint;