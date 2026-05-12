function debounce(fn, delay) {
  let timer;

  return function(...args){
    const context = this
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(context,args);
      timer = undefined
    }, delay);
  };
}

const log = debounce(() => {
  console.log("called");
}, 500);
