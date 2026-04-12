import { useRef } from 'react';

export function useDebounce(fn, delay) {
  const timer = useRef(undefined);

  return function (...args) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn(...args);
      timer.current = undefined;
    }, delay);
  };
}
