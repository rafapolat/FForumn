const express = require('express');
const PlayerEvaluation = require('../models/PlayerEvaluation');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Create a new player evaluation
router.post('/', verifyToken, async (req, res) => {
  const {
    playerName,
    teamName,
    nationality,
    recoveryAfterMistakes,
    consistency,
    physicalStrength,
    stamina,
    riskTaking,
    socialLife,
    criteria1Desc,
    criteria2Desc,
    criteria3Desc,
    criteria4Desc,
    criteria5Desc,
    criteria6Desc,
    criteria7,
    criteria7Desc,
    criteria8,
    criteria8Desc,
    criteria9,
    criteria9Desc,
    criteria10,
    criteria10Desc,
    criteria11,
    criteria11Desc,
    criteria12,
    criteria12Desc,
    criteria13,
    criteria13Desc,
    criteria14,
    criteria14Desc,
    criteria15,
    criteria15Desc,
    criteria16,
    criteria16Desc,
    criteria17,
    criteria17Desc,
    generalComment
  } = req.body;

  const newEvaluation = new PlayerEvaluation({
    username: req.user.username,
    playerName,
    teamName,
    nationality,
    recoveryAfterMistakes,
    consistency,
    physicalStrength,
    stamina,
    riskTaking,
    socialLife,
    criteria1Desc,
    criteria2Desc,
    criteria3Desc,
    criteria4Desc,
    criteria5Desc,
    criteria6Desc,
    criteria7,
    criteria7Desc,
    criteria8,
    criteria8Desc,
    criteria9,
    criteria9Desc,
    criteria10,
    criteria10Desc,
    criteria11,
    criteria11Desc,
    criteria12,
    criteria12Desc,
    criteria13,
    criteria13Desc,
    criteria14,
    criteria14Desc,
    criteria15,
    criteria15Desc,
    criteria16,
    criteria16Desc,
    criteria17,
    criteria17Desc,
    generalComment,
    author: req.user._id
  });

  try {
    const savedEvaluation = await newEvaluation.save();
    res.json(savedEvaluation);
  } catch (error) {
    console.error('Error saving evaluation:', error);
    res.status(500).json({ message: 'Error saving evaluation' });
  }
});


router.get('/top', async (req, res) => {
  try {
    const evaluations = await PlayerEvaluation.find().sort({ interactions: -1 }).limit(10);
    res.json(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    res.status(500).json({ message: 'Error fetching evaluations' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const evaluation = await PlayerEvaluation.findById(req.params.id);
    res.json(evaluation);
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    res.status(500).json({ message: 'Error fetching evaluation' });
  }
});


router.put('/:id', verifyToken, async (req, res) => {
  const {
    playerName,
    teamName,
    nationality,
    recoveryAfterMistakes,
    consistency,
    physicalStrength,
    stamina,
    riskTaking,
    socialLife,
    criteria1Desc,
    criteria2Desc,
    criteria3Desc,
    criteria4Desc,
    criteria5Desc,
    criteria6Desc,
    criteria7,
    criteria7Desc,
    criteria8,
    criteria8Desc,
    criteria9,
    criteria9Desc,
    criteria10,
    criteria10Desc,
    criteria11,
    criteria11Desc,
    criteria12,
    criteria12Desc,
    criteria13,
    criteria13Desc,
    criteria14,
    criteria14Desc,
    criteria15,
    criteria15Desc,
    criteria16,
    criteria16Desc,
    criteria17,
    criteria17Desc,
    generalComment
  } = req.body;

  try {
    const evaluation = await PlayerEvaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    evaluation.playerName = playerName;
    evaluation.teamName = teamName;
    evaluation.nationality = nationality;
    evaluation.recoveryAfterMistakes = recoveryAfterMistakes;
    evaluation.consistency = consistency;
    evaluation.physicalStrength = physicalStrength;
    evaluation.stamina = stamina;
    evaluation.riskTaking = riskTaking;
    evaluation.socialLife = socialLife;
    evaluation.criteria1Desc = criteria1Desc;
    evaluation.criteria2Desc = criteria2Desc;
    evaluation.criteria3Desc = criteria3Desc;
    evaluation.criteria4Desc = criteria4Desc;
    evaluation.criteria5Desc = criteria5Desc;
    evaluation.criteria6Desc = criteria6Desc;
    evaluation.criteria7 = criteria7;
    evaluation.criteria7Desc = criteria7Desc;
    evaluation.criteria8 = criteria8;
    evaluation.criteria8Desc = criteria8Desc;
    evaluation.criteria9 = criteria9;
    evaluation.criteria9Desc = criteria9Desc;
    evaluation.criteria10 = criteria10;
    evaluation.criteria10Desc = criteria10Desc;
    evaluation.criteria11 = criteria11;
    evaluation.criteria11Desc = criteria11Desc;
    evaluation.criteria12 = criteria12;
    evaluation.criteria12Desc = criteria12Desc;
    evaluation.criteria13 = criteria13;
    evaluation.criteria13Desc = criteria13Desc;
    evaluation.criteria14 = criteria14;
    evaluation.criteria14Desc = criteria14Desc;
    evaluation.criteria15 = criteria15;
    evaluation.criteria15Desc = criteria15Desc;
    evaluation.criteria16 = criteria16;
    evaluation.criteria16Desc = criteria16Desc;
    evaluation.criteria17 = criteria17;
    evaluation.criteria17Desc = criteria17Desc;
    evaluation.generalComment = generalComment;
    evaluation.updatedAt = Date.now();

    const savedEvaluation = await evaluation.save();
    res.json(savedEvaluation);
  } catch (error) {
    console.error('Error updating evaluation:', error);
    res.status(500).json({ message: 'Error updating evaluation' });
  }
});


router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const evaluation = await PlayerEvaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    await evaluation.remove();
    res.json({ message: 'Evaluation deleted' });
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    res.status(500).json({ message: 'Error deleting evaluation' });
  }
});

module.exports = router;
