const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const noSpaces = file.originalname.replace(/\s/g, "");
    cb(null, uniquePrefix + "-" + noSpaces);
  },
});

const upload = multer({ storage: storage });

const getImage = (path) => {
  const imagePath = path.join(__dirname, "uploads", req.params.name);
  if (fs.existsSync(imagePath)) {
    return path.resolve(imagePath);
  }
};

module.exports = {
  upload,
  getImage,
};
