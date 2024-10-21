const { Car } = require("../models");
const imagekit = require("../lib/imagekit");

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
            return res.status(400).json({
                status: "Fail",
                message: "Fail to upload image",
                isSuccess: false,
                data: null,
            });
        }

        const newCar = await Car.create({
            model, 
            tahun, 
            no_plat, 
            status, 
            harga, 
            foto_mobil: uploadedImage.url
        });
        res.status(200).json({
            status: "Success",
            message: "Successfully added car data",
            isSuccess: true,
            data: { newCar, foto_mobil: uploadedImage.url },
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

module.exports = {
    createCar,
};