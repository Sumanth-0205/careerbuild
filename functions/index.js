require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const { GMAIL_USER, GMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// 🔥 POST route to trigger welcome email
app.post("/sendWelcomeEmail", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).send("Missing email or name");
  }

  const mailOptions = {
    from: `"JobNotify" <${GMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to JobNotify!",
    html: `
      <h2>Hi ${name} 👋</h2>
      <p>We’re glad to have you at <strong>JobNotify</strong>. Explore job alerts and stay notified!</p>
      <hr/>
      <p style="font-size:12px;color:gray;">If this wasn't you, feel free to ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.status(200).send("Email sent!");
  } catch (error) {
    console.error("❌ Email failed:", error);
    res.status(500).send("Failed to send email");
  }
});

// 🛠️ Test route
app.get("/hello", (req, res) => {
  res.send("👋 Hello from Render!");
});

module.exports = app;
