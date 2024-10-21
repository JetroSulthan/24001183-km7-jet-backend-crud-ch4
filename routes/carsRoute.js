const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require('../middleware/uploader');

//Route disini
router.get("/create", carController.createPage);
router.post("/", upload.single("foto_mobil"), carController.createCar);
router.get("/edit/:id", upload.single("foto_mobil"), carController.editPage);
router.post("/edit/:id", upload.single("foto_mobil"), carController.updateCar);

module.exports = router;