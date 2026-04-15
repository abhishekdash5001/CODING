const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// built-in middleware to parse json body
app.use(express.json());

// cors middleware
app.use(
  cors({
    origin: "http://localhost:3000", // frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // move to next middleware/route
}

// use custom middleware globally
app.use(logger);

// normal api
app.get("/api/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Express API",
  });
});

// another api with body
app.post("/api/data", (req, res) => {
  const body = req.body;

  res.json({
    success: true,
    received: body,
  });
});

// route-level middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (token === "Bearer mytoken123") {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

// protected api
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: {
      id: 1,
      name: "Athena",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});