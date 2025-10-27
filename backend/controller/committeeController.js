const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");

async function getCommittee(req, res, next) {
  try {
    const committee = await pool.query(
      `SELECT * FROM committee ORDER BY committee_id`
    );
    res.status(200).json(committee.rows);
  } catch (err) {
    next(err);
  }
}

async function addCommittee(req, res, next) {
  try {
    let { committee_title, committee_description } = req.body;

    committee_title = committee_title?.trim();
    committee_description = committee_description?.trim();

    if (!committee_title || !committee_description) {
      throw createError("Missing Data!", 400);
    }
    
    const result = await pool.query(
      `INSERT INTO committee (committee_title, committee_description) VALUES($1, $2) RETURNING *`,
      [committee_title, committee_description]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Committee added successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function updateCommittee(req, res, next) {
  try {
    let { committee_id, committee_title, committee_description } = req.body;

    committee_id = parseInt(committee_id);
    committee_title = committee_title?.trim();
    committee_description = committee_description?.trim();

    if (isNaN(committee_id)) {
      throw createError(
        "Committee id is required to update an committee.",
        400
      );
    }
    const existing = await pool.query(
      `SELECT * FROM committee WHERE committee_id = $1`,
      [committee_id]
    );
    if (existing.rows.length === 0) {
      throw createError("Committee not found", 404);
    }
    let updatedCommittee = existing;
    if (committee_title) {
      updatedCommittee = await pool.query(
        `UPDATE committee SET committee_title = $2 WHERE committee_id = $1 RETURNING *`,
        [committee_id, committee_title]
      );
    }
    if (committee_description) {
      updatedCommittee = await pool.query(
        `UPDATE committee SET committee_description = $2 WHERE committee_id = $1 RETURNING *`,
        [committee_id, committee_description]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedCommittee.rows[0],
      message: "Committee updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCommittee(req, res, next) {
  try {
    let { committee_id } = req.body;
    committee_id = parseInt(committee_id);

    if (isNaN(committee_id)) {
      throw createError(
        "Committee id is required to delete an committee.",
        400
      );
    }

    const result = await pool.query(
      `DELETE FROM committee WHERE committee_id = $1 RETURNING *`,
      [committee_id]
    );

    if (result.rows.length === 0) {
      throw createError(`No committee found with id ${committee_id}!`, 404);
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Committee deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCommittee,
  addCommittee,
  updateCommittee,
  deleteCommittee,
};
