import { type FC } from "react";
import { useStopWatch,type StopWatchResult } from "../Hooks/useStopWatch";
interface IStopWatchProps {};



export const StopWatch: FC<IStopWatchProps> = (props) => {
    const [watch,stop,cont]:StopWatchResult = useStopWatch()
    return (
        <div className="wrapper">
            <span>

                StopWatch
            </span>
            <div>
                <button onClick={stop}>
                    Stop
                </button>

                {watch}
                <button onClick={cont}>
                    Continue
                </button>
            </div>
        </div>
    );
}
