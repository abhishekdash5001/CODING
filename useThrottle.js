import { useRef } from 'react';


export function useThrottle(fn,delay){

const timer = useRef(undefined)

return function(...args){

  if(timer.current === undefined){
    timer.current = setTimeout(()=>{
      fn(...args)
    
      timer.current = undefined
    },delay)
  }

 

}
}