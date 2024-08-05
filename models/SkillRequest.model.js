const { Schema, model } = require("mongoose");

const skillRequestSchema = new Schema({
    requester: {type: Schema.Types.ObjectId, ref: "User", required: true},
    offerer: {type: Schema.Types.ObjectId, ref:"User", required:true},
    skill: {type: Schema.Types.ObjectId, ref:"Skill", required: true},
    tokens: {type: Number, required: true},
    status: {type: String, enum:["pending", "accepted", "completed", "rejected"], default: "pending"}
})

const SkillRequest = model("SkillRequest", skillRequestSchema)

module.exports = SkillRequest;