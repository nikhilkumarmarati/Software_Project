const mongoose = require('mongoose');

const ClerkSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Clerk", ClerkSchema);
