const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose"),

app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())

const signupRoute = require("./Routes/Signup");
const loginRoutes = require("./Routes/Login");

app.use("/api",signupRoute);
app.use("/api",loginRoutes);

mongoose.connect("",{useNewUrlParser: true, useUnifiedTopology: true},function(err,info){
    if(err){
        console.log("cant connect",err)
    } else if(!err) {
        console.log("Connected")
    }
});

app.listen(process.env.PORT || 5000, function(){
	console.log(`App Running on ${process.env.PORT}`)
});