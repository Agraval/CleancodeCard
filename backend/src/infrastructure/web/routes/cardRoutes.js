const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Card = require('../../../domain/entities/Card');
const Category = require('../../../domain/value-objects/Category');

const router = express.Router();

let cards = [];

router.get('/', (req, res) => {
    const { tags } = req.query;
    let result = cards;

    if (tags) {
        const tagsArray = tags.split(',');
        result = cards.filter(card => card.tags.some(tag => tagsArray.includes(tag)));
    }

    return res.json(result);
});

router.post('/', (req, res) => {
    const { question, answer, tags } = req.body;
    if (!question || !answer) {
        return res.status(400).json({ message: 'Question and answer are required.' });
    }

    const newCard = new Card(uuidv4(), question, answer, Category.FIRST, tags || []);
    cards.push(newCard);

    return res.status(201).json(newCard);
});

router.patch('/:cardId/answer', (req, res) => {
    const { cardId } = req.params;
    const { isValid } = req.body;

    if (typeof isValid !== 'boolean') {
        return res.status(400).json({ message: 'isValid must be a boolean.' });
    }

    const card = cards.find(card => card.id === cardId);

    if (!card) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    if (isValid) {
        const categories = Object.keys(Category);
        const currentCategoryIndex = categories.indexOf(card.category);
        const newCategory = categories[currentCategoryIndex + 1] || Category.DONE;
        card.category = newCategory;
    } else {
        card.category = Category.FIRST;
    }

    return res.status(204).end();
});

module.exports = router;
