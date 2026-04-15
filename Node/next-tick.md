## what ever in the in next will be escuted after suncrnous cod eis fdone and after that the event lop continues
## why its used


function abc(i,callback){

    if(cached[i]){
    callback()
    }else{
        fs.readFile('asdsd',()=>{
            callback()
        })
    }
}

some callback is async some time call back is sync  but now if user next tick in if caidntion call back will lawys be async from caller presepectice


## to emit event after setup is complete

/**



const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    process.nextTick(() => {
      this.emit("ready");
    });
  }
}

const obj = new MyEmitter();

obj.on("ready", () => {
  console.log("ready event received");
});

 */