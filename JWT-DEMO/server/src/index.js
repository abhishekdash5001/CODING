import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // middle ware that gives cookie in plain object

import router from './auth.route.js'

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
    //Backend credentials: true
   // = I allow cookies from this frontend.
  })
);
// Frontend credentials: include / withCredentials: true
// = Please send cookies with this request.

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "JWT auth server is running",
  });
});

app.use("/auth",router)
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});