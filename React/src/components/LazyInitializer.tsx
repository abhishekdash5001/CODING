import { type FC, useState } from "react";
interface ILazyInitializerProps {}

function expensive(){
    console.log('doing expensive')
    for(let i =0; i< Math.pow(2,9);i++){

    }
    return 2
}

export const LazyInitializer: FC<ILazyInitializerProps> = (props) => {
    console.log('component render')
  const [val, setValue] = useState(0);
  const [ret,setREt]= useState(expensive())

  return (
    <div className="wrapper">
      <span>LazyInitializer</span>

      <div>
        <h1>{val}</h1>
        {ret}
        <button onClick={() => setValue((v) => v + 1)}>CLick</button>
      </div>
    </div>
  );
};
