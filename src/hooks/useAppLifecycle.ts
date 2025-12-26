import { AppState } from 'react-native';
import { useEffect } from 'react';

export const useAppLifecycle = (onBackground: () => void) => {
  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state === 'background') {
        onBackground();
      }
    });
    return () => sub.remove();
  }, []);
};
