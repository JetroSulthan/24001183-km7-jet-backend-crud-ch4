const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

//Route disini
router.get("/create", rentalController.createPage )
router.get("/update/:id", rentalController.updatePage )
router.post("/create", rentalController.createRentals )
router.post("/update/:id", rentalController.updateRental )
router.get("/", rentalController.getAllRentals);
router.get("/:id", rentalController.getRentalById);

module.exports = router;
