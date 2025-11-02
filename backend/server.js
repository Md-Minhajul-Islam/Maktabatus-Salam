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
const analyzerRoute = require("./router/analyzerRoute");
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

app.use(
  cors({
    origin: [process.env.ORIGIN_1, process.env.ORIGIN_2, process.env.ORIGIN_3],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/analyzer", analyzerRoute);

// common error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
