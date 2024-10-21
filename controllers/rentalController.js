
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

async function createRentals(req, res) {
    const { car_id, user_id, tgl_peminjaman, tgl_pengembalian, total_harga, status } = req.body;
    try {
        // Check if the car is still available
        const car = await Car.findOne({ where: { id: car_id} });

        if (!car) {
            return res.status(400).json({ message: 'Car is not available for rental.' });
        }

        // Insert the rental into the rentals table
        const newRental = {
            user_id,
            car_id,
            tgl_peminjaman,
            tgl_pengembalian,
            total_harga,
            status,
        };

        await Rental.create(newRental)
        res.status(200).json({
            status: "Success",
            message: "Succes send data",
            isSuccess: true
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
};

async function getData (req, res) {
    try {
        // Fetch all available cars
        const cars = await Car.findAll({ where: { status: "tersedia" } });
        const users = await User.findAll()
        
        // Render the 'cars' view and pass the cars data to it
        res.render('rentals/create-rentals.ejs', {cars, users });
    } catch (error) {
        console.error(error);
        res.render('errors/500', {
            message: error.message
        });
    }
}

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

        res.render("rentals/details", { layout: 'layout', rental });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `Fetching rental data failed. Error: ${error}`,
        });
    }
};

module.exports = {
    getAllRentals,
    getRentalById,
    createRentals,
    getData
};
