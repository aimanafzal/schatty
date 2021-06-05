const User = require("../models/users");
const express = require("express");
var signup = require('../controllers/signup');
var users = require('../controllers/users');
var mail = require('../controllers/mail');
router = express.Router();

/**
 * Create a single user by passing the params in body using a POST call
 */
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

/**
 * Get user by username 
 */
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

/**
 * Logs in the User
 */
router.get('/user/login', async (req, res)=>{
    const {username, password} = req.body.username;
    let _users = new users();
    let isAvailable = await _users.getUser(username);
    let metaData = {}
    if ( isAvailable && isAvailable.data.username === username ){
        metaData.data = true;
        metaData.status = 200;
    }
    else {
        metaData.data = false;
        metaData.status = 404;
    }     
    res.status(isAvailable.status).send({
        data: isAvailable.data
    });
})




/**
 * Updates the password for the user using
 * the username sent in body 
 */
router.post('/updatePassword', async(req,res)=>{
    const {username, password} = req.body;
    let _users = new users();
    let isAvailable = await _users.updatePassword(username, password);
    if ( isAvailable ){
        res.status(isAvailable.status).send({
            data: isAvailable.data
        });
    }
})

router.post('/forgotPassword', async(req,res)=>{
    const {username, password, otp} = req.body;
    let _users = new users();
    let isAvailable = await _users.updatePassword(username, password, otp);
    if ( isAvailable ){
        res.status(isAvailable.status).send({
            data: isAvailable.data
        });
    }
})


module.exports = router;
router.post('/sendmail', async(req,res)=>{
    const {to} = req.body;
    console.log(to)
    mail(to);
})