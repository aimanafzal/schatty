const User = require("../models/users");
class users {
    constructor(){}
    async getUser (username){

        var isAvailable = await User.findOne({username:username});
        var metaData = {}
        if ( isAvailable)
        {
            metaData.data = isAvailable;
            metaData.message = `User available!`;
            metaData.status = 200;
        }
        else if (!isAvailable){
            metaData.data = undefined;
            metaData.message = `Could not find the user`;
            metaData.status = 400;
        }
        return metaData;
    }
}

module.exports = users;