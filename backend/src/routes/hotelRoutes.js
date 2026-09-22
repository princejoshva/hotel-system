const express = require("express");

const router = express.Router();

const {
  getHotels, getHotelById, createHotel, updateHotel, deleteHotel
} = require("../controllers/hotelController");

const upload = require("../middleware/upload");

router.get("/", getHotels);

router.get("/:id", getHotelById);

router.post("/", upload.single("image"), createHotel);

router.put("/:id", upload.single("image"), updateHotel);

router.delete("/:id", deleteHotel);

module.exports = router;
