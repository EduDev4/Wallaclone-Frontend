# WALLACLONE

Wallaclone is the final project for the Keepcoding IX Fullstack Web Development Bootcamp. Wallaclone is a platform which allows you to buy and sell second hand articles, similar as the Wallapop one.

- [Link to the project](http://wallaclone.chitenavi-dev.com)

This single web page is based in the following architecture and features:

- MERN Stack (Mongoose, Express, React and Node)
- REDUX
- Responsive design
- Push notifications using web-push/rabitmq and email using Sendgrid API. This system is used to notify users regarding changes in their favorites articles.
- Real time chat integrated using Twilio Programable Chat API.
- API secured with json web token authentication.
- Microservices running in backend as thumbnail.
- Application deployed in AWS.

## CONTENTS

- [DEPENDENCIES](#DEPENDENCIES)
  - [Frontend](#Frontend)
  - [Backend](#Backend)
- [DEPLOYMENT](#DEPLOYMENT)
  - [Download](#Download)
  - [Install dependencies](#Install-dependencies)
  - [Initialize the data base](#Initialize-the-data-base)
  - [Configuration](#Configuration)
  - [Start application](#Start-application)
- [EXAMPLES](#EXAMPLES)

## DEPENDENCIES

This application makes use of the following packages

### Frontend

- "@ant-design/icons": "^4.5.0",
- "antd": "^4.12.3",
- "antd-theme-webpack-plugin": "^1.3.9",
- "axios": "^0.21.1",
- "babel-plugin-import": "^1.13.3",
- "classnames": "^2.2.6",
- "connected-react-router": "^6.8.0",
- "customize-cra": "^1.0.0",
- "date-fns": "^2.17.0",
- "enzyme": "^3.11.0",
- "enzyme-adapter-react-16": "^1.15.6",
- "enzyme-to-json": "^3.6.1",
- "history": "^4.10.1",
- "i18next": "^19.9.0",
- "i18next-http-backend": "^1.1.1",
- "less": "^3.13.1",
- "less-loader": "^7.0.2",
- "prop-types": "^15.7.2",
- "react": "^17.0.1",
- "react-app-rewired": "^2.1.8",
- "react-dom": "^17.0.1",
- "react-i18next": "^11.8.8",
- "react-paginate": "^7.1.0",
- "react-redux": "^7.2.2",
- "react-router-dom": "^5.2.0",
- "react-scripts": "4.0.2",
- "react-share": "^4.4.0",
- "redux": "^4.0.5",
- "redux-devtools-extension": "^2.13.8",
- "redux-logger": "^3.0.6",
- "redux-thunk": "^2.3.0",
- "styled-components": "^5.2.1",
- "twilio-chat": "^4.1.0",
- "web-vitals": "^1.1.0"

### Backend

- "@sendgrid/mail": "^7.4.2",
- "amqplib": "^0.7.1",
- "bcrypt": "^5.0.0",
- "body-parser": "^1.19.0",
- "cookie-parser": "~1.4.4",
- "cors": "^2.8.5",
- "cote": "^1.0.2",
- "debug": "~2.6.9",
- "dotenv": "^8.2.0",
- "ejs": "~2.6.1",
- "express": "~4.16.1",
- "http-errors": "~1.6.3",
- "i18n": "^0.13.2",
- "jimp": "^0.16.1",
- "jsonwebtoken": "^8.5.1",
- "lodash": "^4.17.21",
- "mongoose": "^5.11.15",
- "morgan": "~1.9.1",
- "multer": "^1.4.2",
- "nodemailer": "^6.4.18",
- "web-push": "^3.4.4"

## DEPLOYMENT

### Download

To download the repository:
Backend

```
\downloads\git clone https://github.com/EduDev4/Wallaclone-Backend.git
```

Frontend

```
\downloads\git clone https://github.com/EduDev4/Wallaclone-Frontend.git
```

### Install dependencies

Install all the required npm packages both in backend and frontend folders

```
\downloads\Wallaclone-Frontend\npm install
\downloads\Wallaclone-Backend\npm install
```

### Initialize the data base

This script will delete all data in database and fill it with initial user/adverts:

```
\downloads\keepcoding-wallaclone\npm run init-db-local
```

### Configuration

Before starting the app you need to create one .env file for each backend and frontend. These files contains essential information to be able to start the app:

**_BACKEND_**

MONGODB_CONNECTION_STRING_LOCAL=mongodb://localhost/dbname

PORT=3003

DOMAIN=http://localhost:3000

DOMAIN_NODE=http://localhost:3003

DOMAIN_PROD=http://<URL_PROD>

JWT_SECRET=1234

AMQP_CONNECTION_STRING=amqps://user:pass@host/instance

SG_KEY=''

PUBLIC_VAPID_KEY=***

PRIVATE_VAPID_KEY=****

**_FRONTEND_**

REACT_APP_API_BASE_URL_PROD=<Api Url>
  
REACT_APP_CHAT_BASE_URL=http://chat.chitenavi-dev.com

REACT_APP_API_BASE_URL_DEV=http://localhost:3003

### Start application

Once everything is configured this is the order to start the application and start thumbnail:

```
\downloads\Wallaclone-Backend\npm run dev
node ./services/thumbnailServ.js


```

Then we can start the frontend

```
\downloads\Wallaclone-Frontend\npm start
```

## EXAMPLES

Find below some screenshots from wallaclone:

### Login screens

![alt text](https://github.com/violeta-dev/Redux/blob/master/src/assets/photo-placeholder.png)

![alt text](https://github.com/violeta-dev/Redux/blob/master/src/assets/photo-placeholder.png)

### Advert lists

![alt text]()

![alt text]()

### Adverts

![alt text]()

![alt text]()

### Notifications

![alt text]()

![alt text]()

### Emails

### Chat

![alt text]()

