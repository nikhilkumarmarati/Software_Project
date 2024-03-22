const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { route } = require("./auth");
const COMPLAINT = mongoose.model("COMPLAINT")


router.get("/allcomplaints", (req, res) => {
    COMPLAINT.find()
        // .populate("postedBy", "_id name Photo")
        // .populate("comments.postedBy", "_id name")
        .sort("-date")
        .then(complaints => res.json(complaints))
        .catch(err => console.log(err))
})

router.post('/complaint_post',async (req,res)=>{
    const{Address,Problem} = req.body;
    
    if (!Address || !Problem) {
        return res.status(422).json({ error: "Please add Address and Problem" })
    }
    const complaint = new COMPLAINT({
        Address,
        Problem
    });
    await complaint.save()
    .then(result => {res.json({post: result})})
    .catch(err => {console.log(err)})
})

module.exports = router