const express = require('express');
const router = express.Router();

// shared storage
let attemptsData = {};

// POST attempt
router.post('/', (req, res) => {
  const { userId, problemId, isCorrect } = req.body;

  if (!attemptsData[userId]) {
    attemptsData[userId] = {};
  }

  if (!attemptsData[userId][problemId]) {
    attemptsData[userId][problemId] = {
      attempts: 0,
      hintsUsed: 0
    };
  }

  attemptsData[userId][problemId].attempts++;

  res.json({
    message: "Attempt recorded",
    data: attemptsData[userId][problemId]
  });
});

// 👇 EXPORT BOTH
module.exports = { router, attemptsData };