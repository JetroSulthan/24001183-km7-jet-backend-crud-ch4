const express = require('express');
const router = express.Router();
const rentalController = require("../controllers/rentalController");

//Route disini
router.get("/create-rental", rentalController.getData )
router.post("/create-rental", rentalController.createRentals )

module.exports = router;