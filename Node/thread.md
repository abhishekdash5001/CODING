## node doesnot create threads on it own it wil so the calcuation on mainthread we have xplicity create threads

another JS thread
with its own event loop
its own memory space
separate from main thread

```js
//main.js
const { Worker } = require("worker_threads");

function runWorker(number) { 
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: number, // start the worked give this initial value
    });

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("error", (err) => {
      reject(err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

async function main() {
  console.log("Main thread start"); //first

  const result = await runWorker(10);

  console.log("Result from worker:", result); //second
  console.log("Main thread end"); //thrird
}

main();

//worker.js

const { parentPort, workerData } = require("worker_threads");

function heavyCalculation(n) {
  let sum = 0;

  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }

  return sum + n;
}

const result = heavyCalculation(workerData);

parentPort.postMessage(result);


```