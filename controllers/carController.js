const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const { get } = require("../routes");

async function getCarbyId(req, res) {
  try {
    // Mendapatkan id dari parameter URL
    const id = req.params.id;
    // Mencari mobil berdasarkan ID menggunakan findByPk
    const car = await Car.findByPk(id); // Atau bisa gunakan findOne({ where: { id } })
    // Jika mobil tidak ditemukan
    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    // Jika mobil ditemukan, render halaman detail mobil
    res.render("cars/detail", { car });
  } catch (error) {
    // Jika terjadi error
    return res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getAllCars(req, res) {
  try {
    const cars = await Car.findAll();
    res.render("cars", { cars });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function createPage(req, res) {
  try {
    res.render("cars/create");
  } catch (error) {
    res
      .status(404)
      .sendFile(path.join(__dirname, "../views/errors", "404.html"));
  }
}

async function createCar(req, res) {
  try {
    const file = req.file;
    const split = file.originalname.split(".");
    const ext = split[split.length - 1];
    const { model, tahun, no_plat, status, harga } = req.body;

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: `${split[0]}-${Date.now()}.${ext}`,
    });
    if (!uploadedImage) {
      return res
        .status(400)
        .sendFile(path.join(__dirname, "../views/errors", "400.html"));
    }

    const newCar = await Car.create({
      model,
      tahun,
      no_plat,
      status,
      harga,
      foto_mobil: uploadedImage.url,
    });
    res.redirect("/dashboard/cars");
  } catch (error) {
    res
      .status(500)
      .sendFile(path.join(__dirname, "../views/errors", "500.html"));
  }
}

async function deleteCar(req, res) {
  try {
    const id = req.params.id;
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }
    await car.destroy();

    res.redirect("/dashboard/cars");
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}
module.exports = {
  createPage,
  createCar,
  getAllCars,
  getCarbyId,
  deleteCar,
};
