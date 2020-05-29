const dotenv = require("dotenv");
dotenv.config();

const environment = process.env.DEVELOPMENT ? "development" : "production";
const isDevelopment = environment === "development";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const S_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const AWS_ID_POOL = process.env.AWS_ID_POOL;
const AWS_REGION = process.env.AWS_REGION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_SECRET_ID = process.env.SPOTIFY_SECRET_ID;
const CONNECTION_URI = process.env.MONGODB_URI;
const LOCAL_MONGO_DB = process.env.LOCAL_MONGO_DB;
const PORT = process.env.PORT || 3000;
const S3_BUCKET = process.env.AWS_BUCKET_NAME;
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
  allowedFields,
  allowedBoardUpdateFields,
  SPOTIFY_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  SPOTIFY_SECRET_ID,
  IMAGES_EP,
};
