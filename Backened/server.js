const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const authRouter = require("./routes/Auth-router.js");
const connectDB = require("./utils/db.js");
const notesRouter = require("./routes/notes.js");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

connectDB();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use("/Auth", authRouter);
app.use("/Note", notesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
