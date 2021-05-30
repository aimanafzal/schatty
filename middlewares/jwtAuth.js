const jwt = require("jsonwebtoken");
const {messages} = require('../utilities/constants')
// const config = require("../Config/auth.config");
// const User = require("../Models/User");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.status(messages.unauthorized.status)
        .send({ message: messages.unauthorized.description});
      }
      req.userId = decoded.id;
      next();
    });
  };

  const authJwt = {
    verifyToken
  };
  module.exports = authJwt; 
  