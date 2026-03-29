const express = require('express');
const router = express.Router();

// IMPORT shared attemptsData
const { attemptsData } = require('./attemptRoutes');

// concept tracking
const conceptStats = {};

router.get('/:id', (req, res) => {
  const userId = req.query.userId || "1";
  const problemId = req.params.id;
  const step = parseInt(req.query.step) || 1;

  const hints = [
    { text: "Think about using a hashmap", concept: "Hashing" },
    { text: "Check for complement values", concept: "Hashing" },
    { text: "Store visited numbers", concept: "Array Traversal" }
  ];

  // initialize attempts
  if (!attemptsData[userId]) attemptsData[userId] = {};
  if (!attemptsData[userId][problemId]) {
    attemptsData[userId][problemId] = { attempts: 0 };
  }

  // gating logic
  if (step > attemptsData[userId][problemId].attempts + 1) {
    return res.json({
      message: "Attempt required before next hint"
    });
  }

if (step > hints.length) {
  return res.json({
    pseudocode: "Loop through array, store elements in hashmap, check if target - current exists"
  });
} 

  const currentHint = hints[step - 1];

  // track concept usage
  if (!conceptStats[userId]) conceptStats[userId] = {};
  if (!conceptStats[userId][currentHint.concept]) {
    conceptStats[userId][currentHint.concept] = 0;
  }

  conceptStats[userId][currentHint.concept]++;

  res.json({
    hint: currentHint.text,
    concept: currentHint.concept
  });
});

router.get('/weakness/:userId', (req, res) => {
  const userId = req.params.userId;

  const userConcepts = conceptStats[userId] || {};

  let weakConcept = null;
  let max = 0;

  for (let concept in userConcepts) {
    if (userConcepts[concept] > max) {
      max = userConcepts[concept];
      weakConcept = concept;
    }
  }

  res.json({
    weakConcept: weakConcept || "No weakness detected"
  });
});

module.exports = router;