const express = require("express");
const router = express.Router();

const SkillRequest = require("./../models/SkillRequest.model")

router.post("/skillRequest", (req,res) =>{

    SkillRequest.create(req.body)
    .then((createdSkillRequest) =>{
        res.status(201).json(createdSkillRequest)
    })
    .catch((err)=>{
        res.status(500).json({"couldn't create skillRequest":err})
    })
})

router.get("/skillRequest", (req,res) =>{
    SkillRequest.find()
    .then((allSkillRequest) =>{
        res.status(200).json(allSkillRequest)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find skillRequests":err})
    })
})

router.get("/skillRequest/:skillRequestId", (req,res) =>{
    const skillRequestId = req.params.skillRequestId;

    SkillRequest.findById(skillRequestId)
    .then((oneSkillRequest) =>{
        res.status(200).json(oneSkillRequest)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find one skillRequest":err})
    })
})

router.put("/skillRequest/:skillRequestId", (req,res) =>{
    const skillRequestId = req.params.skillRequestId;

    SkillRequest.findByIdAndUpdate(skillRequestId, req.body, {new: true})
    .then((updatedSkillRequest) =>{
        res.status(201).json(updatedSkillRequest)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't update skillRequest": err})
    })
})

router.delete("/skillRequest/:skillRequestId", (req,res) =>{
    const skillRequestId = req.params.skillRequestId;

    SkillRequest.findByIdAndDelete(skillRequestId)
    .then((deletedSkillRequest) =>{
        res.status(204).send()
    })
    .catch((err) =>{
        res.status(500).json({"couldn't delete skillRequest": err})
    })
})

module.exports = router