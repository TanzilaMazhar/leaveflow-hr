const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || process.env.port || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,https://leaveflow-hr.vercel.app")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

// middleware
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

//routes
const authRoutes = require("./authApi");
app.use("/api/auth", authRoutes);

const policyRoutes = require("./policyApi");
app.use("/api/policies", policyRoutes);


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});