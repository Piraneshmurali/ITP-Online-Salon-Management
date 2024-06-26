// feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');

// Route to submit feedback
router.post('/submit', async (req, res) => {
    try {
        const { name, email, message, rating } = req.body;
        const feedback = new Feedback({ name, email, message, rating });
        await feedback.save();
        res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error submitting feedback" });
    }
});

// Route to get all feedback
router.get('/all', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching feedback" });
    }
});

module.exports = router;
