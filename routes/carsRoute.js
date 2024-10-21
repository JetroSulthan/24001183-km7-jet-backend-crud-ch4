const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require("../middleware/uploader");

//Route disini
router.get("/", carController.getAllCars);
router.get("/create", carController.createPage);
router.post("/", upload.single("foto_mobil"), carController.createCar);

module.exports = router;
