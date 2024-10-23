// ==========================================
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const path = require("path");
// const cors = require("cors");
// ==========================================
const indexRoute = require("./routes");
// ==========================================
const app = express();
const port = process.env.DB_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
// app.use(cors());
// ==========================================
app.use(express.static(`${__dirname}/public`));

app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.set("layout", "layout");
// ==========================================
app.use("/dashboard", indexRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, "views/errors", "500.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views/errors", "404.html"));
});
// ==========================================
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
