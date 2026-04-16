## 
User request comes
↓
Get user IP
↓
Check count in Map
↓
If within 1 minute, increase count
↓
If count > 5, block request
↓
Else allow

```js
const requests = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const userData = requests.get(ip) || {
    count: 0,
    startTime: now,
  };

  if (now - userData.startTime > windowMs) {
    userData.count = 1;
    userData.startTime = now;
  } else {
    userData.count++;
  }

  requests.set(ip, userData);

  if (userData.count > maxRequests) {
    return res.status(429).json({
      message: "Too many requests",
    });
  }

  next();
}


## isue with if we multiple server this rate limited wil not work that why use redi
