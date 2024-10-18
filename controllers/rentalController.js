const { Rental, Car, User } = require("../models")

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




module.exports = {
    createRentals,
    getData
};