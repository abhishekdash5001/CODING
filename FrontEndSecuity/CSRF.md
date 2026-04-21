# Set:Cookie acces_token:JWT HTTPONLY,SECURE,samsite:'LAx'

```js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    email: "test@example.com",
    role: "admin",
  };

  const accessToken = jwt.sign(user, "your_jwt_secret", {
    expiresIn: "15m",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


```

  # SameSite :"Strict" -> 1 .cookies wil be sent when request is trully from the webiste 
                          2. if user coming to bank.com from a normal webiste and he is expecitng to land on some page but it will not work beacuse cookies will not sent
  
  # SameSite : "LAx"  1.its is middel ground  measn cookie wil be sent if user is coming from other webistte    Normal navigation is okay
                      2. Blocks cookies in post and fetch
       

 # Important HTTPONLY saves from XSS not CSRF 
  # Important sameSite :'lax''strict' protect from CSRF


# CSRF Cross site request forgery


## Attackers send request to your browser when you already logged in and browser send to server


## Case 1(document.cookie) can be read by js
1.We visit the bank.com login
2. Server send setCookie:seesion=1234
3 now our browser has the cookie in js 

4 now user visits a bad website 

```html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="5000" />
</form>

<script>
  document.forms[0].submit();
</script>



```
5. form will be submited as soon as we open the website and request will fo bank.com with transfer 
6.as cookie is already there server will trust as is valid session/jwt and perform the transaction

## Attacker webiste cannot read cookies beacuse of same orgin policy    this default behavior of browser




# So how to stop it
1.use HTTP only Cookie for XSS 
2.SameSite 'lax'


3.CSRF Token
what if 

```html

<form action="/transfer" method="POST">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="to" value="friend">
  <input type="hidden" name="csrfToken" value="X9K2P7ABC">
</form>


```

# now when call is made to trnasfer http only cookie goes autmatic and scrf tokken also server validates but in case trnasfer request form eveil.com they doont know csrf token so it will blocked

4.Check origin
 in header of request if server also checks orgin 

Origin: https://bank.com  orgin is the site
 Referer: https://bank.com/account/transfer   page URL which made te request
 but in eveil
 Origin: https://evil.com
 Referer: https://evil.com/attack.html

  