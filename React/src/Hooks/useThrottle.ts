import { useRef,useEffect ,useCallback} from "react";

type ThrottleProps = {
  fn: VoidFunction;
  timer: number;
};


export function useThrottle( fn, timer ):VoidFunction {
  const myRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function collectGarbage(){
    clearTimeout( myRef.current)
    myRef.current =null
  }

  useEffect(()=>{
  
    return ()=>{
        if(myRef.current !== null){
            collectGarbage()
        }
    }

  },[])



 const myThrottler =  useCallback(()=>{
 
        if(myRef.current === null){
            fn()
          myRef.current =   setTimeout(()=>{
            collectGarbage()

            },timer*1000)
        }


  },[timer,fn])



  return   myThrottler
}
