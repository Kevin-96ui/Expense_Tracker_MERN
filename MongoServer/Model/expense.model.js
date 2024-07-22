const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Profit', 'Loss'],
      required: true,
    },
    expenseType: {
      type: String,
      enum: ['Home', 'Car', 'Bike', 'Grocery', 'Electric bill', 'Education', 'Loan', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
