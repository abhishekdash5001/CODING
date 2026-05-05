## JWT is json web token

When user logs in with user name and password server checks the authentication and creates JWT and send to the front end like this

 Set:Cookie acces_token:JWT HTTPONLY,SECURE,samsite:'LAx'

 HTTPONly -> this accestoken will be stored in httml only cookie not in localstorage this help to prevent XSS (CROSS SITE SCRIPTIN)

 SECURE it will be sent only when the url is https

 Samsite :'lax'
  we are in bank.com login in now want to see profile call will go its secire ok
  we are goggle click on bank url call will httpcookie
  we in evel.com and there is button that call mybank/transfermonmey httpconly cookit will not go this CSRF


  fetch("https://api.com/profile", {
  credentials: "include",  -> if ui and server are at diffrent domain send the cookies
});



## JWT parts
 1it has 3 parts header.payload.signature

   ##  Header is amde of type and alogorithm
   ## payload has user role ,id and expeiry -< not encrupted
   ## signature -> server matches this with header+payload+secret  if signatur amtches gives the data


## We dont sure is localsore other XSS can be done


## Accesstoken /Refersh token  

 Acces tokena re short lived 5 min refresh token 30 days tiis ued to get new acces token