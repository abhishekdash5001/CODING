const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
  const result = data * 2;
  parentPort.postMessage(result);
});