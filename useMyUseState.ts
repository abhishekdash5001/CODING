const hooks: any = [];
let hookIndex = 0;

function useMyCustomuseState(initialValue) {
  const currentIndex = hookIndex;
  if (hooks[currentIndex] === undefined) {
    hooks[currentIndex] = initialValue;
  }

  function setState(valueOrUpdater){
    const oldVal = hooks[currentIndex]

    const newVal = typeof valueOrUpdater ==='function'?valueOrUpdater(oldVal):valueOrUpdater

    if(Object.is(oldVal,newVal)){
        return
    }
    hooks[currentIndex] = newVal
    render()
  }

  hookIndex++;
  return [hooks[currentIndex],setState];
}



function render(){
    hookIndex=0;
    const app = App()
    globalThis.app = app
}