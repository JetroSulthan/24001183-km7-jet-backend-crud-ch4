const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");

//Route disini
router.get('/', reviewController.getReviews)
router.get("/create-review", reviewController.createPage);
router.post("/create-review", reviewController.createReview);

module.exports = router;