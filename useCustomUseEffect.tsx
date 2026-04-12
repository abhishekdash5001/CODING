const effect:any=[];
let effectIndex =0;


export function useCustomUseEffect(setup,deps){

  let  i =effectIndex
  let prev = effect[i]

  let hasChanged = true;

  if(deps && prev){
    hasChanged = deps.some((dep,index)=>Object.is(dep,prev.deps[index]))
  }

 let cleanup= setup()
  if(hasChanged){
    cleanup()
  }


  effect[i]={
    deps,
    cleanup
  }


  effectIndex++

}

function resetHook(){
    effectIndex =0;
}