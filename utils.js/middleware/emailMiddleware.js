const sgMail = require("@sendgrid/mail");
const { S_GRID_API_KEY } = require("../config");

sgMail.setApiKey(S_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kandhlovuie@gmail.com",
    subject: "Welcome to Trello clone",
    text: `Welcome to Trello clone ${name}. Hope you enjoy using it.`
  });
};

const sendInvitationEmail = (email, name, sender, redirectLink) => {
  sgMail.send({
    to: email,
    from: "kandhlovuie@gmail.com",
    subject: `${name}, you have been invited by ${sender} to access their board`,
    text: `${name}, click on this link: \n ${redirectLink}\n to accept the invitation or ignore the message if you do not accept the invitation!`
  });
};

module.exports = { sendWelcomeEmail, sendInvitationEmail };
