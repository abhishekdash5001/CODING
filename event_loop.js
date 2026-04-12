// Event loop
// Whenever JavaScript comes across async work,
// it does not execute that callback immediately.

// Synchronous code goes into the call stack and runs first.

// Promise.then / catch / finally / queueMicrotask / MutationObserver
// go into the microtask queue when ready.

// setTimeout / setInterval / DOM events like click
// go into the task (callback/macrotask) queue when ready.

// When the call stack becomes empty,
// the event loop first checks the microtask queue.
// It runs ALL microtasks.
// After microtasks are empty, it takes ONE task from the task queue.
// Then again checks microtasks first.


// More accurate is:

// run all synchronous code
// when call stack is empty, run all microtasks
// then run one callback/macrotask
// after that, again run all microtasks
// repeat


//requestAnimationFrame Runs a callback just before the browser repaints the screen.


// Main Thread                    Worker Thread
// -----------                   --------------
// button clicks                  heavy calculation
// DOM updates                    data processing
// rendering                      loops
// user interaction               parsing

// const { Worker } = require("worker_threads");


// const worker = new Worker("./worker.js");
// worker.postMessage(10);

// worker.on("message", (data) => {
//   console.log("From worker:", data);
// });

// worker.on("error", (err) => {
//   console.error("Worker error:", err);
// });

// worker.on("exit", (code) => {
//   console.log("Worker exited with code:", code);
// });


// What is the difference between browser event loop and Node.js event loop?

//mode is not in brower so concept of repant clicks and these
//sync code > nexTick--->Promise--->settimeout.setinterval


// console.log("A");

// setTimeout(() => console.log("B"), 0);

// Promise.resolve().then(() => console.log("C"));

// console.log("D");

// A D C B


// console.log("start");

// Promise.resolve().then(() => console.log("p1"));
// Promise.resolve().then(() => console.log("p2"));

// console.log("end");

//start end p1 p2


// console.log("1");

// Promise.resolve().then(() => {
//   console.log("2");
//   Promise.resolve().then(() => console.log("3"));
// });

// console.log("4");

//1 4 2 3



// console.log("start");

// setTimeout(() => console.log("timeout1"), 0);

// Promise.resolve().then(() => {
//   console.log("promise1");
//   setTimeout(() => console.log("timeout2"), 0);
// });

// console.log("end");

// start  end primise1 timepout1 timeout 2


// console.log("A");

// async function foo() {
//   console.log("B");
//   await Promise.resolve();
//   console.log("C");
// }

// foo();

// console.log("D");

//A D B c


// console.log("1");

// async function test() {
//   console.log("2");
//   await null;  //(1)
//   console.log("3");
// }

// test();

// Promise.resolve().then(() => console.log("4")); //(2)

// console.log("5");
//1  2  5 3 4


// console.log("start");

// setTimeout(() => console.log("t1"), 0);
// setTimeout(() => console.log("t2"), 0);

// Promise.resolve().then(() => console.log("p1"));
// Promise.resolve().then(() => console.log("p2"));

// console.log("end");

//start  end p1 p2 t1 t2


// console.log("1");

// setTimeout(() => console.log("2"), 0); //(1)

// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });

// Promise.resolve().then(() => console.log("5"));

// console.log("6");

//1 6 3  5 2 4


// console.log("start");

// setTimeout(() => {
//   console.log("timer");
//   Promise.resolve().then(() => console.log("promise in timer"));
// }, 0);

// Promise.resolve().then(() => console.log("promise"));

// console.log("end");

///start end  promise  timer  promise in timer


// console.log("A");

// setTimeout(() => {
//   console.log("B");
//   setTimeout(() => console.log("C"), 0);
// }, 0);

// Promise.resolve().then(() => console.log("D"));

// console.log("E");

// AE DB C


// async function foo() {
//     console.log("1");
//     await Promise.resolve();
//     console.log("2");
//   }
  
//   console.log("3");
  
//   setTimeout(() => console.log("4"), 0);
  
//   foo();
  
//   console.log("5");
  // 3 1 5 2 4


//   console.log("a");

// Promise.resolve()
//   .then(() => {
//     console.log("b");
//   })
//   .then(() => {
//     console.log("c");
//   });

// console.log("d");

//a d bc



// console.log("1");

// Promise.resolve()
//   .then(() => {
//     console.log("2");
//     setTimeout(() => console.log("3"), 0);
//   })
//   .then(() => {
//     console.log("4");
//   });

// console.log("5");

// 1 5 2 4 3


// console.log("start");

// async function foo() {
//   console.log("foo");
//   return "done";
// }

// foo().then((res) => console.log(res));

// console.log("end");

//start foo  end done


// console.log("1");

// async function foo() {
//   console.log("2");
//   await Promise.resolve();
//   console.log("3");
//   await Promise.resolve();
//   console.log("4");
// }

// foo();

// Promise.resolve().then(() => console.log("5"));

// console.log("6");

//1 2 63 5 4


// console.log("x");

// Promise.resolve().then(() => {
//   console.log("y");
//   Promise.resolve().then(() => {
//     console.log("z");
//   });
// });

// Promise.resolve().then(() => console.log("w"));

// console.log("v");

//x v y w z


// console.log("A");

// setTimeout(() => console.log("B"), 0);

// for (let i = 0; i < 1000000000; i++) {}

// console.log("C");

//A C B


console.log("1");

setTimeout(() => console.log("2"), 0);

function foo() {
  console.log("3");
  Promise.resolve().then(() => console.log("4"));
}

foo();

console.log("5");
//1  3  5 4 2
