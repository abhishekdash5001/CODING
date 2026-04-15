# Jwt toke auth loged out is differnt session based bcasue server doesnot store it like session

jwt is mostly stateless so there are teo ways 

1. we call logut api and server will send response 
this is whenboth in http only
```js
app.post("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.json({ message: "Logged out" });
});

so now ther jwt token in cleint side


2. if locaslstoer thne logout wil actulay remvoe it loca stoage ad we havt oweight for expry


3. we have accetoken in code so will cear the meemoty in react and  refersh tokken onvalid in db  so that it can be used to gt new acces token


```

```js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.post("/login", (req, res) => {
  const accessToken = jwt.sign(
    { userId: "123", role: "user" },
    "mysecret",
    { expiresIn: "15m" }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.json({ message: "Login successful" });
});
```
