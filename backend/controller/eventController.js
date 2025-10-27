const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");
const cloudinary = require("../db/config/cloudinary");
const fs = require("fs");

async function getEvent(req, res, next) {
  try {
    const event = await pool.query(
      `SELECT * FROM event ORDER BY updated_at DESC`
    );
    res.status(200).json(event.rows);
  } catch (err) {
    next(err);
  }
}

async function addEvent(req, res, next) {
  try {
    console.log(req.body);
    let { event_title, event_description } = req.body;

    event_title = event_title?.trim();
    event_description = event_description?.trim();

    if (!event_title || !event_description) {
      throw createError("Missing Data!", 400);
    }
    let uploadResults = [];
    if (req.files && req.files.length !== 0) {
      uploadResults = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
          })
        )
      );
    }
    const event_photo = uploadResults.map((u) => u.secure_url);

    const result = await pool.query(
      `INSERT INTO event (event_title, event_description, event_photo) VALUES($1, $2, $3) RETURNING *`,
      [event_title, event_description, JSON.stringify(event_photo)]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Event added successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    let { event_id, event_title, event_description } = req.body;

    event_id = parseInt(event_id);
    event_title = event_title?.trim();
    event_description = event_description?.trim();

    if (isNaN(event_id)) {
      throw createError("Event id is required to update an event.", 400);
    }
    const existing = await pool.query(
      `SELECT * FROM event WHERE event_id = $1`,
      [event_id]
    );
    if (existing.rows.length === 0) {
      throw createError("Event not found", 404);
    }
    let updatedEvent = existing;
    if (event_title) {
      updatedEvent = await pool.query(
        `UPDATE event SET event_title = $2 WHERE event_id = $1 RETURNING *`,
        [event_id, event_title]
      );
    }
    if (event_description) {
      updatedEvent = await pool.query(
        `UPDATE event SET event_description = $2 WHERE event_id = $1 RETURNING *`,
        [event_id, event_description]
      );
    }
    if (req.files && req.files.length !== 0) {
      // Parse old photos safely as an array
      let oldPhotos = [];
      try {
        oldPhotos = existing.rows[0].event_photo;
        if (!Array.isArray(oldPhotos)) oldPhotos = [oldPhotos];
      } catch {
        oldPhotos = [];
      }
      // Delete old photos from Cloudinary
      for (const url of oldPhotos) {
        const publicId = url.split("/").pop().split(".")[0]; // extract Cloudinary public_id
        await cloudinary.uploader.destroy(
          `${process.env.CLOUDINARY_FOLDER_NAME}/${publicId}`
        );
      }

      const uploadResults = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
          })
        )
      );
      req.files.forEach((file) => fs.unlinkSync(file.path));
      const event_photo = uploadResults.map((u) => u.secure_url);

      updatedEvent = await pool.query(
        `UPDATE event SET event_photo = $2 WHERE event_id = $1 RETURNING *`,
        [event_id, JSON.stringify(event_photo)]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedEvent.rows[0],
      message: "Event updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    let { event_id } = req.body;
    event_id = parseInt(event_id);

    if (isNaN(event_id)) {
      throw createError("Event id is required to delete an event.", 400);
    }

    const existing = await pool.query(
      `SELECT * FROM event WHERE event_id = $1`,
      [event_id]
    );
    if (existing.rows.length === 0) {
      throw createError(`No event found with id ${event_id}!`, 404);
    }

    // Parse old photos safely as array
    let oldPhotos = [];
    try {
      oldPhotos = existing.rows[0].event_photo;
      if (!Array.isArray(oldPhotos)) oldPhotos = [oldPhotos];
    } catch {
      oldPhotos = [];
    }

    for (const url of oldPhotos) {
      const publicId = url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(
        `${process.env.CLOUDINARY_FOLDER_NAME}/${publicId}`
      );
    }

    const result = await pool.query(
      `DELETE FROM event WHERE event_id = $1 RETURNING *`,
      [event_id]
    );

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Event deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};
