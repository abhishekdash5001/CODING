## Ratelimiter means restirct the number of time client can make requst to srever to aboud

abuse -> bot can call api end again that will otp sms db ecomes slow
bute frce - trying n nuber of cimbination of otp or password utnil 1 succesed
accidental traffic spikes

Floating window suppose the time is 7 20 20

so tprevious bucket in 1 minut 7 19 20 it s40 sec to next this 66.67 percetn

so total is curren bucket + previous bucket\*0.67

Fixed window has limation 12:00:59 and 1:00:00 user can hid doublethe size in 2 secs

Fixed window

````js

const express = require("express");
const app = express();

const requests = new Map();

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 5;

  if (!requests.has(ip)) {
    requests.set(ip, []);
  }

  const timestamps = requests.get(ip);

  const validTimestamps = timestamps.filter(ts => now - ts < windowMs);

  validTimestamps.push(now);
  requests.set(ip, validTimestamps);

  if (validTimestamps.length > limit) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});


app.listen(3000);





 FLoating window


 class SlidingWindowRateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.store = new Map();
  }

  isAllowed(key) {
    const now = Date.now();
    const currentWindowStart =
      Math.floor(now / this.windowMs) * this.windowMs;

    let entry = this.store.get(key);

    if (!entry) {
      entry = {
        currentWindowStart,
        currentCount: 0,
        previousCount: 0,
      };
    }

    if (entry.currentWindowStart !== currentWindowStart) {
      const diff = currentWindowStart - entry.currentWindowStart;

      if (diff === this.windowMs) {
        entry.previousCount = entry.currentCount;
      } else {
        entry.previousCount = 0;
      }

      entry.currentCount = 0;
      entry.currentWindowStart = currentWindowStart;
    }

    const elapsed = now - entry.currentWindowStart;
    const weight = (this.windowMs - elapsed) / this.windowMs;

    const estimatedCount =
      entry.currentCount + entry.previousCount * weight;

    if (estimatedCount >= this.limit) {
      this.store.set(key, entry);
      return false;
    }

    entry.currentCount += 1;
    this.store.set(key, entry);
    return true;
  }
}

const limiter = new SlidingWindowRateLimiter(5, 60 * 1000);

function rateLimitMiddleware(req, res, next) {
  const key = req.ip; // or req.user.id

  if (!limiter.isAllowed(key)) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  next();
}

module.exports = rateLimitMiddleware;
```js


```js


const expores  = require(express)
const cors = require("cors");
  const jwt = require ('jwttoekn')


cosnt app = exprress()
cosnt PORT = 3000

app.use(express.json()) //  use middle that used jsosn body

app.use(cors({
    cors({
    origin: PROCESS.env.url// frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
}))

const authentication = function(req,res,next){

    const  token = req.cookies.accesstoken

if(!token){
 return  res.json.status(401).({
    maessage:''
   })

}
try{
    cosnt decode = jwt.verify(token,PROC.env.jwt_secret)
    req.user = decode
    next()

}catch(e){
   return res.json.status(401).({
    maessage:''
   })
}

}

const autharized = (...roles)=>{
    return (req,res,next)=>{
   const user = req.user;

   if(user === undefined)
   {
    return  res.json.status(401).({
    maessage:''
   })
   }

   if(!roles.include(user.role)){
     return  res.json.status(403).({
    maessage:''
   })
   }else{
    next()
   }
    }

}

cosnt ratelimiter = function(req,res,next){

    const a =ratelimimterfunction()

    if(!a){
       
     return  res.json.status(429).({
    maessage:''
   })else{
    next()
   }
    

}

}

const chcekCredentials=(req,res,next)=>{
    const {id,password}= req;

    const pass = hasedPasswprd(password)

   if( db.call(id,pass)){
    const accessToken = jwt.sign(
    { userId: "123", role: "user" },
    "mysecret",
    { expiresIn: "15m" }
  );

  res.cookies('accesstoken',accesstoken,{
    httpOnl:truem
    secure:true
    sameSite:'LUX'
  })

    
   }else{
    req.status(401).({
        message:''
    })
   }

}

app.get('/login',ratelimiter,chcekCredentials,(res,req)=>{
    req.status(200).({
        message:''
    })
})


app.litsen(PORT,()=>{
    console.log('server running')
})

```js
````
