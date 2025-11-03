const pool = require("../db/config/dbConfig");
const bcrypt = require("bcrypt");
const { createError } = require("../middlewares/common/errorHandler");

async function getUser(req, res, next) {
  try {
    const users = await pool.query(
      `SELECT * FROM users`
    );
    res.status(200).json(users.rows);
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  try {
    let { username, password } = req.body;

    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      throw createError("All fields are required!", 400);
    }
    const existing = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (existing.rows.length > 0) {
      throw createError("User already exists with this email.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
    );

    res.status(201).json({
      status: "success",
      message: "User added successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    let { username } = req.body;

    username = username?.trim();

    if (!username) {
      throw createError("Username is required!", 400);
    }

    const result = await pool.query(
      `DELETE FROM users WHERE username = $1 RETURNING *`,
      [username]
    );

    if (result.rows.length === 0) {
      throw createError(`No user found with username ${username}!`, 404);
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "User removed successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  addUser,
  deleteUser,
};
