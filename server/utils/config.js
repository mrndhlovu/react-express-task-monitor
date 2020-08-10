const dotenv = require("dotenv");
dotenv.config();

const environment = process.env.DEVELOPMENT ? "development" : "production";
const isDevelopment = environment === "development";
const ACCESS_KEY_ID_AWS = process.env.ACCESS_KEY_ID_AWS;
const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const ID_POOL_AWS = process.env.ID_POOL_AWS;
const REGION_AWS = process.env.REGION_AWS;
const SECRET_ACCESS_KEY_AWS = process.env.AWS_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_SECRET_ID = process.env.SPOTIFY_SECRET_ID;
const CONNECTION_URI = process.env.MONGODB_URI;
const LOCAL_MONGO_DB = process.env.LOCAL_MONGO_DB;
const PORT = process.env.PORT || 5000;
const S3_BUCKET_AWS = process.env.S3_BUCKET_AWS;
const IMAGES_EP = `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
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
    image:
      "https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyNTA3OH0",
    description:
      "Template to help web developers to organize and manage tasks and features for their projects and website development.",
  },
  {
    category: "education",
    title: "Life watch",
    lists: ["Resolution", "Today", "This week", "Tomorrow", "Done"],
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyNTA3OH0",
    description: "Life Watchers, It's like Weight Watchers, but for your life!",
  },
  {
    category: "Engineering",
    title: "Software engineering career design",
    image:
      "https://images.unsplash.com/photo-1544819667-9bfc1de23d4e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyNTA3OH0",
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

const allowedFields = [
  "fname",
  "email",
  "password",
  "starred",
  "idBoards",
  "username",
  "avatar",
  "bio",
  "viewedRecent",
  "notifications",
];

const allowedBoardUpdateFields = [
  "accessLevel",
  "activities",
  "archived",
  "category",
  "comments",
  "description",
  "labels",
  "lists",
  "styleProperties",
  "title",
];

module.exports = {
  allowedFileTypes,
  environment,
  ACCESS_KEY_ID_AWS,
  ID_POOL_AWS,
  REGION_AWS,
  SECRET_ACCESS_KEY_AWS,
  ROOT_URL,
  CONNECTION_URI,
  LOCAL_MONGO_DB,
  PORT,
  S_GRID_API_KEY,
  S3_BUCKET_AWS,
  TOKEN_SIGNATURE,
  isDevelopment,
  DEFAULT_TEMPLATES,
  allowedFields,
  allowedBoardUpdateFields,
  SPOTIFY_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  SPOTIFY_SECRET_ID,
  IMAGES_EP,
};
