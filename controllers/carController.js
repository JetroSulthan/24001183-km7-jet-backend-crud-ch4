const { Car } = require("../models");
const imagekit = require("../lib/imagekit");

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
            return res.status(400).json({
                status: "Fail",
                message: "Fail to upload image",
                isSuccess: false,
                data: null,
            });
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

module.exports = {
    updateCar
};