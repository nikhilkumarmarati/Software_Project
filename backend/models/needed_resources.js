const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const needed_resourcesschema = new mongoose.Schema({
    complaint:{
        type: ObjectId,
        ref: "COMPLAINT"
    },
    Workers: {
        type: int,
        required: true,
    },
    Cement_in_kg: {
        type: int,
        required: true
    },
    Road_Roller:{
        type: int,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

})

mongoose.model("NEEDED_RESOURCES" , needed_resourcesschema)