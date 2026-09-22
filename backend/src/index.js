require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const hotelRoutes = require("./routes/hotelRoutes");

const initDb = require("./config/initDb");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/hotels", hotelRoutes);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Hotel backend is running",
  });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

start();