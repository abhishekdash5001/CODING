import { useState, type FC } from "react";
import { usePrevious } from "../Hooks/usePrevious";

export const Previous: FC = () => {
  const [counter, setCounter] = useState(0);
  const prev = usePrevious(counter);
  return (
    <div className="wrapper">
      <span>Previous</span>
      <div>
        current Value:{counter}
        previous Value: {prev}
        <button onClick={() => setCounter((p) => p + 1)}>increase</button>
      </div>
    </div>
  );
};
