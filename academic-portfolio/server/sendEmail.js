const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, html) => {
  console.log('sendEmail EMAIL_USER:', process.env.EMAIL_USER)
  console.log('sendEmail EMAIL_PASS exists?', !!process.env.EMAIL_PASS)

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER or EMAIL_PASS is missing from environment variables')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail