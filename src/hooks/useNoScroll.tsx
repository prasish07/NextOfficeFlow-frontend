import { useEffect } from 'react';
import { isIOS } from 'react-device-detect';

const useNoScroll = (shouldAddClass = false) => {
  // Effect goes here
  useEffect(() => {
    if (!shouldAddClass) return;

    const htmlElem = document.querySelector('html');
    const bodyElem = document.querySelector('body');

    if (!htmlElem || !bodyElem) return;

    if (isIOS) {
      htmlElem.classList.add('no-scroll');
    }
    bodyElem.classList.add('no-scroll');

    return () => {
      if (isIOS) {
        htmlElem.classList.remove('no-scroll');
      }
      bodyElem.classList.remove('no-scroll');
    };
  }, [shouldAddClass]);
};

export default useNoScroll;
