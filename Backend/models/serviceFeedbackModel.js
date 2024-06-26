// serviceFeedbackModel.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceFeedbackSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ServiceFeedback = mongoose.model('ServiceFeedback', serviceFeedbackSchema);
module.exports = ServiceFeedback;
