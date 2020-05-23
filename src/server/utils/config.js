const dotenv = require("dotenv");
dotenv.config();

const environment = process.env.DEVELOPMENT ? "development" : "production";
const isDevelopment = environment === "development";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const AWS_ID_POOL = process.env.AWS_ID_POOL;
const AWS_REGION = process.env.AWS_REGION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY;
const CONNECTION_URI = process.env.MONGODB_URI;
const LOCAL_MONGO_DB = process.env.LOCAL_MONGO_DB;
const PORT = process.env.PORT || 3000;
const S3_BUCKET = process.env.AWS_BUCKET_NAME;
const allowedFileTypes = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE;
const ROOT_URL =
  process.env.LOCAL_URL || `https://moneat.herokuapp.com:${PORT}`;

const DEFAULT_TEMPLATES = [
  {
    category: "development",
    title: "Web Development",
    lists: [
      "Backlog",
      "Features",
      "Running Tasks",
      "Fix & Upgrade",
      "Testing",
      "Ready",
    ],
    description:
      "Template to help web developers to organize and manage tasks and features for their projects and website development.",
  },
  {
    category: "education",
    title: "Life watch",
    lists: ["Resolution", "Today", "This week", "Tomorrow", "Done"],
    description: "Life Watchers, It's like Weight Watchers, but for your life!",
  },
  {
    category: "Engineering",
    title: "Software engineering career design",
    lists: [
      "AWS Certification",
      "Node JS",
      "Design patterns",
      "React , Hooks and Redux",
      "Experience-3 years",
      "Resume",
    ],
    description:
      "Plan your career with this board starting from where you are to where you want to be. Be bold, imaginative and set time-bound goals. Review this board weekly! You must!",
  },
];

module.exports = {
  allowedFileTypes,
  environment,
  AWS_ACCESS_KEY_ID,
  AWS_ID_POOL,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  ROOT_URL,
  CONNECTION_URI,
  LOCAL_MONGO_DB,
  PORT,
  S_GRID_API_KEY,
  S3_BUCKET,
  TOKEN_SIGNATURE,
  isDevelopment,
  DEFAULT_TEMPLATES,
};
