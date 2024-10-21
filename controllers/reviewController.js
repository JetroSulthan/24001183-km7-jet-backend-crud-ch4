const { Review } = require("../models");
const { Rental } = require("../models");

async function createReview(req, res) {
    const { rental_id, rating, komentar, tgl_review } = req.body;
    try {
        const newReview = {
            rental_id,
            rating,
            komentar,
            tgl_review: tgl_review || new Date()
        };
        await Review.create(newReview)
        res.redirect("create-review");
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
};
async function createPage(req, res) {
    try {
        const rentals = await Rental.findAll();
        res.render("reviews/create-review", { layout: 'layout', rentals});
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
}
module.exports = {
    createReview,
    createPage
};