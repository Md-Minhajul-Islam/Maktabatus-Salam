require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const quranRouter = require("./router/quranRouter");
const blogRouter = require("./router/blogRouter");
const aboutRouter = require("./router/aboutRouter");
const noticeRouter = require("./router/noticeRouter");
const committeeRouter = require("./router/committeeRouter");
const eventRouter = require("./router/eventRouter");
const bookRouter = require("./router/bookRouter");
const loginRouter = require("./router/loginRouter");
const checkRouter = require("./router/checkRouter");
const donationRouter = require("./router/donationRouter");
const { errorHandler } = require("./middlewares/common/errorHandler");
const pool = require("./db/config/dbConfig");

const app = express();
const port = process.env.PORT || 5000;

// pool
//   .connect()
//   .then((client) => {
//     console.log("Connected to Supabase Postgres!");
//     client.release();
//   })
//   .catch((err) => console.error("Connection error:", err.message));

// origin: "http://localhost:5173",
// https://maktabatus-salam-4msg286pe-md-minhajul-islams-projects-4d6dedcd.vercel.app
//https://maktabatus-salam.vercel.app
app.use(
  cors({
    origin: ["http://localhost:5173", "https://maktabatus-salam.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/quran", quranRouter);
app.use("/blog", blogRouter);
app.use("/about", aboutRouter);
app.use("/notice", noticeRouter);
app.use("/committee", committeeRouter);
app.use("/event", eventRouter);
app.use("/book", bookRouter);
app.use("/login", loginRouter);
app.use("/check", checkRouter);
app.use("/donation", donationRouter);

// common error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
