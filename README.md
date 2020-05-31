[![Build Status](https://travis-ci.com/mrndhlovu/react-express-task-monitor.svg?branch=YOUR_master)](https://travis-ci.com/mrndhlovu/react-express-task-monitor)

#### React Task monitor | MERN stack, Inspired by Trello.

## [Task Monitor](https://moneat.herokuapp.com/)

## Setup 

1. Clone repo

2.
```
# with yarn 
yarn install

```
3. Create a .env file and insert the following code. Replace values with yours!!
 ```
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_BUCKET_NAME=YOUR_AWS_BUCKET_NAME
AWS_ID_POOL=YOUR_AWS_ID_POOL
AWS_REGION=YOUR_AWS_REGION
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY

REACT_APP_UNSPLASH_ACCESS_KEY=YOUR_REACT_APP_UNSPLASH_ACCESS_KEY

SEND_GRID_API_KEY=YOUR_SEND_GRID_API_KEY

JWT_TOKEN_SIGNATURE=YOUR_JWT_TOKEN_SIGNATURE

ROOT_URL=http://localhost:3000
DEVELOPMENT=DEVELOPMENT

CONNECTION_URI=YOUR_MONGODB_CONNECTION_URI

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_SECRET_ID=YOUR_SPOTIFY_SECRET_ID
```

4. Get relevant api keys mentioned in the .env file.
5. Start server and app 
   ```
   yarn run dev && yarn start
   ```



