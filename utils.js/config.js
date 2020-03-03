const dotenv = require("dotenv");
dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_ID_POOL = process.env.AWS_ID_POOL;
const AWS_REGION = process.env.AWS_REGION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY;
const CONNECTION_URI = process.env.MONGODB_URI;
const LOCAL_MONGO_DB = process.env.LOCAL_MONGO_DB;
const PORT = process.env.PORT || 5000;
const S3_BUCKET = process.env.AWS_BUCKET_NAME;
const allowedFileTypes = ["image/jpeg", "image/png"];

module.exports = {
  AWS_ACCESS_KEY_ID,
  AWS_ID_POOL,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  CONNECTION_URI,
  LOCAL_MONGO_DB,
  PORT,
  S3_BUCKET,
  allowedFileTypes
};
