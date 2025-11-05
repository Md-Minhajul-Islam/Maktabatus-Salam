const pool = require("../db/config/dbConfig");
const { createError } = require("../middlewares/common/errorHandler");

async function getBlog(req, res, next) {
  try {
    const blogs = await pool.query(
      `SELECT * FROM blog ORDER BY updated_at DESC`
    );
    res.status(200).json(blogs.rows);
  } catch (err) {
    next(err);
  }
}

async function addBlog(req, res, next) {
  try {
    let { blog_title, blog_description } = req.body;

    blog_title = blog_title?.trim();
    blog_description = blog_description?.trim();

    if (!blog_title || !blog_description) {
      throw createError("Missing Data!", 400);
    }
    const result = await pool.query(
      `INSERT INTO blog (blog_title, blog_description) VALUES($1, $2) RETURNING *`,
      [blog_title, blog_description]
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Blog added successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function updateBlog(req, res, next) {
  try {
    let { blog_id, blog_title, blog_description } = req.body;

    blog_id = parseInt(blog_id);
    blog_title = blog_title?.trim();
    blog_description = blog_description?.trim();

    if (isNaN(blog_id)) {
      throw createError("Blog id is required to update a blog.", 400);
    }
    const existing = await pool.query(`SELECT * FROM blog WHERE blog_id = $1`, [
      blog_id,
    ]);
    if (existing.rows.length === 0) {
      throw createError("Blog not found", 404);
    }
    let updatedBlog = existing;
    if (blog_title) {
      updatedBlog = await pool.query(
        `UPDATE blog SET blog_title = $2 WHERE blog_id = $1 RETURNING *`,
        [blog_id, blog_title]
      );
    }
    if (blog_description) {
      updatedBlog = await pool.query(
        `UPDATE blog SET blog_description = $2 WHERE blog_id = $1 RETURNING *`,
        [blog_id, blog_description]
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedBlog.rows[0],
      message: "Blog updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteBlog(req, res, next) {
  try {
    let { blog_id } = req.body;
    blog_id = parseInt(blog_id);
    
    if (isNaN(blog_id)) {
      throw createError("Blog id is required to delete a blog.", 400);
    }

    const result = await pool.query(
      `DELETE FROM blog WHERE blog_id = $1 RETURNING *`,
      [blog_id]
    );

    if (result.rows.length === 0) {
      throw createError(`No blog found with id ${blog_id}!`, 404);
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Blog deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
};
