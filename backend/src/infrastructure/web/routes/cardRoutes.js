const express = require('express');

const router = express.Router();

const cardController = require("../controllers/cardController");

router.post("/", cardController.createCard);
router.get("/", cardController.getAll);
router.get("/quizz", cardController.getQuizz);
router.patch("/:cardId/answer",  cardController.updateCard);

module.exports = router;
