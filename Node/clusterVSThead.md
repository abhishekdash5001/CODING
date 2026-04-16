## cluaster uses mutliple   node process  it like poeing 4 shops with there workers
## nworker threads run mutlipe threas in node nev  its like 1 shop with new workers
 

 For eg
 heavy api call we can use cluster but heve cpu work we user workers

 ## cluster dont solve heave cpu work thres will do that issue will still be there



 #1 Hevy api  ---> use cluster spread it accorss diffent proces
 # Scenario B: PDF generation, image resize, heavy report - workers


 ```js


const cluster = require("cluster");
const os = require("os");
const express = require("express");

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.get("/", (req, res) => {
    res.send(`Handled by process ${process.pid}`);
  });

  app.listen(3000);
}

 ```