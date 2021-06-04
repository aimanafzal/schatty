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
    async updatePassword ( username, password){
        var isAvailable = await User.findOne({username: username});
        var metaData = {}
        if ( isAvailable)
        {
            let updated = await isAvailable.updateOne({username: username, password: password});
            if ( updated){
                metaData.data = await User.findOne({username: username});
                metaData.message = `Password updated for the user ${username}`;
                metaData.status = 200;
            }
            else {
                metaData.data = undefined;
                metaData.message = `Password could not be updated!`;
                metaData.status = 400;
            }
        }
        return metaData;
    }
}

module.exports = users;