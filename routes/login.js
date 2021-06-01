const User = require("../models/users");

const express = require("express"),
router = express.Router();

router.post("/login", async (req,res) => {
    const {username, password} = req.body
    const user = new User({
        username: username,
        password: password
    });
    var isAvailable = await User.findOne({ username: username}).exec();
    var userAvailable = {}
    if (isAvailable)
    {    
        userAvailable.data = isAvailable;
        userAvailable.status = 200;
    }
    if (!isAvailable)
    {    
        userAvailable.data = undefined;
        userAvailable.message = `User not available`;
        userAvailable.status = 400;
    }
    if (userAvailable.data !== undefined)
    {
        res.status(userAvailable.status).send({
            isAvailable
        }).json();
    }else {
        res.status(userAvailable.status).send({message: userAvailable.message})
    }
})


module.exports = router;