const User = require("../models/users");
const express = require("express");
var signup = require('../controllers/signup');
var users = require('../controllers/users');
router = express.Router();

router.post('/signup', async (req,res) => {
    const {username, email, password, phoneNumber} = req.body
    let _signup = new signup();
    let userCreated = _signup.createUser(username, email, password, phoneNumber)
    if ( userCreated){
        res.status(userCreated.status).send({
            message: userCreated.message
        }).json();
    }
})


router.get('/getUser/:username', async (req, res)=>{
    const username = req.params.username;
    let _users = new users();
    let isAvailable = await _users.getUser(username);
    if ( isAvailable ){
        res.status(isAvailable.status).send({
            data: isAvailable.data
        });
    }
})
module.exports = router;