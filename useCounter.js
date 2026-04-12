import { useState } from 'react';

const hook = [];
let currentIndex = 0;

export function useCounter(initialValue, step) {
  const i = currentIndex;
  const element = hook[i];

  if (element) {
    return hook[i];
  } else {
    const [count, setIsCount] = useState(initialValue);

    function increment() {
      setIsCount((prev) => prev + step);
    }

    function decrement() {
      setIsCount((prev) => {
        if (prev > initialValue) {
          return prev - step;
        }
        return initialValue;
      });
    }

    function reset() {
      setIsCount(0);
    }
    hook[i] = {
      count,
      increment,
      decrement,
      reset,
    };
  }
  currentIndex++;

  return hook[i];
}
