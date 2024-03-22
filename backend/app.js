const express = require('express');
const cors = require('cors');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");

app.use(cors({
    origin: 'http://localhost:3000'
  }));
require('./models/model');
require('./models/complaint');
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
mongoose.connect(mongoUrl);

mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongo")
})
mongoose.connection.on("error",()=>{
    console.log("not connected to mongo")
})

app.listen(port,() => {
    console.log("server is running on port" + " " + port)
})