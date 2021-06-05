var nodemailer = require('nodemailer');


module.exports = (to) => {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  
  var mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: process.env.SUBJECT,
    text:process.env.TEXT
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
