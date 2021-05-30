const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: {type: String, default:""},
    email:{type: String, default:""}, 
    password:{type: String, default:""},
    phoneNumber:{type: String, default:""},
    verified:{type: Boolean, default:false},
    address:{type: String, default:""},
    signedupDate:{type: Date, default:Date.now()},
    lastLogin:{type: Date, default:Date.now()},
    active:{type: Boolean, default:false},
    transactionAmount:{type: Number, default:0},
    packageType:{type:Number, default:0},
    lastTransaction:{type: String, default:""}
});

module.exports = mongoose.model("User",userSchema);