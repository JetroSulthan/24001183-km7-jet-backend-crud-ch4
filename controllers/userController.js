const { User } = require("../models");
const imagekit = require("../lib/imagekit");

async function readAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.render('users', { users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getUserbyId(req, res) {
  try {
      const id = req.params.id;

      // Ambil data user berdasarkan ID
      const user = await User.findByPk(id);

      // Jika user tidak ditemukan
      if (!user) {
        return res.status(404).json({
          status: "Fail",
          message: "User not found",
          isSuccess: false,
          data: null,
        });
      }

      // Render detail user tanpa cek role
      res.render('users/detail', { user }); 
  } catch (error) {
      console.error(error); // Log kesalahan untuk debugging
      res.status(500).json({
          status: "Failed",
          message: error.message,
          isSuccess: false,
          error: error.message
      });
  }
}

const createUser = async (req, res) => {
  const { name, email, password, phone, alamat, role } = req.body;

  try {
    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const uploadedPhotoProfile = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        extension: ext,
      });
      req.body.foto_profil = uploadedPhotoProfile.url;
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      alamat,
      role,
      foto_profil: req.body.foto_profil,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, alamat, role } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
    }

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const uploadedPhotoProfile = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        extension: ext,
      });
      req.body.foto_profil = uploadedPhotoProfile.url;
    }

    const updatedUser = await user.update({
      name,
      email,
      password,
      phone,
      alamat,
      role,
      foto_profil: req.body.foto_profil,
    });

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  readAllUsers,
  createUser,
  updateUser,
  getUserbyId,
};
