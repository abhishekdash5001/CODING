import { useEffect, useState ,useRef} from "react";


export type StopWatchResult =[string,VoidFunction,VoidFunction]

export function useStopWatch():StopWatchResult{
    const val= useRef<number>(0)
    const [watch,setWatch]= useState<string>('00:00:00:00')
    const date =  useRef<number>(Date.now())
    const myRef = useRef<ReturnType<typeof setInterval>|null>(null)
    const elapsedBeforePauseRef = useRef<number>(0);



    useEffect(()=>{

        startTimer()

        return ()=>{
            if(myRef.current !== null){
                clearInterval(myRef.current)
                myRef.current = null
            }
        }

    },[])


    const startTimer=()=>{
        myRef.current =  setInterval(()=>{
          val.current = val.current+1
          getTimer()
          
        },10)
    }

    const getTimer=()=>{
        const elapsed =  elapsedBeforePauseRef.current+ Date.now() - date.current
       
       const hours = Math.floor(elapsed/3600000)
       const minutes = Math.floor(elapsed%3600000/60000)
       const secons = Math.floor(elapsed%60000/1000)
      // const milliseconds = Math.floor(elapsed%1000)

       const hh = String(hours).padStart(2,"0")
       const min = String(minutes).padStart(2,"0")
       const sec = String(secons).padStart(2,"0")
    //    const mil = String(milliseconds).padStart(2,"0")
       setWatch(`${hh}:${min}:${sec}`)
      
    }

    function stop(){
        if(myRef.current){

            clearInterval(myRef.current)
            myRef.current = null

            elapsedBeforePauseRef.current =
        elapsedBeforePauseRef.current + (Date.now() - date.current);
        }
    }


    function continueMy(){
        if(myRef.current === null){
            date.current = Date.now()
            startTimer()
        }

    }

    return [ watch,stop,continueMy]

}