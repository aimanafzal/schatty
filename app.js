const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose")
const routes = require("./routes/routes");
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
require('dotenv').config()
app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

// const signupRoute = require("./routes/signup");
// const login       = require("./routes/login")
app.use("/api",routes);

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.uyrpl.mongodb.net/test?retryWrites=true&w=majority"
    ,{useNewUrlParser: true, useUnifiedTopology: true},function(err,info){
    if(err){
        console.log("cant connect",err)
    } else if(!err) {
        console.log("Connected")
    }
});

app.listen(process.env.PORT || 5000, function(){
	console.log(`App Running on ${process.env.PORT}`)
});