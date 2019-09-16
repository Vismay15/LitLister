//require('dotenv').config();
//const sendGrid = require('sendgrid').mail;
//const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);

const sendVerificationEmail = (to, token) => {
  const msg = {
    to: to,
    from: 'no-reply@litlister.com',
    subject: 'Verify Your Email for Your LitLister Account',
    text: `Click here to verify your email: https://litlister.com/verification?token=${token}&email=${to}`,
    html: `Welcome to LitLister! Click <a href = "https://litlister.com/verification?token=${token}&email=${to}">
        here</a> to verify your email`
  };
  sgMail.send(msg);
};

module.exports = sendVerificationEmail;
