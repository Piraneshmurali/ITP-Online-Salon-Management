const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    text: { type: String, required: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false },
});

const inventorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    rquantity: {
        type: Number,
        required: true
    },
    uquantity: {
        type: String,
        required: false
    },
    totalPrice: {
        type: String,
        required: true
    },
    reviews: [reviewSchema], // Array of reviews
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        
        type: Number,
        required: false,
        default: 0,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Products", inventorySchema);
