const express=require('express');
const router= express.Router();
const mongoose=require('mongoose')
const Clerk=mongoose.model("Clerk")

router.get('/',(req,res)=>{
    res.send('hello');
})

router.post('/addClerk',(req,res)=>{
    const {username,password}=req.body;
    const user=new Clerk ({
        username,
        password
    })
    
    user.save()
    .then(user=>{res.json({message:"saved successfully"})})
    .catch(err=> console.log(err))
})

module.exports=router;