const { Car } = require("../models");
const imagekit = require("../lib/imagekit");


async function createPage(req, res) {
    try {
        res.render("cars/create")    
    } 
    catch (error) {
        res.status(404).sendFile(path.join(__dirname, "../views/errors", "404.html"));
    }
}

async function createCar(req, res) {
    try {
        const file = req.file;
        const split = file.originalname.split(".");
        const ext = split[split.length - 1];
        const {model, tahun, no_plat, status, harga} = req.body;    

        const uploadedImage = await imagekit.upload({
            file : file.buffer,
            fileName: `${split[0]}-${Date.now()}.${ext}`
        })

        if (!uploadedImage) {
            return res.status(400).sendFile(path.join(__dirname, "../views/errors", "400.html"));
        }

        const newCar = await Car.create({
            model, 
            tahun, 
            no_plat, 
            status, 
            harga, 
            foto_mobil: uploadedImage.url
        });
        res.redirect("/dashboard/cars")
    } 
    catch (error) {
        res.status(500).sendFile(path.join(__dirname, "../views/errors", "500.html"));
    }
}

module.exports = {
    createPage,
    createCar,
};