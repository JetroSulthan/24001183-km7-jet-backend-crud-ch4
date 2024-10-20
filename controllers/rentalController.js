const { Rental } = require("../models");
const { User, Car, Review } = require('../models');
const imagekit = require("../lib/imagekit");

const getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.findAll({
            include: [
                { model: User, attributes: ['name', 'email']},
                { model: Car, attributes: ['model', 'no_plat']},
                { model: Review, attributes: ['rating', 'komentar']},
            ]
        });

        res.status(200).json({
            status: "success",
            message: "Rental data fetched successfully",
            data: rentals,
        });
        console.log(rentals);

        // TO DO : KEMBALIKAN DATA KE view index rentals
        // res.render("rentals/index", { layout: 'layout' });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `fetching rental data failed. Error: ${error}`,
        });
    }
}

module.exports = {
    getAllRentals,
};

