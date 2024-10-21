const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require("../middleware/uploader");

//Route disini
router.get("/", carController.getAllCars);
router.get("/detail/:id", carController.getCarbyId);
router.get("/create", carController.createPage);
router.get("/delete/:id", carController.deleteCar);
router.post("/", upload.single("foto_mobil"), carController.createCar);

module.exports = router;
