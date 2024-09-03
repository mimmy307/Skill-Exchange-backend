const express = require("express");
const router = express.Router();

const SkillRequest = require("./../models/SkillRequest.model")

router.post("/", (req,res) =>{

    SkillRequest.create(req.body)
    .then((createdSkillRequest) =>{
        res.status(201).json(createdSkillRequest)
    })
    .catch((err)=>{
        res.status(500).json({"couldn't create skillRequest":err})
    })
})

router.get("/", (req,res) =>{
    SkillRequest.find()
    .populate("requester", "fullName email profilePic")
    .populate("offerer", "fullName email profilePic")
    .populate("skill")
    .then((allSkillRequest) =>{
        res.status(200).json(allSkillRequest)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find skillRequests":err})
    })
})

router.get("/outgoing/:userId", (req,res)=>{
    const userId = req.params.userId

    SkillRequest.find({requester: userId})
        .populate("requester", "fullName email profilePic")
        .populate("offerer", "fullName email profilePic")
        .populate("skill")
        .then((requests) =>{
            res.status(200).json(requests)
        })
        .catch((err) =>{
            res.status(500).json({"couldn't find outgoing requests":err})
        })

})

router.get("/incoming/:userId", (req,res)=>{
    const userId = req.params.userId

    SkillRequest.find({offerer: userId})
        .populate("requester", "fullName email profilePic")
        .populate("offerer", "fullName email profilePic")
        .populate("skill")
        .then((requests) =>{
            res.status(200).json(requests)
        })
        .catch((err) =>{
            res.status(500).json({"couldn't find incoming requests":err})
        })

})

router.get("/:skillRequestId", (req,res) =>{
    const skillRequestId = req.params.skillRequestId;

    SkillRequest.findById(skillRequestId)
    .populate("requester", "fullName email profilePic")
    .populate("offerer", "fullName email profilePic")
    .populate("skill")
    .then((oneSkillRequest) =>{
        res.status(200).json(oneSkillRequest)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't find one skillRequest":err})
    })
})

router.put("/:skillRequestId", (req,res) =>{
    const skillRequestId = req.params.skillRequestId;

    SkillRequest.findByIdAndUpdate(skillRequestId, req.body, {new: true})
    .then((updatedSkillRequest) =>{
        res.status(201).json(updatedSkillRequest)
    })
    .catch((err) =>{
        res.status(500).json({"couldn't update skillRequest": err})
    })
})

router.delete("/:skillRequestId", (req,res) =>{
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