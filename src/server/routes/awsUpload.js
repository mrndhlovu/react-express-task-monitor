const router = require("express").Router();
const upload = require("../utils/upload-file");
const auth = require("../utils/middleware/authMiddleware").authMiddleware;

const uploadFile = (type, req, res, callback) => {
  const singleFileUpload = upload.single(type);
  singleFileUpload(req, res, () => callback());
};

router.post("/:type/upload", auth, (req, res) => {
  const { type } = req.params;

  uploadFile(type, req, res, (err) => {
    if (err) return res.json({ message: err.message, success: false });

    try {
      res.status(201).send({
        [type === "image" ? type : "document"]: req.file.location,

        uploadDate: Date.now(),
        name: req.file.originalname,
      });
    } catch (error) {
      res.status(400).send({
        message:
          "Failed to upload file, only \n [pdf/image] \n file types allowed!",
      });
    }
  });
});

module.exports = router;
