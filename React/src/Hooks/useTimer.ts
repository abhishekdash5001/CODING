import { useState, useRef, useEffect } from "react";

export type TimerTupple = [number, VoidFunction, VoidFunction];

export function useTimer(initialValue: number, step: number): TimerTupple {
  const [val, setVal] = useState<number>(initialValue);
  const myRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    continueMy();

    return () => {
      pause();
    };
  }, [initialValue, step]);

  function updateVal() {
    setVal((val) => val + step);
  }

  function pause() {
    if (myRef.current !== null) {
      clearInterval(myRef.current);
      myRef.current = null;
    }
  }

  function continueMy() {
    if (myRef.current !== null) {
      return;
    }

    myRef.current = setInterval(() => {
      updateVal();
    }, step * 1000);
  }

  return [val, pause, continueMy];
}
