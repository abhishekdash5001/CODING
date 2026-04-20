import { useEffect, useRef } from "react"



export function usePrevious<T>(prop:T):T|undefined{

    const ref = useRef<T | undefined>(undefined);

    useEffect(()=>{
        ref.current = prop

    
     

    },[prop])


    return ref.current

}