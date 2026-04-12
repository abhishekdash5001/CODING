import { useState, useEffect, useRef } from 'react';

const hook = [];
let currentIndex = 0;

export function useTimer(initialValue, step) {
  const i = currentIndex;
  const element = hook[i];

  if (element) {
    currentIndex++;
    return hook[i];
  } else {
    let [timer, setTimer] = useState(initialValue);
    let myRef = useRef(0);

    useEffect(() => {
      myRef.current = setInterval(() => {
        updateCounter();
      }, 1000 * step);

      return () => {
        clearInterval(myRef.current);
      };
    }, [timer]);

    function updateCounter() {
      setTimer((prev) => prev + step);
    }

    function pause() {
      clearInterval(myRef.current);
    }

    function continueR() {
      myRef.current = setInterval(() => {
        updateCounter();
      }, 1000 * step);
    }

    hook[i] = [timer, pause, continueR];
  }
  currentIndex++;

  return hook[i];
}
