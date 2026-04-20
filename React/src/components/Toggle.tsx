import { type FC } from "react";
import { useToogle } from "../Hooks/useToggle";



export const Toggle: FC = () => {
  const [val, toogle] = useToogle();

  return (
    <div className="wrapper">
        <span>

            Toggle Me
        </span>
        <div>
        {val ? "true" : "false"}
        <button onClick={toogle}>toggle</button>
        </div>
    
    </div>
  );
};
