import jwt from "jsonwebtoken";

const defaultOptions ={
    issuer: "nodejs-backend",
    audience: "next-js-frontend",
}

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      permissions: user.permissions,
      email: user.email,
      tokenType: "access",
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "10m", // after 10 min jwt will not be valid
      ...defaultOptions
    },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,

      tokenType: "refresh",
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d",  ...defaultOptions},
  );
};

//jwt.sign(payload, secretOrPrivateKey, options)

//payload is the data you want to store in the token  After decoding JWT, this data is visible. Important: payload is not encrypted. So do not store password, OTP, credit card, secret keys, etc.

// 2. Second parameter: secret   this is used to sign the token and used to verify token

//options   expiry time who issued the token

export const verifyAccessToken = (token)=>{
return jwt.verify(token,process.env.JWT_ACCESS_SECRET,defaultOptions)
}

export const verifyRefreshToken =(token)=>{
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET,defaultOptions)
}
