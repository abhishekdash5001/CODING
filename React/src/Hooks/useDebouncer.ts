import { useRef,useEffect,useCallback } from "react";



export function useDebouncer<T extends unknown[]>(fn:(...args:T)=>void,timer:number):(...args:T)=>void{

    const myRef = useRef<ReturnType< typeof setTimeout>|null>(null)


    useEffect(()=>{


        return ()=>{
            if(myRef.current !== null){
                clearTimeout(myRef.current)
                myRef.current = null
            }
        }
    },[])

    const myDebounce = useCallback((...args:T)=>{

    
        clearTimeout(myRef.current)
            myRef.current = setTimeout(()=>{
                fn(...args)
                myRef.current = null

            },timer*1000)
       
    },[timer,fn])

return myDebounce

}