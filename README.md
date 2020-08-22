[![Build Status](https://travis-ci.com/mrndhlovu/react-express-task-monitor.svg?branch=master)](https://travis-ci.com/mrndhlovu/react-express-task-monitor)

### React (React Hooks), MongoDB, Express and Node JS Trello Clone

## Description

This is Trello clone attempt where a user can sign up for an account, create Kanban style boards with tasks which can be packed with productivity details. Built the backend using Node JS,MongoDB, express with the production version hosted on an Amazon EC2 instance. On the frontend drag and drop uses the popular `React DND` library and majority of components where built using the `semantic react` component library with some custom styling added using `Styled components` . Added a custom feature where on each board, there is a chat side bar and can join a specify board chat room.

### Technologies

- React
- React hooks
- React DND
- Webpack
- AWS S3
- Amazon EC2
- Nginx
- Let's Encrypt
- Mongodb
- Semantic React
- Node JS
- Express
- Send grid
- JSON Wen Tokens
- Yarn
- Socket io
- Axios

### Installation

cd into the backend folder and run
yarn && yarn client:install

Environmental variables
In a `.env` file the project expects the following variables

```
For uploading images to your Amazon S3 bucket.
ACCESS_KEY_ID_AWS=REPLACE WITH YOUR OWN.
S3_BUCKET_AWS=REPLACE WITH YOUR OWN.
ID_POOL_AWS=REPLACE WITH YOUR OWN.
REGION_AWS=REPLACE WITH YOUR OWN.
SECRET_ACCESS_KEY_AWS=REPLACE WITH YOUR OWN.

For use with the unsplash images api.
REACT_APP_UNSPLASH_ACCESS_KEY=REPLACE WITH YOUR OWN.
REACT_APP_UNSPLASH_SECRET_KEY=REPLACE WITH YOUR OWN.

For sending emails
SEND_GRID_API_KEY=REPLACE WITH YOUR OWN.

For JWT token signing
TOKEN_SIGNATURE=REPLACE WITH YOUR OWN.

// process.env.NODE_ENV returns undefined so has this only in development.
DEVELOPMENT='development'

For your development mongodb database
LOCAL_MONGO_DB=mongodb://localhost:27017/DB_NAME

Production mongodb database
MONGO_DB_URI=mongodb://localhost:27017/DB_NAME

Google authentication
GOOGLE_CLIENT_ID=REPLACE WITH YOUR OWN.
GOOGLE_CLIENT_SECRET=REPLACE WITH YOUR OWN.

Spotify authentication
SPOTIFY_CLIENT_ID=REPLACE WITH YOUR OWN.
SPOTIFY_SECRET_ID=REPLACE WITH YOUR OWN.

```
