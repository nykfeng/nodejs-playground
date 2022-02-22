const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail.send({
  to: "nykfengcode@gmail.com",
  from: "nykfengcode@gmail.com",
  subject: "This is first message",
  text: "Testing with this text message",
});
