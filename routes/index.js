const express = require('express');
const router = express.Router();

//test controller
const indexController = require("../controllers/indexController");

//test route
router.use('/test', indexController.healthCheck)

// Import semua route
const usersRoute = require('./usersRoute');
const carsRoute = require('./carsRoute');
const rentalsRoute = require('./rentalsRoute');
const reviewsRoute = require('./reviewsRoute');

// Menggabungkan semua route
router.use('/users', usersRoute);
router.use('/cars', carsRoute);
router.use('/rentals', rentalsRoute);
router.use('/reviews', reviewsRoute);

module.exports = router;