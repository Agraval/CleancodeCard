const { v4: uuidv4 } = require('uuid');
const Card = require('../../../domain/entities/Card');
const Category = require('../../../domain/value-objects/Category');
let cards = [];

const getAll = (req, res) => {

    let result = cards;

    if (req.body.tags) {
        let tagsArray = req.body.tags
        result = cards.filter(card => tagsArray.includes(card.tags));
    }

    return res.status(200).json(result);
}

const getQuizz = (req, res) => {
    let date
    if (req.body.date){
        date = req.body.date
    }
    else{
        date = new Date()
        year = date.getFullYear()
        month = date.getMonth()+1 > 9 ? date.getMonth()+1 :`0${date.getMonth()+1}`
        day = date.getDate() > 9 ? date.getDate() :`0${date.getDate()}`
        date = `${year}-${month}-${day}`
    }
    console.log(date)
    let result = cards;

    result = cards.filter(card => card.date == date);

    return res.json(result);
}

const createCard = (req, res) => {
    const { question, answer, tags, date } = req.body;
    if (!question || !answer) {
        return res.status(400).json({ message: 'Question and answer are required.' });
    }

    const newCard = new Card(uuidv4(), question, answer, Category.FIRST, tags, date || []);
    cards.push(newCard);

    return res.status(201).json(newCard);
}

const updateCard =(req,res) => {
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
}

module.exports = {
    createCard,
    updateCard,
    getAll,
    getQuizz,
};