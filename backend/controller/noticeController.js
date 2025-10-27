const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");

async function getNotice(req, res, next) {
  try {
    const notice = await pool.query(
      `SELECT * FROM notice ORDER BY updated_at DESC`
    );
    res.status(200).json(notice.rows);
  } catch (err) {
    next(err);
  }
}

async function addNotice(req, res, next) {
  try {
    let { notice_title, notice_description } = req.body;

    notice_title = notice_title?.trim();
    notice_description = notice_description?.trim();

    if (!notice_title || !notice_description) {
      throw createError("Missing Data!", 400);
    }
    const result = await pool.query(
      `INSERT INTO notice (notice_title, notice_description) VALUES($1, $2) RETURNING *`,
      [notice_title, notice_description]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Notice added successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function updateNotice(req, res, next) {
  try {
    let { notice_id, notice_title, notice_description } = req.body;

    notice_id = parseInt(notice_id);
    notice_title = notice_title?.trim();
    notice_description = notice_description?.trim();

    if (isNaN(notice_id)) {
      throw createError("Notice id is required to update a notice.", 400);
    }
    const existing = await pool.query(
      `SELECT * FROM notice WHERE notice_id = $1`,
      [notice_id]
    );
    if (existing.rows.length === 0) {
      throw createError("Notice not found", 404);
    }
    let updatedNotice = existing;
    if (notice_title) {
      updatedNotice = await pool.query(
        `UPDATE notice SET notice_title = $2 WHERE notice_id = $1 RETURNING *`,
        [notice_id, notice_title]
      );
    }
    if (notice_description) {
      updatedNotice = await pool.query(
        `UPDATE notice SET notice_description = $2 WHERE notice_id = $1 RETURNING *`,
        [notice_id, notice_description]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedNotice.rows[0],
      message: "Notice updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteNotice(req, res, next) {
  try {
    let { notice_id } = req.body;
    notice_id = parseInt(notice_id);

    if (isNaN(notice_id)) {
      throw createError("Notice id is required to delete a notice.", 400);
    }

    const result = await pool.query(
      `DELETE FROM notice WHERE notice_id = $1 RETURNING *`,
      [notice_id]
    );

    if (result.rows.length === 0) {
      throw createError(`No notice found with id ${notice_id}!`, 404);
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Notice deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getNotice,
  addNotice,
  updateNotice,
  deleteNotice,
};
