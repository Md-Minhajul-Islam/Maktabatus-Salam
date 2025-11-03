const pool = require("../db/config/dbConfig");

async function dashboard(req, res, next) {
    try {
        const blogs = await pool.query(`SELECT COUNT(*) FROM blog`);
        const notices = await pool.query(`SELECT COUNT(*) FROM notice`);
        const events = await pool.query(`SELECT COUNT(*) FROM event`);
        const books = await pool.query(`SELECT COUNT(*) FROM book`);
        
        res
          .status(200)
          .json({
            blogs: parseInt(blogs.rows[0].count),
            notices: parseInt(notices.rows[0].count),
            events: parseInt(events.rows[0].count),
            books: parseInt(books.rows[0].count),
          });
    } catch (err) {
        next(err);
    }
}

module.exports = dashboard;