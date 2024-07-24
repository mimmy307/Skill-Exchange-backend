const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    reviewerId: {type: Schema.Types.ObjectId, ref: "User"},
    revieweeId: {type: Schema.Types.ObjectId, ref: "User"},
    rating: {type: Number, min: 1, max: 5, required: true},
    comment: {type: String},
    createdAt: {type: Date, default: Date.now}
})

const Review = model("Review", reviewSchema)

module.exports = Review