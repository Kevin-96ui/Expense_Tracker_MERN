const express = require("express");
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpensesByEmail,
} = require("../Controller/expense.controller.js");

router.get("/", getExpenses);
router.get("/:id", getExpense); 
router.post("/", createExpense);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);
router.get("/by-email/:email", getExpensesByEmail);

module.exports = router;
