const express=require('express');
const app=express();
const port=5001;
const cors=require('cors')
const mongoose = require('mongoose');

require('./models/Clerks')
const authRotes=require('./routes/auth')

app.use(cors());
app.use(express.json())
app.use(authRotes)

mongoose.connect("mongodb+srv://kondirishithkumar:Krk%232135@cluster0.xqvckcz.mongodb.net/");

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});



app.get('/',(req,res)=>{
    res.json('hello world');
});

app.get('/about',(req,res)=>{
    res.json('hi');
});


app.listen(port,()=>{
    console.log('server started')
})

