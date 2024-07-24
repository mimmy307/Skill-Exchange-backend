const express = require("express");
const router = express.Router();

const Review = require("./../models/Review.model");

router.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((createdReview) => {
            res.status(201).json(createdReview);
        })
        .catch((err) => {
            res.status(500).json({"Couldn't create review": err });
        });
});

router.get('/reviews/user/:userId', (req, res) => {
    const userId = req.params.userId;

    Review.find(userId)
        .then((allReviews) => {
            res.status(200).json(allReviews);
        })
        .catch((err) => {
            res.status(500).json({"Couldn't find reviews": err} );
        });
 });

 router.put('/reviews/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;

    Review.findByIdAndUpdate(reviewId, req.body, { new: true })
        .then((updatedReview) => {
            res.status(201).json(updatedReview);
        })
        .catch((err) => {
            res.status(500).json({"Couldn't update review": err });
        });
});

router.delete('/reviews/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;

    Review.findByIdAndDelete(reviewId)
        .then((deletedReview) => {
            res.status(204).send(); 
        })
        .catch((err) => {
            res.status(500).json({"Couldn't delete review": err });
        });
});

module.exports = router;