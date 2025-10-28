const pool = require("../db/config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../middlewares/common/errorHandler");

async function register(req, res, next) {
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
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    let { username, password } = req.body;

    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      throw createError("Email and password required!", 400);
    }

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      throw createError("Invalid email or password", 401);
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      throw createError("Invalid email or password!", 401);
    }

    const token = jwt.sign(
      { username: user.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("msToken", token, {
      httpOnly: true,
      secure: true, // must be true in production
      sameSite: "none", // allows cross-site cookies
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { username: user.rows[0].username },
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie("msToken");
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  logout,
};
