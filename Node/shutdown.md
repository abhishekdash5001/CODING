```js
const express = require("express");

const app = express();
const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("Shutdown signal received");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
}


```

likehow shops are closed