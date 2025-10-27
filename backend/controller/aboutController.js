const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");

async function getAbout(req, res, next) {
  try {
    const about = await pool.query(
      `SELECT * FROM about ORDER BY about_id`
    );
    res.status(200).json(about.rows);
  } catch (err) {
    next(err);
  }
}

async function addAbout(req, res, next) {
  try {
    let { about_title, about_description } = req.body;

    about_title = about_title?.trim();
    about_description = about_description?.trim();

    if (!about_title || !about_description) {
      throw createError("Missing Data!", 400);
    }
    const result = await pool.query(
      `INSERT INTO about (about_title, about_description) VALUES($1, $2) RETURNING *`,
      [about_title, about_description]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "About added successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function updateAbout(req, res, next) {
  try {
    let { about_id, about_title, about_description } = req.body;

    about_id = parseInt(about_id);
    about_title = about_title?.trim();
    about_description = about_description?.trim();

    if (isNaN(about_id)) {
      throw createError("About id is required to update an about.", 400);
    }
    const existing = await pool.query(
      `SELECT * FROM about WHERE about_id = $1`,
      [about_id]
    );
    if (existing.rows.length === 0) {
      throw createError("About not found", 404);
    }
    let updatedAbout = existing;
    if (about_title) {
      updatedAbout = await pool.query(
        `UPDATE about SET about_title = $2 WHERE about_id = $1 RETURNING *`,
        [about_id, about_title]
      );
    }
    if (about_description) {
      updatedAbout = await pool.query(
        `UPDATE about SET about_description = $2 WHERE about_id = $1 RETURNING *`,
        [about_id, about_description]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedAbout.rows[0],
      message: "About updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteAbout(req, res, next) {
  try {
    let { about_id } = req.body;
    about_id = parseInt(about_id);

    if (isNaN(about_id)) {
      throw createError("About id is required to delete an about.", 400);
    }

    const result = await pool.query(
      `DELETE FROM about WHERE about_id = $1 RETURNING *`,
      [about_id]
    );

    if (result.rows.length === 0) {
      throw createError(`No about found with id ${about_id}!`, 404);
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "About deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAbout,
  addAbout,
  updateAbout,
  deleteAbout,
};
