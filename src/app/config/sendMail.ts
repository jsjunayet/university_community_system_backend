import nodemailer from "nodemailer";

export const sendEmail = async (to: string, html: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "junayetshiblu0@gmail.com",
      pass: "noyj xebx ehmu daqz",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"Uni-Nexus-Community" <junayetshiblu0@gmail.com>',
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};
