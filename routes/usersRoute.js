const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploader");

//Route disini

router.post("/", upload.single("foto_profil"), userController.createUser);
router.patch("/:id", upload.single("foto_profil"), userController.updateUser);

module.exports = router;
