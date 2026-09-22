
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

const getHotels = async (req, res) => {
  try {
    const {
      search = "",minPrice = "",maxPrice = "",offset = 0,limit = 6
    } = req.query;

    const pageOffset = Math.max(
      0,parseInt(offset,10) || 0
    );

    const pageLimit = Math.max(
      1,parseInt(limit,10) || 6
    );

    let query =`SELECT * FROM hotels WHERE 1=1`;

    const values = [];
    let index = 1;

    if (search.trim() !== "") {
      query += ` AND title ILIKE $${index}`;
      values.push(`%${search.trim()}%`);
      index++;
    }

    if (minPrice !== "") {
      const price = Number(minPrice);

      if (!Number.isNaN(price)) {
        query += ` AND price >= $${index}`;values.push(price);index++;
      }
    }

    if (maxPrice !== "") {
      const price = Number(maxPrice);

      if (!Number.isNaN(price)) {
        query += ` AND price <= $${index}`;values.push(price);index++;
      }
    }

    query += ` ORDER BY id DESC LIMIT $${index} OFFSET $${index + 1}`;

    values.push(pageLimit);
    values.push(pageOffset);

    const result = await pool.query(query, values);

    let countQuery = `SELECT COUNT(*) AS total FROM hotels WHERE 1 = 1`;

    const countValues = [];
    let countIndex = 1;

    if (search.trim() !== "") {
      countQuery += ` AND title ILIKE $${countIndex}`;
      countValues.push(`%${search.trim()}%`);
      countIndex++;
    }

    if (minPrice !== "") {
      const price = Number(minPrice);

      if (!Number.isNaN(price)) {
        countQuery += ` AND price >= $${countIndex}`;
        countValues.push(price);
        countIndex++;
      }
    }

    if (maxPrice !== "") {
      const price = Number(maxPrice);

      if (!Number.isNaN(price)) {
        countQuery += ` AND price <= $${countIndex}`;
        countValues.push(price);
        countIndex++;
      }
    }

    const countResult = await pool.query(
      countQuery,countValues
    );

    const total = Number(
      countResult.rows[0].total
    );

    res.status(200).json({
      success: true,
      hotels: result.rows,
      total,
      offset: pageOffset,
      limit: pageLimit
    });
  } catch (error) {
    console.error("Get hotels error:", error);

    res.status(500).json({
      success: false,message: error.message
    });
  }
};


const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,message: "Hotel not found"
      });
    }

    res.status(200).json({
      success: true,data: result.rows[0]
    });
  } catch (error) {
    console.error("Get hotel error:", error);

    res.status(500).json({
      success: false,message: error.message
    });
  }
};


const createHotel = async (req, res) => {
  try {
    const {
      title,description,latitude,longitude,price} = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Description is required"
      });
    }

    if (latitude === undefined || latitude === "") {
      return res.status(400).json({
        message: "Latitude is required"
      });
    }

    if (longitude === undefined || longitude === "") {
      return res.status(400).json({
        message: "Longitude is required"
      });
    }

    if (price === undefined || price === "") {
      return res.status(400).json({
        message: "Price is required"
      });
    }

    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);
    const priceNumber = Number(price);

    if (
      Number.isNaN(latitudeNumber) ||
      latitudeNumber < -90 ||
      latitudeNumber > 90
    ) {
      return res.status(400).json({
        message: "Latitude must be between -90 and 90"
      });
    }

    if (
      Number.isNaN(longitudeNumber) ||
      longitudeNumber < -180 || longitudeNumber > 180
    ) {
      return res.status(400).json({
        message: "Longitude must be between -180 and 180"
      });
    }

    if (
      Number.isNaN(priceNumber) ||
      priceNumber <= 0
    ) {
      return res.status(400).json({
        message: "Price must be greater than 0"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Hotel image is required"
      });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const result = await pool.query(
      `
      INSERT INTO hotels
      (
        image,title,description,latitude,longitude,price
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        imagePath,
        title.trim(),
        description.trim(),
        latitudeNumber,
        longitudeNumber,
        priceNumber
      ]
    );

    console.log("Hotel added:", result.rows[0]);

    res.status(201).json({
      success: true,message: "Hotel created successfully",hotel: result.rows[0]
    });
  } catch (error) {
    console.error("Create hotel error:", error);

    if (req.file) {
      const uploadedFile = path.join(
        __dirname,
        "../../uploads",
        req.file.filename
      );

      if (fs.existsSync(uploadedFile)) {
        fs.unlinkSync(uploadedFile);
      }
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,description,latitude,longitude,price
    } = req.body;

    const existingResult = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    const existingHotel = existingResult.rows[0];

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Description is required"
      });
    }

    const latitudeNumber = Number(latitude);
    const longitudeNumber = Number(longitude);
    const priceNumber = Number(price);

    if (
      Number.isNaN(latitudeNumber) ||
      latitudeNumber < -90 || latitudeNumber > 90
    ) {
      return res.status(400).json({
        message: "Latitude must be between -90 and 90"
      });
    }

    if (
      Number.isNaN(longitudeNumber) ||
      longitudeNumber < -180 || longitudeNumber > 180
    ) {
      return res.status(400).json({
        message: "Longitude must be between -180 and 180"
      });
    }

    if (
      Number.isNaN(priceNumber) ||priceNumber <= 0
    ) {
      return res.status(400).json({
        message: "Price must be greater than 0"
      });
    }

    let imagePath = existingHotel.image;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const result = await pool.query(
      `
      UPDATE hotels
      SET
        image = $1,
        title = $2,
        description = $3,
        latitude = $4,
        longitude = $5,
        price = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
      `,
      [imagePath,title.trim(),description.trim(),latitudeNumber,longitudeNumber,priceNumber,id]
    );

    if (req.file && existingHotel.image) {
      const oldImage = path.join(
        __dirname,
        "../..",
        existingHotel.image
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }
    }

    res.status(200).json({
      success: true,message: "Hotel updated successfully",hotel: result.rows[0]
    });
  } catch (error) {
    console.error("Update hotel error:", error);

    res.status(500).json({
      success: false,message: error.message
    });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    const hotel = result.rows[0];

    await pool.query(
      "DELETE FROM hotels WHERE id = $1",
      [id]
    );

    if (hotel.image) {
      const imageFile = path.join(
        __dirname,
        "../..",
        hotel.image
      );

      if (fs.existsSync(imageFile)) {
        fs.unlinkSync(imageFile);
      }
    }

    res.status(200).json({
      success: true,message: "Hotel deleted successfully"
    });
  } catch (error) {
    console.error("Delete hotel error:", error);

    res.status(500).json({
      success: false,message: error.message
    });
  }
};

module.exports = {
  getHotels,getHotelById,createHotel,updateHotel,deleteHotel
};

