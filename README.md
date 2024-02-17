# Project Management MERN Web App

### About the Project

This is a full-stack project management web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The app allows users to register, login, and manage projects. It includes authentication using JWT tokens for both users and admins.

## Screenshoot

### 1)Login Page

![Image](https://github.com/Hanzalashaik/project-management-mern/blob/main/client/public/login%20.png "Image")

### 2)DashBoard

![Image](https://github.com/Hanzalashaik/project-management-mern/blob/main/client/public/dashboard.png "Image")

### 3)User Page

![Image](https://github.com/Hanzalashaik/project-management-mern/blob/main/client/public/user%20page.png "Image")

### 4)profile Page

![Image](https://github.com/Hanzalashaik/project-management-mern/blob/main/client/public/profile.png "Image")

## Usage

### To Install and Test

```bash
git clone git@github.com:Hanzalashaik/project-management-mern.git
cd project-management-mern
```

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

```

```bash
# Start the server
cd ../server
nodemon app.js

# Start the client
cd ../client
npm run dev

```

### Install dependencies for the basic setup: </h4>

### Dev Dependencies

```bash
npm i -D nodemon
```

### Dependencies

```bash
npm i config
```

<h4> Integrate a new script </h4>

- Add "type" : "module"
- Change "script" :{ "dev": "nodemon app.js"}

```bash
{
  "name": "Book-Store-API",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "type" : "module",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "express": "^4.17.3"
  }
}

```

## 🔗 Links

[![GitHub](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hanzalashaik)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/-hanzala-shaikh-/)
