// npm init -y
// npm install express pg dotenv


PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=mydb


src/config/db.js


const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;







src/queries/userQueries.js

const pool = require("../config/db");

// CREATE
const createUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [name, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// READ ALL
const getAllUsers = async () => {
  const query = `SELECT * FROM users ORDER BY id ASC;`;
  const result = await pool.query(query);
  return result.rows;
};

// READ ONE
const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// UPDATE
const updateUser = async (id, name, email) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3
    RETURNING *;
  `;

  const values = [name, email, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE
const deleteUser = async (id) => {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};







src/controllers/userController.js

const userQueries = require("../queries/userQueries");

// CREATE
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const user = await userQueries.createUser(name, email);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

// READ ALL
const getAllUsers = async (req, res) => {
  try {
    const users = await userQueries.getAllUsers();

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// READ ONE
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userQueries.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await userQueries.updateUser(id, name, email);

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userQueries.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};





const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);      // create
router.get("/", userController.getAllUsers);      // read all
router.get("/:id", userController.getUserById);   // read one
router.put("/:id", userController.updateUser);    // update
router.delete("/:id", userController.deleteUser); // delete

module.exports = router;



//indexong

CREATE INDEX idx_users_name ON users(name);

You run this in PostgreSQL client, pgAdmin, DBeaver, psql, or migration file.