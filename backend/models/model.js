const mongoose = require('mongoose');

// const complaintSchema = new mongoose.Schema({
//     Address: {
//         type: String,
//         required: true,
//     },
//     Problem: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },

// })

const clerkSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    suburb:{
        type: String,
    },
    city:{
        type: String,
    }
    //position
    
    
})

mongoose.model("CLERK" , clerkSchema)