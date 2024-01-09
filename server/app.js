// Import required modules
import express from "express";
import config from "config";
import userRouter from "./controllers/userController.js"
import adminRouter from "./controllers/adminController.js"
import cors from "cors"


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

// DB Connect in Config Folder

import "./utils/dbConnect.js";
import authMiddleware from "./Middleware/users/authMiddleware.js";
import publicUserRouter from "./controllers/public/user.js"
import publicAdminRouter from "./controllers/public/admin.js"

// Create an instance of Express
const app = express();
app.use(cors())
const PORT = process.env.PORT || config.get("PORT");

// Middleware - Parse incoming requests as JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist"));
// });

app.use('/public/user',publicUserRouter)
app.use('/public/admin',publicAdminRouter)

// app.use(authMiddleware)

app.use("/user",authMiddleware,userRouter);
app.use("/admin",authMiddleware,adminRouter);

// // Handle 404 errors - Route not found
// app.use((req, res, next) => {
//   res.status(404).send("404 - Route Not Found");
// });

// Handle other errors
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("500 - Internal Server Error");
// });

app.listen(PORT, () => {
  console.log(`Server is running on PORT 🚀 ${PORT}`);
});
