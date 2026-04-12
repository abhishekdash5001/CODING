const hooks1:any=[]
let currentIndex = 0


function useMyCustomHook(callBack,dep){
 const   i =currentIndex;

 const ele = hooks1[i]


 if(ele){
   const  [oldMemo,oldDep]=ele
const hasCHanged  =  dep.some((e,i)=>!Object.is(e,oldDep[i]))

if(!hasCHanged){
    currentIndex++
    return  oldMemo

}

    
 }

   hooks1[i]=[callBack,dep]

 
   currentIndex++
   return callBack


}