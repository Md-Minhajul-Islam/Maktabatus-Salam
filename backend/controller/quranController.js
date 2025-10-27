const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");

async function getQuran(req, res, next) {
  try {
    const quranic_verse = await pool.query(
      `SELECT * FROM quran ORDER BY verse_no`
    );
    res.status(200).json(quranic_verse.rows);
  } catch (err) {
    next(err);
  }
}

async function addQuran(req, res, next) {
  try {
    let { verse_no, verse_arabic, verse_bangla } = req.body;

    verse_no = verse_no?.trim();
    verse_arabic = verse_arabic?.trim();
    verse_bangla = verse_bangla?.trim();

    if (!verse_no || !verse_arabic || !verse_bangla) {
      throw createError("Missing Data!", 400);
    }
    if (verse_no.length != 6) {
      throw createError("Verse no must be in given format.", 400);
    }
    const existing = await pool.query(
      `SELECT * FROM quran WHERE verse_no = $1`,
      [verse_no]
    );
    if (existing.rows.length > 0) {
      throw createError("Verse Already Exists!", 409);
    }
    const result = await pool.query(
      `INSERT INTO quran (verse_no, verse_arabic, verse_bangla)
      VALUES($1, $2, $3) RETURNING *`,
      [verse_no, verse_arabic, verse_bangla]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Verse added successfully!",
    });
  } catch (err) {
    next(err);
  }
}

async function updateQuran(req, res, next) {
  try {
    let { verse_no, verse_arabic, verse_bangla } = req.body;

    verse_no = verse_no?.trim();
    verse_arabic = verse_arabic?.trim();
    verse_bangla = verse_bangla?.trim();

    if (!verse_no) {
      throw createError("verse_no is required to update a verse.", 400);
    }
    const existing = await pool.query(
      `SELECT * FROM quran WHERE verse_no = $1`,
      [verse_no]
    );
    if (existing.rows.length === 0) {
      throw createError("Verse not found", 404);
    }
    let updatedVerse = existing;
    if (verse_arabic) {
      updatedVerse = await pool.query(
        `UPDATE quran SET verse_arabic = $2 WHERE verse_no = $1 RETURNING *`,
        [verse_no, verse_arabic]
      );
    }
    if (verse_bangla) {
      updatedVerse = await pool.query(
        `UPDATE quran SET verse_bangla = $2 WHERE verse_no = $1 RETURNING *`,
        [verse_no, verse_bangla]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedVerse.rows[0],
      message: "Verse updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteQuran(req, res, next) {
  try {
    let { verse_no } = req.body;

    verse_no = verse_no?.trim();

    if (!verse_no) {
      throw createError("Verse no is required to delete a verse.", 400);
    }

    const result = await pool.query(
      `DELETE FROM quran WHERE verse_no = $1 RETURNING *`,
      [verse_no]
    );

    if (result.rows.length === 0) {
      throw createError(`No verse found with verse no ${verse_no}!`, 404);
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Verse deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getQuran,
  addQuran,
  updateQuran,
  deleteQuran,
};
