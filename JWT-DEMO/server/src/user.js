import bcrypt from "bcryptjs";

const passwordHash = bcrypt.hashSync("Password@123", 10);

export const users = [
  {
    id: "1",
    email: "admin@test.com",
    passwordHash,
    role: "admin",
    permissions: ["user:read", "user:delete", "article:create"],
  },
  {
    id: "2",
    email: "john@test.com",
    passwordHash,
    role: "user",
    permissions: ["article:create"],
  },
];


export const refreshTokenStore = new Map()