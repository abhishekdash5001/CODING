const hooks:any=[]

let hookIndex =0;

function useCustomUseMemo(callBack,deps){
  let i =hookIndex;
  const element = hooks[i]
  if(element){
    const [prevMemo,prevDep]= element

    const hasChanged = deps.some((p,i)=>!Object.is(p,prevDep[i]))
  
    if(!hasChanged){
      hookIndex++;
      return prevMemo
    }
  }

 


  const newMemo = callBack()
  hooks[i]=[newMemo,deps]

  




  hookIndex++;
  return  newMemo

}


function App(){
    hookIndex =0;
    /*** */
}