const path = require("path");

async function healthCheck(req, res) {
  try {
    res.render("dashboard");
  } catch (error) {
    res.status(404).sendFile(path.join(__dirname, "views/errors", "404.html"));
  }
}

module.exports = {
  healthCheck,
};
