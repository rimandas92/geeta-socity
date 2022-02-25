import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'geetasociety.demo@gmail.com',
      pass: 'Geeta@123',
    },
  })
);

export const sendEmail = async (toMail, subject, body) => {
  const mailOptions = {
    from: 'geetasociety.demo@gmail.com',
    to: toMail,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      return info;
    }
  });
};
