const User = require("../models/users");
class signup {
    constructor(){}
    async createUser (username, email, password, phoneNumber){
        const user = new User({
            username: username,
            email: email,
            password: password, 
            phone: phoneNumber,
        });
        var isCreated = await user.save();
        var userCreated = {}
        if (isCreated)
        {    userCreated.message = `User created with username ${username}`
            userCreated.status = 200;
        }
        if (!isCreated)
        {    
            userCreated.message = `User could not be created!`
            userCreated.status = 400;
        }
        return userCreated;
    }
}

module.exports = signup;