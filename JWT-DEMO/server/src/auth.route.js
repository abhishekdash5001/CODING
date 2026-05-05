import express from "express";
import bcrypt from "bcryptjs";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt.js";
import { users, refreshTokenStore } from "./user.js";
import { requiredAuth ,requiredRoles,requirePermission} from "./middleware.js";

const router = express.Router();

const isProduction = process.env.NODE_ENV === "production";

const accessTokenOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProduction,
  maxAge: 10 * 60 * 1000, // aftet this coolie will be removed from browser cookies
};

const refreshTokenOption = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProduction,
  maxAge: 7 * 24 * 60 * 1000, // aftet this coolie will be removed from browser cookies
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokenStore.set(user.id, refreshToken);

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOption);


  console.log("same?", accessToken === refreshToken);

  res.status(300).json({
    message: "login success ful",
    ...user,
  });
});

router.get("/me", async (req, res) => {
    console.log()
  const token = req.cookies.accessToken;

  const user = verifyAccessToken(token);

  if (!user) {
    return res.status(401).json({
      message: "invalid toke",
    });
  }
  return res.status(200).json({
    message: "success",
    ...user,
  });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "invalid refresh token",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (decoded.tokenType === "refreshToken") {
      return res.status(401).json({
        message: "invalid token type",
      });
    }

    const storedRefreshToken = refreshTokenStore.get(decoded.sub);

    if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      return res.status(401).json({
        message: "invalid refresh token",
      });
    }

    const user = users.find((user) => user.id === decoded.sub);

    if (!user) {
      return res.status(401).json({
        message: "invalid user",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshTokenNew = generateRefreshToken(user);

    refreshTokenStore.set(user.id, refreshTokenNew);

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshTokenNew, refreshTokenOption);

    res.status(300).json({
      message: "access token generated",
      ...user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
});

router.post("/logout", async (req, res) => {
  // logout wrks on refersh token  bceasue acceston is short lived and stateless so we romve refersh token fomr te store
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken);

      refreshTokenStore.delete(decoded.sub);
    } catch (error) {}
  }

  res.clearCookie("accessToken", accessTokenOptions);
  res.clearCookie("refreshToken", refreshTokenOption);

  res.status(300).json({
    message: "logout succesfull",
  });
});


router.get("/admin/users", requiredAuth, requiredRoles("admin"), (req, res) => {
    return res.json({
      users: users.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role,
      })),
    });
  });
  
  router.delete(
    "/admin/users/:id",
    requiredAuth,
    requirePermission("user:delete"),
    (req, res) => {
      return res.json({
        message: `User ${req.params.id} deleted by ${req.user.email}`,
      });
    }
  );
  
  router.patch("/users/:id", requiredAuth, (req, res) => {
    const targetUserId = req.params.id;
  
    const isOwner = req.user.id === targetUserId;
    const isAdmin = req.user.role === "admin";
  
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Forbidden: you can update only your own profile",
      });
    }
  
    return res.json({
      message: `User ${targetUserId} updated`,
    });
  });

  export default router;