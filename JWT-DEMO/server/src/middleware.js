import { verifyAccessToken } from "./jwt.js";

export const requiredAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "invalid user",
    });
  }

  try {
    const decoded = verifyAccessToken(token);

    if (decoded.tokenType !== "access") {
      return res.status(401).json({
        message: "invalid token or token expired",
      });
    }

    req.user = {
      id: decoded.sub,
      role: decoded.role,
      permissions: decoded.permissions ?? [],
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token or token expired",
    });
  }
};



export const requiredRoles = (...allowedRoles)=>{
    return function (req,res,next){
        if(!req.user){
            return res.status(401).json({
                message: "invalid user",
              });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "Not Allowed",
              }); 
        }
        next()

    }

}

export const requirePermission=(permission)=>{
    return function (req,res,next){
        if(!req.user){
            return res.status(401).json({
                message: "invalid user",
              });
        }

        if(!res.user.permissions.includes(permission)){
            return res.status(403).json({
                message: "Not Allowed",
              }); 
        }


        next()

    }
}
