const router = require("express").Router();
const upload = require("../utils/upload-file");
const auth = require("../utils/middleware/authMiddleware").authMiddleware;

const singleFileUpload = upload.single("image");

router.post("/image", auth, (req, res, err) => {
  singleFileUpload(req, res, (err) => {
    if (err) return res.json({ message: err.message, success: false });
    return res.json({
      imgUrl: req.file.location,
      uploadDate: Date.now(),
      success: true,
    });
  });
});

module.exports = router;
