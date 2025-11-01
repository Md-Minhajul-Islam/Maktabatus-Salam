const cloudinary = require("../db/config/cloudinary");
const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");
const fs = require("fs");

async function getBook(req, res, next) {
  try {
    const book = await pool.query(`SELECT * FROM book ORDER BY book_id`);
    res.status(200).json(book.rows);
  } catch (err) {
    next(err);
  }
}

async function addBook(req, res, next) {
  try {
    let { book_id, book_title, book_description, book_status } = req.body;

    book_id = book_id?.trim().toUpperCase();
    book_title = book_title?.trim();
    book_description = book_description?.trim();
    book_status = book_status?.trim();

    if (
      !book_id ||
      !book_title ||
      !book_description ||
      !req.file ||
      !book_status
    ) {
      throw createError("Missing Data!", 400);
    }

    const existing = await pool.query(`SELECT * FROM book WHERE book_id = $1`, [
      book_id,
    ]);
    if (existing.rows.length > 0) {
      throw createError("Book Already Exists!", 409);
    }

    // Uploading photo to coludinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });

    const book_photo = uploadResult.secure_url;

    // deleting photo from local storage after upload
    fs.unlinkSync(req.file.path);

    const result = await pool.query(
      `INSERT INTO book (book_id, book_title, book_description, book_photo, book_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [book_id, book_title, book_description, book_photo, book_status]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Book added successfully",
    });
  } catch (err) {
    if(req.file) fs.unlinkSync(req.file.path);
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    let { book_id, book_title, book_description, book_status } = req.body;

    book_id = book_id?.trim().toUpperCase();
    book_title = book_title?.trim();
    book_description = book_description?.trim();
    book_status = book_status?.trim();

    if (!book_id) {
      throw createError("Book id is required to delete a book.", 400);
    }

    const existing = await pool.query(`SELECT * FROM book WHERE book_id = $1`, [
      book_id,
    ]);
    if (existing.rows.length === 0) {
      throw createError("Book not found", 404);
    }

    let updatedBook = existing;
    if (book_title) {
      updatedBook = await pool.query(
        `UPDATE book SET book_title = $2 WHERE book_id = $1 RETURNING *`,
        [book_id, book_title]
      );
    }
    if (book_description) {
      updatedBook = await pool.query(
        `UPDATE book SET book_description = $2 WHERE book_id = $1 RETURNING *`,
        [book_id, book_description]
      );
    }
    if (req.file) {
      // Delete old photo
      const oldPhotoUrl = existing.rows[0].book_photo;
      if (oldPhotoUrl) {
        const publicId = oldPhotoUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(
          `${process.env.CLOUDINARY_FOLDER_NAME}/${publicId}`
        );
      }

      // Uploading photo to coludinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      });
      const book_photo = uploadResult.secure_url;
      // deleting photo from local storage after upload
      fs.unlinkSync(req.file.path);

      updatedBook = await pool.query(
        `UPDATE book SET book_photo = $2 WHERE book_id = $1 RETURNING *`,
        [book_id, book_photo]
      );
    }
    if (book_status) {
      updatedBook = await pool.query(
        `UPDATE book SET book_status = $2 WHERE book_id = $1 RETURNING *`,
        [book_id, book_status]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedBook.rows[0],
      message: "Book updated successfully",
    });
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    let { book_id } = req.body;
    book_id = book_id?.trim().toUpperCase();

    if (!book_id) {
      throw createError("Book id is required to delete a book.", 400);
    }

    const existing = await pool.query(
      `SELECT * FROM book WHERE book_id = $1`,
      [book_id]
    );
    if (existing.rows.length === 0) {
      throw createError(`No book found with id ${book_id}!`, 404);
    }

    // Delete photos from Cloudinary
    const oldPhotoUrl = existing.rows[0].book_photo;
    if (oldPhotoUrl) {
      const publicId = oldPhotoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(
        `${process.env.CLOUDINARY_FOLDER_NAME}/${publicId}`
      );
    }

    const result = await pool.query(
      `DELETE FROM book WHERE book_id = $1 RETURNING *`,
      [book_id]
    );

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Book deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getBook,
  addBook,
  updateBook,
  deleteBook,
};
