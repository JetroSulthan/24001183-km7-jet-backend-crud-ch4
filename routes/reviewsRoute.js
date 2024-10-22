const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");

//Route disini
router.get('/', reviewController.getReviews);
router.get("/create-review", reviewController.createPage);
router.post("/create-review", reviewController.createReview);
router.get("/update-review/:id", reviewController.updatePage);
router.post("/update-review/:id", reviewController.updateReview);
router.get('/delete/:id', reviewController.deleteReviews);
router.get('/detail/:id', reviewController.getReviewsById);

module.exports = router;