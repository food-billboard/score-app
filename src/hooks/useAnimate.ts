import { useEffect, useState } from 'react';

export const useAnimate = (animate: string, immediately = false) => {
  const [animateState, setAnimateState] = useState(() => {
    return immediately ? animate : '';
  });

  const doAnimate = () => {
    if (animateState) return;
    setAnimateState(`${animate} animate__animated`);
    setTimeout(() => {
      setAnimateState('');
    }, 2000);
  };

  useEffect(() => {
    if (immediately) {
      setTimeout(() => {
        setAnimateState('');
      }, 2000);
    }
  }, [immediately, animate]);

  return {
    animate: animateState,
    action: doAnimate,
  };
};
