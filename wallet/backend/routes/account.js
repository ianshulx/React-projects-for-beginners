const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  });

  res.json({
    balance: account.balance
  })
});

router.post("/transfer", authMiddleware, async (req, res) => {
 
  const { amount, to} = req.body;
  const session = await mongoose.startSession();

  session.startTransaction();

  const account = await Account.findOne({ userId: req.userId}).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insufficient balance"
    });
  }

  const toAccount = await Account.findOne( {userId: to} ).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "invalid account"
    })
  }

  await Account.updateOne({ userId: req.userId}, { $inc: {balance: -amount} }).session(session);
  await Account.updateOne({ userId: to}, { $inc: {balance: amount } }).session(session);

  await session.commitTransaction();

  res.json({
    message: "transaction successfull"
  });
})

module.exports = router;
