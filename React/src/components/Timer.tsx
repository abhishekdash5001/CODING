import { type FC } from "react";
import { useTimer, type TimerTupple } from "../Hooks/useTimer";

export const Timer: FC = () => {
  const [val, pause, continueMy]: TimerTupple = useTimer(10, 2);
  return (
    <div className="wrapper">
      <span>Timer</span>
      <div>
        <button onClick={pause}>pause</button>

        {val}

        <button onClick={continueMy}>Continue</button>
      </div>
    </div>
  );
};
