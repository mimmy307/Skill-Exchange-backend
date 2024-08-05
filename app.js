// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const {isAuthenticated} = require("./middleware/jwt.middleware")

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

const fileUploader = require("./config/cloudinary.config")

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const skillRoutes = require("./routes/skill.routes");
app.use("/api/skills",skillRoutes);

app.post("/api/upload", fileUploader.single("image"), (req,res,next)=>{

    if(!req.file){
        next(new Error("no file uploaded!"));
        return;
    }

    res.json({fileUrl: req.file.path})
})

const skillRequestRoutes = require("./routes/skillRequest.routes");
app.use("/api",isAuthenticated, skillRequestRoutes);

const reviewRoutes = require("./routes/review.routes");
app.use("/api", reviewRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes)

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
