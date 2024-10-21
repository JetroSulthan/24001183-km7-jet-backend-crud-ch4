const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require('../middleware/uploader');

//Route disini

router.patch("/:id", upload.single("foto_mobil"), carController.updateCar);

module.exports = router;