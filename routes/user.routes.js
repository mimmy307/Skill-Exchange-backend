const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("./../middleware/jwt.middleware")

const User = require("./../models/User.model")

const fileUploader = require("../config/cloudinary.config")

router.get("/users", (req,res)=>{
    User.find()
    .then((allUsers) =>{
        res.status(200).json(allUsers)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find users" : err})
    })
})

router.get("/users/:userId", (req,res)=>{
    const userId = req.params.userId

    User.findById(userId)
    .then((oneUser) =>{
        res.status(200).json(oneUser)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find user" : err})
    })
})

router.post("/upload", fileUploader.single("profilePic"), (res, res, next) =>{
    if (!req.file){
        next(new Error("no file uploaded!"));
        return;
    }
    res.json({fileUrl: req.file.path})
})

router.put("/users/:userId",isAuthenticated, (req,res)=>{
    const userId = req.params.userId

    User.findByIdAndUpdate(userId, req.body, {new: true})
    .then((updatedUser) =>{
        res.status(200).json(updatedUser)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't update user" : err})
    })
})

router.delete("/users/:userId",isAuthenticated, (req,res) =>{
    const userId = req.params.userId

    User.findByIdAndDelete(userId)
    .then((deletedUser)=>{
        res.status(204).send()
    })
    .catch((err) =>{
        res.status(500).json({"couldn't delete user" : err})
    })
})

module.exports = router