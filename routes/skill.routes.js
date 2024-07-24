const express = require("express");
const router = express.Router();

const Skill = require("./../models/Skill.model")

router.post("/skills", (req,res) =>{

    Skill.create(req.body)
    .then((createdSkill) =>{
        res.status(201).json(createdSkill)
    })
    .catch((err)=>{
        res.status(500).json({"couldn't create skill": err})
    })
})

router.get("/skills", (req,res) =>{
    Skill.find()
    .then((allSkills) =>{
        res.status(200).json(allSkills)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find skills": err})
    })
})

router.get("/skills/:skillId", (req,res) =>{
    const skillId = req.params.skillId;

    Skill.findById(skillId)
    .then((oneSkill) =>{
        res.status(200).json(oneSkill)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find skill": err})
    })
})

router.put("/skills/:skillId", (req,res) =>{
    const skillId = req.params.skillId;

    Skill.findByIdAndUpdate(skillId, req.body, {new: true})
    .then((updatedSkill) =>{
        res.status(201).json(updatedSkill)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't update skill":err})
    })
})

router.delete("/skills/:skillId", (req,res) =>{
    const skillId = req.params.skillId;

    Skill.findByIdAndDelete(skillId)
    .then((deletedSkill) =>{
        res.status(204).send()
    })
    .catch((err) =>{
        res.status(500).json({"couldn't delete skill":err})
    })
})

module.exports = router