const express = require("express");
const router = express.Router();
const pool = require('./db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET || process.env.jwt_secret || "default_secret";

//Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    // Insert user with auto join_date = today
    const result = await pool.query(
      `INSERT INTO users (name, email, password, join_date) 
       VALUES ($1, $2, $3, CURRENT_DATE)
       RETURNING id, name, email, join_date`,
      [name, email, hashed]
    );

    // Response with created user info
    return res.status(201).json({
      message: "User created successfully",
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );
    const decoded = jwt.decode(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });
    return res.json({
      message: "Login Successfully",
      user: { id: user.id, name: user.name, email: user.email },
      token,
      exp: decoded.exp * 1000
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});
module.exports = router;

//check user SignIn
// app.get("/api/auth/me", async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ error: "Not authenticated" });
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const result = await pool.query("SELECT id, email FROM users WHERE id=$1", [
//       decoded.id,
//     ]);
//     if (!result.rows[0])
//       return res.status(404).json({ error: "User not found" });
//     res.json({
//       user: {
//         ...result.rows[0],
//         token,
//         exp: decoded.exp * 1000,
//       }
//     });
//   } catch (err) {
//     console.error("Auth check error:", err);
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

//Forgot password
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// app.post("/api/auth/forgot", async (req, res) => {
//   const { email } = req.body;
//   if (!email || email.trim() === "") {
//     return res.status(400).json({ error: "Email is required" });
//   }
//   try {
//     //check user exists in db
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (user.rows.length === 0) {
//       return res.status(400).json({ error: "No account found with this email" });
//     }

//     //here token generated and will match the token in link we send
//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

//     // Reset link
//     const resetLink = `http://localhost:5173/resetpassword/?token=${token}`;

//     // Email options
//     const mailOptions = {
//       from: '"Your App" <${process.env.EMAIL_USER}>',
//       to: email,
//       subject: "Password Reset Link",
//       html: `<p>Click this link to reset your password:</p>
//              <a href="${resetLink}">${resetLink}</a>`,
//     };
//     //Send email
//     await transporter.sendMail(mailOptions);
//     res.json({ message: "Reset link send Successfully" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ error: "Failed to send reset email." });
//   }
// });

//Reset Password
// app.post("/api/auth/reset", async (req, res) => {
//   const { token, password } = req.body;
//   if (!token) {
//     return res.status(400).json({ error: "Token is required" });
//   }
//   if (!password || password.length < 6) {
//     return res.status(400).json({ error: "Password must be at least 6 characters" });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const email = decoded.email;

//     // Check if user exists
//     const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     // Hash new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update password in DB
//     await pool.query("UPDATE users SET password=$1 WHERE email=$2", [hashedPassword, email]);
//     res.json({ message: "Password reset successfully!" });
//   } catch (err) {
//     console.error("Error resetting password:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// Verify Reset Token
// app.post("/api/auth/verify-reset-token", async (req, res) => {
//   const { token } = req.body;
//   if (!token) {
//     return res.status(400).json({ error: "Token is required" });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ valid: true, email: decoded.email });
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// });




