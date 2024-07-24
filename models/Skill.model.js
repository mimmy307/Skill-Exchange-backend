const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
    skillName: {type:String, required: true},
    description: {type: String, requiredd: true},
    userId:{ type: Schema.Types.ObjectId, ref: "User"},
    location: {type: String, enum:["remote", "in-person"]},
    tokenRate: {type: Number, required: true}
})

const Skill = model("Skill", skillSchema)

module.exports = Skill;