const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    Address: {
        type: String,
        required: true,
    },
    Problem: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

    //status
    //city

})

mongoose.model("COMPLAINT" , complaintSchema)