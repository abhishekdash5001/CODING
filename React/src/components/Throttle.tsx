import { type FC } from "react";
import { useThrottle } from "../Hooks/useThrottle";

export const Throttle: FC = () => {
    const throttle  = useThrottle(shoot,1)


    function shoot(){
        console.log("shoot ")
    }
  return (
    <div className="wrapper">
      <span>Throttle</span>
      <div>
        <button onClick={()=>throttle()}>
  fire !
        </button>
      </div>
    </div>
  );
};
