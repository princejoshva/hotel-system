const getAllHotels = `SELECT *FROM hotels ORDER BY id DESC LIMIT $1 OFFSET $2`;

const getHotelCount = `SELECT COUNT(*) AS total FROM hotels`;

const getHotelById = `SELECT * FROM hotels WHERE id = $1`;

const createHotel = `
  INSERT INTO hotels (title,description,latitude,longitude,price,image)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

const updateHotel = `
  UPDATE hotels
  SET
    title = $1,description = $2,latitude = $3,longitude = $4,price = $5,image = $6,updated_at = CURRENT_TIMESTAMP
  WHERE id = $7
  RETURNING * `;

const deleteHotel = ` DELETE FROM hotels WHERE id = $1 RETURNING *`;

module.exports = {
  getAllHotels,getHotelCount,getHotelById,createHotel,updateHotel,deleteHotel
};
