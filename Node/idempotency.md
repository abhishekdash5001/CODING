## idempotency

it measn calling the end point again and gtting the same response

so it end point is idempotanct retu is afe if not then rety is risky it might change something
get are mostly idemptency


# for egg pay now is not idmpoenent so if user clciks pay server workd and respnse is lots and user rety then amount will be decudted twice
that why use keys


GET → idempotent
PUT → idempotent
DELETE → idempotent
POST → usually not idempotent
PATCH → depends


```js
const express = require("express");

const app = express();
app.use(express.json());

// Fake in-memory stores
const idempotencyStore = new Map();
const payments = [];

// fake payment creation function
function processPayment({ userId, amount, currency }) {
  const payment = {
    paymentId: `pay_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    userId,
    amount,
    currency,
    status: "success",
    createdAt: new Date().toISOString(),
  };

  payments.push(payment);
  return payment;
}

app.post("/payments", (req, res) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return res.status(400).json({
      message: "Idempotency-Key header is required",
    });
  }

  const { userId, amount, currency } = req.body;

  if (!userId || !amount || !currency) {
    return res.status(400).json({
      message: "userId, amount, and currency are required",
    });
  }

  // Check if this key was already used
  if (idempotencyStore.has(idempotencyKey)) {
    const savedResponse = idempotencyStore.get(idempotencyKey);

    return res.status(200).json({
      message: "Duplicate request detected. Returning previous response.",
      data: savedResponse,
    });
  }

  // First time request with this key
  const paymentResult = processPayment({ userId, amount, currency });

  // Save response against idempotency key
  idempotencyStore.set(idempotencyKey, paymentResult);

  return res.status(201).json({
    message: "Payment processed successfully",
    data: paymentResult,
  });
});

app.get("/payments", (req, res) => {
  res.json({
    count: payments.length,
    data: payments,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

```