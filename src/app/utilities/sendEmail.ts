import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'alimsujon12@gmail.com',
      pass: 'qpwc slgl opno ldls',
    },
  });

  await transporter.sendMail({
    from: 'alimsujon12@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password withthin 10mins ', // Subject line
    text: 'reset your password within 10minutes', // plain text body
    html, // html body
  });
};
