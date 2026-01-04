const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middlewaree to read JSON 
app.use(express.json());

// User routes
app.use("/api/users", require("./routes/userRoutes"));
app.get("/", (req, res) => {
  res.send("VRMS API is running");
});

const PORT = process.env.PORT || 5000;

app.post("/api/users/register", (req, res) => {
  res.json({ message: "REGISTER ROUTE WORKS" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
