
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
        const car = await Car.findOne({ where: { id: car_id} });

        if (!car) {
            return res.status(400).json({ message: 'Car is not available for rental.' });
        }

        const newRental = {
            user_id,
            car_id,
            tgl_peminjaman,
            tgl_pengembalian,
            total_harga,
            status,
        };

        await Rental.create(newRental)
        res.redirect("/dashboard/rentals");
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
};

async function updateRental(req, res) {
    const rental_id = req.params.id;
    const { car_id, user_id, tgl_peminjaman, tgl_pengembalian, total_harga, status } = req.body;

    try {
        const rental = await Rental.findOne({ where: { id: rental_id } });

        if (!rental) {
            return res.status(404).json({ message: 'Rental not found.' });
        }

        if (car_id) {
            const car = await Car.findOne({ where: { id: car_id } });
            if (!car) {
                return res.status(400).json({ message: 'New car is not available for rental.' });
            }
        }

        const updatedRentalData = {
            user_id: user_id || rental.user_id,
            car_id: car_id || rental.car_id,
            tgl_peminjaman: tgl_peminjaman || rental.tgl_peminjaman,
            tgl_pengembalian: tgl_pengembalian || rental.tgl_pengembalian,
            total_harga: total_harga || rental.total_harga,
            status: status || rental.status,
        };

        await rental.update(updatedRentalData);

        res.redirect('/dashboard/rentals')
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false
        });
    }
};

async function updatePage(req, res) {
    const rental_id = req.params.id;

    try {
        const rental = await Rental.findOne({ 
            where: { id: rental_id }
        });

        if (!rental) {
            return res.status(404).render('errors/404.html', { message: 'Rental not found.', isSuccess: false });
        }
        
        res.render('rentals/update', { rental });
    } catch (error) {
        res.status(500).render('errors/500', { message: error.message, isSuccess: false });
    }
}

async function createPage (req, res) {
    try {
        const cars = await Car.findAll({ where: { status: "tersedia" } });
        const users = await User.findAll()
        
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
    updateRental,
    updatePage,
    createPage
};
