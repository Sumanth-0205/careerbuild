require("dotenv").config();

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const { GMAIL_USER, GMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  console.log("📥 New user:", JSON.stringify(user, null, 2));

  const recipient = user?.email;
  const displayName = user?.displayName || "there";

  if (!recipient) {
    console.warn("⚠️ Missing email on user:", user.uid);
    return null;
  }

  const mailOptions = {
    from: `"JobNotify" <${GMAIL_USER}>`,
    to: recipient,
    subject: "🎉 Welcome to JobNotify!",
    html: `
      <h2>Hi ${displayName} 👋</h2>
      <p>We’re glad to have you at <strong>JobNotify</strong>. Explore job alerts and stay notified!</p>
      <hr/>
      <p style="font-size:12px;color:gray;">If this wasn't you, feel free to ignore this email.</p>
    `,
  };

  return transporter.sendMail(mailOptions)
    .then(info => console.log("✅ Email sent:", info.response))
    .catch(error => console.error("❌ Email failed:", error));
});

exports.helloTest = functions.https.onRequest((req, res) => {
  res.send("👋 Hello from Firebase Emulator!");
});
