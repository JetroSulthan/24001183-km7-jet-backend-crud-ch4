const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");

//Route disini
router.get('/', reviewController.getReviews)

module.exports = router;