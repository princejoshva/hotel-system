const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  const extension = path.extname(file.originalname).toLowerCase();
  const mimeType = allowedTypes.test(file.mimetype);

  if (mimeType && allowedTypes.test(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage: storage,fileFilter: fileFilter,limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;