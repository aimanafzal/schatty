const User = require("../models/users");
var otpGenerator = require('otp-generator');
var cache = require('node-cache');
class users {
    constructor(){}

    /**
     * Gets the user based on username
     */
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

    /**
     * Updates the password using username and password as Forgot Password module
     * IF the OTP is password, the it will consider updating password
     * using OTP
     */
    async updatePassword ( username, password, otp){
        if (!otp)
        {
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
        }else if (otp){
            var OTPResult = this.generateOTP(username);
            if ( OTPResult){
               let otp = OTPResult.get("OTP");
               if ( otp === otp["OTP"] )
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
            }
        }
        return metaData;
    }

    generateOTP ( username ){
        let otp = otpGenerator.generate(process.env.OTPLENGTH, { upperCase: false, specialChars: false });
        var myCache = new cache();
        if ( otp ){
            myCache.set("OTP", {
                "username": username,
                "OTP":otp
            },process.env.OTP_TIME_OUT);
        }
        return myCache;
    }
}

module.exports = users;