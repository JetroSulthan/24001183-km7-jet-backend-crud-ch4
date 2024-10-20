const { Rental } = require("../models");
const { User, Car, Review } = require('../models');
const imagekit = require("../lib/imagekit");

/* RENTAL CONTROLLER
    Handling all process involving rentals

    *getAllRentals function
    Route : base_url/dashboard/rentals 
    Method : GET
    Input : -
    Process : Retrieve all rentals data including user data, car data, and review data from models
    output : Array of rental objects, return to rental index

    *getRentalById function
    Route : base_url/dashboard/rentals/:id 
    Method : GET
    Input : rental id
    Process : Retrieve specific rental data including user data, car data, and review data from models by id
    output : Array of rental object, return to rental detail

*/
const getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.findAll({
            include: [
                { model: User, attributes: ['name', 'email']},
                { model: Car, attributes: ['model', 'no_plat']},
                { model: Review, attributes: ['rating', 'komentar']},
            ],
            order: [['id', 'DESC']],
        });

        res.render("rentals/index", { layout: 'layout', rentals });
        
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `fetching rental data failed. Error: ${error}`,
        });
    }
}

const getRentalById = async (req, res) => {
    const rentalId = req.params.id; 
    try {
        const rental = await Rental.findOne({
            where: { id: rentalId }, 
            include: [
                { model: User, attributes: ['name', 'email'] },
                { model: Car, attributes: ['model', 'no_plat'] },
                { model: Review, attributes: ['rating', 'komentar'] },
            ]
        });

        if (!rental) {
            return res.status(404).json({
                status: "fail",
                message: "Rental not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: `Data rental fetched successfully`,
            data: rental
        });

        // res.render("rentals/detail", { layout: 'layout', rental });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `Fetching rental data failed. Error: ${error}`,
        });
    }
};

module.exports = {
    getAllRentals,
    getRentalById
};

