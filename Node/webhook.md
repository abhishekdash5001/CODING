# it slike sme calls you when ur parcels arrived rather you calling hte everyhour
```js
const express = require("express");

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).json({ message: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


```