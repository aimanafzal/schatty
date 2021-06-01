const User = require("../models/users");

const express = require("express"),
router = express.Router();

router.post("/signup", async (req,res) => {
    const {username, email, password, phoneNumber} = req.body
    const user = new User({
        username: username,
        email: email,
        password: password, 
        phone: phoneNumber,
    });
    var isCreated = await user.save();
    if (isCreated)
        res.send(200).send({
            message:`User created with username ${username}`
        })    
    if (!isCreated)
        res.send(400).send({
            message:`User could not be created!`
        })    
    // user.save((err, user) => {
        
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     } else if(user) {
    //         res.status(200).send({message: "User Registered Successfully"})
    //         console.log("User Registered Successfully")
    //     }
    // });
})


module.exports = router;