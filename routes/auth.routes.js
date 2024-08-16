const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const router = express.Router();
const {isAuthenticated} = require("./../middleware/jwt.middleware")
const saltRounds = 10;

router.post("/signup", (req, res) =>{
    const {email, password, fullName} = req.body;

    if(email === " " || password === " " || fullName === " "){
        res.status(400).json({message: "Provide email, password, and name"});
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!emailRegex.test(email)){
        res.status(400).json({message:"Provide a valid email address."})
        return
    }

    User.findOne({email})
    .then((foundUser)=>{
        if(foundUser){
            res.status(400).json({message:"User already exists"});
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt)

        return User.create({email, password: hashedPassword, fullName})
    })
    .then((createdUser) =>{
        const {email, fullName, _id, profilePic} = createdUser

        const user = {email, fullName, _id, profilePic};

        res.status(201).json({user:user})
    })
    .catch(err =>{
        res.status(500).json({message:"internal server error"})
    })
})

router.post("/login", (req, res)=>{
    const {email, password} = req.body;

    if (email === " " || password === " "){
        res.status(400).json({message:"Provide email and password."});
        return;
    }

    User.findOne({email})
    .then((foundUser)=>{

        if (!foundUser){
            res.status(401).json({message:"User not found"})
            return;
        }

        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

        if(passwordCorrect){
            const {_id, email, fullName, profilePic} = foundUser;

            const payload = {_id, email, fullName, profilePic};

            const authToken = jwt.sign(
                payload, process.env.TOKEN_SECRET, {algorithm: "HS256", expiresIn:"12h"}
            );

            res.status(200).json({authToken:authToken})
        }
        else{
            res.status(401).json({message: "unable to authenticate the user"})
        }
    })
    .catch(err => res.status(500).json({message: "internal server error"}))

})

router.get("/verify", isAuthenticated, (req,res) =>{
    console.log("req.payload", req.payload);
    res.status(200).json(req.payload)
});

module.exports = router