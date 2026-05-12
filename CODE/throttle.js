function throttle(fn, delay) {
  let timer;

  return function (...args) {
    const context = this;

   if(!timer){
    fn.apply(context,args)
    timer = setTimeout(()=>{
       
        timer = undefined

    },delay)
   }
  };
}

const log = throttle(() => {
  console.log("called");
}, 1000);
