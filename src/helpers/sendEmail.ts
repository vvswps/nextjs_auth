import nodemailer from "nodemailer";

export default async function sendEmail(
  to: string,
  key: string,
  subject: string
) {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME!,
        pass: process.env.MAILTRAP_PASSWORD!,
      },
    });

    const info = await transport.sendMail({
      from: '"Next-auth Team 👻"',
      to: to,
      subject: subject,
      html: `<a href="${process.env.DOMAIN}/verify?key=${key}">${subject}</a>
      <br> In case you are not able to click on the link, copy and paste the following link in your browser: ${process.env.DOMAIN}/verify?key=${key}
      If you did not request this, please ignore this email.`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    console.log(error);
  }
}
