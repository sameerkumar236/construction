const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/Database/connection.db");
const app = express();




connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./src/routes/auth.route'));
app.use('/api/pricing',require('./src/routes/Pricing.route'))

const PORT = process.env.PORT 
console.log("PORT:", process.env.PORT);
console.log("CLIENT_URL:", process.env.CLIENT_URL);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
