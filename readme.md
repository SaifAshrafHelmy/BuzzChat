# BuzzChat
#### 📌 Brief:        A Real-Time Messenger app using Nodejs, React, Postgresql and Redis.
#### 📌 Live Demo:    https://buzz-chat-messenger.vercel.app
#### 📌 Video Demo:   https://www.linkedin.com/feed/update/urn:li:activity:7105890025279561729/


## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Tree](#projecttree)



## Description
BuzzChat is a Messenger Clone app that allows users to  add friends and chat with them in real-time, 
The app uses the following technologies:

### Backend Technologies:

Node.js: The foundation of BuzzChat's backend, providing a robust and efficient runtime environment.
Express: Utilized for routing and creating APIs, ensuring smooth communication between the client and server.
JWT: Used for handling authentication and user sessions securely.
Socket.io: Empowers the app with event-driven real-time communication, making chats instantaneous.
Yup: Used for server-side form data validation,to guarantee data integrity and security.
PostgreSQL Database: The reliable database solution responsible for storing and managing user's data.
Redis: Used for caching and performance optimization.

### Frontend Technologies:
React: The basis of the app's frontend, providing a interactive and responsive interface.
Formik: Enhances the user experience by simplifying form handling and validation.
Yup (Client-Side): Ensures data entered by users on the client side is valid, maintaining data quality.
Chakra UI: Simplifies the process of building and styling interface components, with visually appealing ready components.
socket.io-client: handles communication with the backend through Socket.io, enabling real-time messaging capabilities.

## Installation

1. Clone the repository: \
   git clone https://github.com/SaifAshrafHelmy/BuzzChat \
   cd BuzzChat

2. Install the required dependencies: \
   npm install

3. Create the .env files: \

   for backend:
      DATABASE_HOST=localhost
      DATABASE_PORT=5432
      DATABASE_USER=postgres
      DATABASE_PASSWORD=Enter your db password
      COOKIE_SECRET=Enter a cookie secret
      CLIENT_URL=http://localhost:3000
      NODE_ENV=production
      

   for frontend:
      REACT_APP_SERVER_URL=http://localhost:3030


4. create the postgresql with the command in database.sql
5. run the redis server using sudo service redis-server start
6. run the Nodejs server using cd server && npm run dev
7. run the React interface using cd client && npm start



## Usage
1. Register or log in to your account.
2. Add a friend through their username.
3. Tell your friend to also add you as friend using your username. 
4. Click on their username and chat with them.



## Features

- User authentication and registration.
- Authorization before sending or accessing the messages.
- Real-time communication with slim-to-zero delay.
- Showing the connected status in real-time.
- Responsive design for various devices.



## ProjectTree


📦server\
 ┣ 📂controllers\
 ┃ ┣ 📂socketControllers\
 ┃ ┃ ┣ 📜addFriend.js\
 ┃ ┃ ┣ 📜authorizeUser.js\
 ┃ ┃ ┣ 📜dm.js\
 ┃ ┃ ┣ 📜initializeUser.js\
 ┃ ┃ ┣ 📜onDisconnect.js\
 ┃ ┃ ┗ 📜parsedFriendsList.js\
 ┃ ┣ 📜authController.js\
 ┃ ┣ 📜rateLimiter.js\
 ┃ ┣ 📜serverController.js\
 ┃ ┣ 📜socketController.js\
 ┃ ┗ 📜validateForm.js\
 ┣ 📂routers\
 ┃ ┗ 📜authRouter.js\
 ┣ 📜.env\
 ┣ 📜database.sql\
 ┣ 📜db.js\
 ┣ 📜index.js\
 ┣ 📜package-lock.json\
 ┣ 📜package.json\
 ┗ 📜redis.js\



📦client\
 ┣ 📂public\
 ┃ ┗ 📜index.html\
 ┣ 📂src\
 ┃ ┣ 📂components\
 ┃ ┃ ┣ 📂Auth\
 ┃ ┃ ┃ ┣ 📜Login.jsx\
 ┃ ┃ ┃ ┗ 📜SignUp.jsx\
 ┃ ┃ ┣ 📂Home\
 ┃ ┃ ┃ ┣ 📜AddFriendModal.jsx\
 ┃ ┃ ┃ ┣ 📜Chat.jsx\
 ┃ ┃ ┃ ┣ 📜ChatBox.jsx\
 ┃ ┃ ┃ ┣ 📜Homepage.jsx\
 ┃ ┃ ┃ ┣ 📜Sidebar.jsx\
 ┃ ┃ ┃ ┗ 📜useSocketSetup.jsx\
 ┃ ┃ ┣ 📜AccountContext.jsx\
 ┃ ┃ ┣ 📜PrivateRoutes.jsx\
 ┃ ┃ ┣ 📜TextField.jsx\
 ┃ ┃ ┣ 📜ToggleColorMode.jsx\
 ┃ ┃ ┗ 📜Views.jsx\
 ┃ ┣ 📜App.jsx\
 ┃ ┣ 📜index.jsx\
 ┃ ┣ 📜socket.js\
 ┃ ┗ 📜theme.jsx\
 ┣ 📜.env\
 ┣ 📜package-lock.json\
 ┣ 📜package.json\
 ┗ 📜README.md\
