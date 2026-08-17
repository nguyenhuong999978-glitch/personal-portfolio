const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Vui lòng chọn ảnh",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Upload ảnh thành công",
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
