const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const path = require("path");


async function editPage(req, res) {
    try {
        const id = req.params.id;
        const detailCar = await Car.findByPk(id);
        if (!detailCar) {
            return res.status(404).json({
                status: "Fail",
                message: "Can't find spesific car",
                isSuccess: false,
                data: null,
            });
        }    
        res.render("cars/edit", {detailCar})    
    } 
    catch (error) {
        res.status(404).sendFile(path.join(__dirname, "../views/errors", "404.html"));
    }
}

async function updateCar(req, res) {
    try {
        const id = req.params.id;
        const file = req.file;
        const split = file.originalname.split(".");
        const ext = split[split.length - 1];
        const {model, tahun, no_plat, status, harga} = req.body;
        
        const detailCar = await Car.findByPk(id);
        if (!detailCar) {
            return res.status(404).json({
                status: "Fail",
                message: "Can't find spesific car",
                isSuccess: false,
                data: null,
            });
        }    

        const uploadedImage = await imagekit.upload({
            file : file.buffer,
            fileName: `${split[0]}-${Date.now()}.${ext}`
        })

        if (!uploadedImage) {
            return res.status(400).sendFile(path.join(__dirname, "../views/errors", "400.html"));
        }

        detailCar.model = model, 
        detailCar.tahun = tahun, 
        detailCar.no_plat = no_plat, 
        detailCar.status = status, 
        detailCar.harga = harga, 
        detailCar.foto_mobil = uploadedImage.url

        await detailCar.save();
        
        res.status(200).json({
            status: "Success",
            message: "Successfully added car data",
            isSuccess: true,
            data: { detailCar },
        });
    } 
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
}
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
    editPage,
    updateCar,
    createPage,
    createCar,
};