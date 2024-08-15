const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("./../middleware/jwt.middleware")

const Skill = require("./../models/Skill.model")

router.get("/user/:userId", isAuthenticated, (req, res) => {
    const userId = req.params.userId;
    Skill.find({user:userId}).then(skills => {
        console.log(skills)
        res.status(200).json(skills)
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: "couldn't find user skills: " + err})
    })
})

router.post("/",isAuthenticated, (req,res) =>{
    console.log(req.body)

    Skill.create(req.body)
    .then((createdSkill) =>{
        res.status(201).json(createdSkill)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({"couldn't create skill": err})
    })
})



router.get("/", (req,res) =>{
    const query = req.query.q || ''

    Skill.find({
        skillName: { $regex: query, $options: 'i' }})
    .populate("user")
    .then((allSkills) =>{
        res.status(200).json(allSkills)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find skills": err})
    })
})



router.get("/:skillId", (req,res) =>{
    const skillId = req.params.skillId;

    Skill.findById(skillId)
    .populate("user")
    .then((oneSkill) =>{
        res.status(200).json(oneSkill)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find skill": err})
    })
})

router.put("/:skillId",isAuthenticated, (req,res) =>{
    const skillId = req.params.skillId;

    Skill.findByIdAndUpdate(skillId, req.body, {new: true})
    .then((updatedSkill) =>{
        res.status(201).json(updatedSkill)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't update skill":err})
    })
})

router.delete("/:skillId", isAuthenticated, (req,res) =>{
    const skillId = req.params.skillId;

    Skill.findByIdAndDelete(skillId)
    .then((deletedSkill) =>{
        res.status(204).send()
    })
    .catch((err) =>{
        console.log("this is the delete skill Error", err)
        res.status(500).json({"couldn't delete skill":err})
    })
})

module.exports = router