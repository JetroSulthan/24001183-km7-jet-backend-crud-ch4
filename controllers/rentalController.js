const { Rental } = require("../models");
const imagekit = require("../lib/imagekit");

const getAll = async (req, res) => {
    res.render("rentals/index", { layout: 'layout' });
    console.log("tes");
}

module.exports = {
    getAll,
};

