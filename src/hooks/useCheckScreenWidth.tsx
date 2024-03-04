import { useEffect, useState } from 'react';

export const TABLET_VIEW_WIDTH = 744;
export const DESKTOP_VIEW_WIDTH = 1200;

const useCheckScreenWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window?.innerWidth);
    };

    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  let isMobileView = false;
  let isTabletView = false;
  let isDesktopView = false;
  let isActualTabletView = false;

  if (width) {
    isMobileView = width < TABLET_VIEW_WIDTH;
    isTabletView = width < DESKTOP_VIEW_WIDTH;
    isDesktopView = width > DESKTOP_VIEW_WIDTH;
    isActualTabletView = !isMobileView && isTabletView;
  }

  return {
    width,
    isMobileView,
    isTabletView,
    isDesktopView,
    isActualTabletView
  };
};

export default useCheckScreenWidth;
