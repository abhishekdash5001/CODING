## Node is run time js enviroment
   ru time is envrment that rn any code wy it is need js can only be executed in browser
   node js can run js outisde the browser like mac widnows linux
   why node js is required js is mostly used in broswer so it cant acutly control any thing in server by node js we can do all these things
    it can handle filesytem and database also in server



## why noe
 1. unified langauge same in front and back
 2.high perforamce 
 3.good for live streaming
 4.real time data (chat)


 ## Repl (Read Evaluate print lopp)
  it like writng code in termina


## node js execute functions in a call stack (FIFO)

Call stack in js and node envrimomtn works same but as whole enviroment it runs diffent like we procces.next tick() setImmediate() that broswer doesnot have

so its 
 # call stack
# envroment+libuv for async i/o
# event loop = decides when callbacks come back to stack


/**

const fs = require("fs"); < syncrnous just doeanlod this fs module

console.log("1");  < prit this 

fs.readFile("test.txt", "utf8", (err, data) => {  async call its started downloading this file reigister the call back  mani code moved
  console.log("2");
});

console.log("3"); <--- it comes here print this    now file is readinf is complete node puts the callback in the callback quee /loop and then call stack is empty node reads 2 
 */


## what node js says run the sync code in call stack 
## if yyou se async code run it out side the stack 
## qhen the task is complete regerster the callback 
## event loop sees call stack is empty so it pused the calcbk to the stack

## why do we need ssycn outside the call stack if we wild o it the stack js needs to wait to get the file then move furhter


## 4. What handles async work in Node?
  .Node Env
  .libuv C plus library

  what are sync workds
  setTImeout 
  SetIterval
  fs.read
  fs.write
  api calls
  db connection



Super short version
Main JS → one thread, one call stack
Network I/O → often OS event notification
File/crypto/zlib/some DNS → thread pool
callback always comes back to main thread
    


    const fs = require("fs");

console.log("A");

fs.readFile("test.txt", "utf8", () => {
  console.log("B"); <i/o callabcal so when callstack is emoty only the it will run
});

Promise.resolve().then(() => {
  console.log("C");  
});

console.log("D");




/** 
console.log("A");  1

process.nextTick(() => {  < this next tick queueu
  console.log("B");
});

Promise.resolve().then(() => {   < this goes in micro task quer
  console.log("C");
});

console.log("D");  2


 */
 so when sycnhrons code node js next tick que then micro task que then evetn loop contunue

 ## nexttick node gives high pritty when sycnronous code isdone run the next tick


 Sync code
  ↓
process.nextTick queue
  ↓
Promise microtask queue
  ↓
Event loop phases


/**

console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

process.nextTick(() => console.log("4"));

console.log("5");

 */

 15432



## why CPU-heavy tasks block Node
Node is signle thread is workds wel when read file wait make call wait wait ... but if there s cpu hevaey task converting json llop imge processing main thread is busy so it cannot more formward
