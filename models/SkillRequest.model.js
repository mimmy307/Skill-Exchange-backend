const { Schema, model } = require("mongoose");

const skillRequestSchema = new Schema({
    requesterId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    offererId: {type: Schema.Types.ObjectId, ref:"User", required:true},
    skillId: {type: Schema.Types.ObjectId, ref:"Skill", required: true},
    Tokens: {type: Number, required: true},
    status: {type: String, enum:["pending", "accepted", "completed", "rejected"], default: "pending"}
})

const SkillRequest = model("SkillRequest", skillRequestSchema)

module.exports = SkillRequest;