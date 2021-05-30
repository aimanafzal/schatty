const User = require("../models/users");

const express = require("express"),
router = express.Router();

router.post("/signUp", (req,res) => {
    console.log(req.body)
    const {username, email, password, phoneNumber} = req.body
    const user = new User({
        username: username,
        email: email,
        password: password, 
        phone: phoneNumber,
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else if(user) {
            res.status(200).send({message: "User Registered Successfully"})
            console.log("User Registered Successfully")
        }
    });
})


module.exports = router;