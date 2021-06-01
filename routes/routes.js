const User = require("../models/users");

const express = require("express");
var signup = require('../controllers/signup');
router = express.Router();

router.post("/signup", async (req,res) => {
    const {username, email, password, phoneNumber} = req.body
    let _signup = new signup();
    let userCreated = _signup.createUser(username, email, password, phoneNumber)
    if ( userCreated){
        res.send(userCreated.status).send({
            message: userCreated.message
        }).json();
    }
})


module.exports = router;