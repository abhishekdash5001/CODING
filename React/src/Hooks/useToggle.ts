import { useState } from "react";

type UseToogleTuple = [boolean,VoidFunction]

export function useToogle():UseToogleTuple{

    const [val,setVal] = useState<boolean>(false)

    const toggle=()=>{
        setVal((val)=>!val)
    }



    return [val,toggle]

}