const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken")
// const { Jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const COMPLAINT = mongoose.model("COMPLAINT")
const CLERK = mongoose.model("CLERK")

router.get('/',(req,res)=>{
    res.send("hello")
})



router.post('/sign__in',async (req, res) => {
    const { UserID, password } = req.body;
    
    if (!UserID || !password) {
        return res.status(422).json({ error: "Please add UserID and password" })
    }
    CLERK.findOne({ UserID: UserID }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid UserID" })
        }
        if(password==savedUser.password){
                // return res.status(200).json({ message: "Signed in Successfully" })
                // const token = jwt.sign({ id: savedUser.UserID }, Jwt_secret)
                // const { UserID, password } = savedUser

                return res.json({ UserID, password})

                // console.log({ token, user: {UserID, password } })
            } else {
                return res.status(422).json({ error: "Invalid password" })
            }
        
            
    }).catch(err => console.log(err));
})


module.exports = router;

