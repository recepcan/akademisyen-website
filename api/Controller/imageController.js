import multer from 'multer';
import Images from '../Models/imageModel.js';
import path from 'path';

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/images')); // Doğru dizini kontrol edin
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const create = [
  upload.single("image"), // Middleware
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    const imageName = req.file.filename;

    try {
      await Images.create({ image: imageName });
      res.json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
];

export const getimages = async (req, res) => {
  try {
    const data = await Images.find({});
    res.json({ status: "ok", data });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
