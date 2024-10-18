const { Review } = require("../models");

console.log(Review)

const getReviews = async (req, res) => {
    try{
        const reviews = await Review.findAll()
        console.log(reviews)
        res.render("/dashboard", {
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

module.exports = {
    getReviews,
};
