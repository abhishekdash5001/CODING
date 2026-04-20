import { useCallback, useState, type FC } from "react";
interface IProps {};
interface CHILDPROPS{
    onIncrement:any
}



export const CALLBACK: FC<IProps> = (props) => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");


    const handleIncrement = useCallback(() => {
        setCount((c) => c + 1);
      }, []);


    return (
        <div className="wrapper">
            <span>
                CALLBACk
            </span>

            <div>
            <h1>{count}</h1>
            <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
        <Child onIncrement={handleIncrement} />
            </div>
            
        </div>
    );
}


export const Child:FC<CHILDPROPS>=({onIncrement})=>{
    return <button onClick={onIncrement}>Increment</button>;
}