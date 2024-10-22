const { Review, Rental, Car, User } = require('../models');

const getReviews = async (req, res) => {
    try{
        const reviews = await Review.findAll({
            order: [['id', 'ASC']]
        })
        console.log(reviews)
        res.render("reviews/index", {
            title: "Reviews",
            reviews
        })
    }
    catch(error){
        res.render('error', {
            message: error.message,
        })
    }
};

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
        res.redirect("/dashboard/reviews");
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
};

async function updateReview(req, res) {
    const { rating, komentar, tgl_review } = req.body;
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        review.rating = rating;
        review.komentar = komentar;
        review.tgl_review = tgl_review || new Date();
        await review.save();
        res.redirect(`/dashboard/reviews`);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
};

async function updatePage(req, res) {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        const rentals = await Rental.findAll();
        res.render("reviews/update-review", { layout: 'layout', review, rentals });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
};

const deleteReviews = async (req, res) => {
    const id = req.params.id
    try {
        const review = await Review.findByPk(id)

        if (!review) {
            return res.status(404).send("Review not found")
        }

        await review.destroy()
        res.redirect('/dashboard/reviews')
    } catch (error) {
        res.status(500).send({ 
            message: error.message 
        })
    }
}

const getReviewsById = async (req, res) => {
    const id = req.params.id
    try{
        const review = await Review.findByPk(id, {
            include: [
                {
                    model: Rental,
                    include: [
                        {
                            model: Car,
                            attributes: ['model', 'foto_mobil']
                        },
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ],
                    attributes: ['total_harga']
                }
            ]
        })

        if(!review){
            return res.status(404).send("Failed get review")
        }

        res.render('reviews/detail' , { review })
    }
    catch(error){
        res.status(500).send({ 
            message: error.message 
        })
    }
}


module.exports = {
    getReviews,
    createReview,
    createPage,
    updateReview,
    updatePage,
    deleteReviews,
    getReviewsById
};
