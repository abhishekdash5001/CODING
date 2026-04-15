## Authentication is to check if logged in user is valid user or not by checking jwt or session id 
## Autheradion is ceking if user is allowed toperform these task


## how authentication is done
 user types user name password send it server 
 server hashes the password and then check the db for that user and if passwor dmatched create jwt token wth some info hTPony cookie expery secure samisite 
 and send back to the client

 on each reaquest post that server will check if this is valid jwt 

Role-based authorization (RBAC) Admin user guest
Permission based authection   can delete edit update

if authentication fails it gives 401 
it authraization fail it gived 403 not allowed

 /**

  var jwt = require ('jwttoekn')


  function authentcate(req,res,next){
    const token = request.cookie.accesstoken

    if(!token){
        res.status(401).json({message:'invalid user'})
    }

    try{
  const decoded     =   jwt.verify(token,PROC.env.jwt_secret)
  req.user = decode
  next()

    }catch((e)){
return res.status(401).json({ message: "Invalid or expired token" });
    }

  } 
 
 autheraizaion

  function autherazion(req,res,next){
 const user = req.user

     if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();

  } 


  app.delete("/users/:id", authenticate, authorizeAdmin, (req, res) => {
  res.json({ message: "User deleted" });
});
 
 
 
  */
