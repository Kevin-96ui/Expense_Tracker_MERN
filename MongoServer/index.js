const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRouter = require("./Routes/user.routes.js");
const expenseRouter = require("./Routes/expense.routes.js");
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Route handlers
app.use("/user", userRouter);
app.use("/expense", expenseRouter);

// Database connection
mongoose.connect("mongodb://localhost:27017/ExpenseTracker")
  .then(() => {
    console.log("DB connected");
    app.listen(5002, () => {
      console.log('Server started on port 5002');
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Basic endpoint to check if server is running
app.get('/', (req, res) => {
  console.log("Node is running");
  res.send("5002 port");
});
