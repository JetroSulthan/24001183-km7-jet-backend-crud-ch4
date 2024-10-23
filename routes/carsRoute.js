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
router.get("/edit/:id", upload.single("foto_mobil"), carController.editPage);
router.post("/edit/:id", upload.single("foto_mobil"), carController.updateCar);

module.exports = router;
