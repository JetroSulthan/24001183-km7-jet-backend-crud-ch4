const express = require('express');
const router = express.Router();
const rentalController = require("../controllers/rentalController");

//Route disini
router.get("/", rentalController.getAllRentals);
// router.get("/:id", rentalController.getById);
module.exports = router;