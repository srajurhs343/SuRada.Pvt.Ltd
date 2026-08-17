import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter to connect to Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address from .env
        pass: process.env.EMAIL_PASS, // App password from .env
      },
    });

    // Compose and send the email
    const mailOptions = {
      from: `"SuRada Fish Store" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};
