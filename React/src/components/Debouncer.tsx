import {useState, type  FC, type SyntheticEvent } from "react";

import { useDebouncer } from "../Hooks/useDebouncer";

interface IDebouncerProps {};

export const Debouncer: FC<IDebouncerProps> = () => {
    const [val,setVal]= useState<string>('')
    const debouncer = useDebouncer(fetchDate,1)

    const handleOnchange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        
        setVal(e.currentTarget.value)
        debouncer(e.currentTarget.value)

    }

    function fetchDate(name){
        console.log(name)
    }
    return (
        <div className="wrapper">
            <span>
                Debouncer
            </span>
            <div>
<input onChange={handleOnchange} value={val}/>
            </div>
            
        </div>
    );
}
