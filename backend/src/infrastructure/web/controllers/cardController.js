const { v4: uuidv4 } = require('uuid');
const Card = require('../../../domain/entities/Card');
const Category = require('../../../domain/value-objects/Category');
let cards = [];

const intervals = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 4,
    FOURTH: 8,
    FIFTH: 16,
    SIXTH: 32,
    SEVENTH: 64,
    DONE: Infinity
};

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
        let year = date.getFullYear()
        let month = date.getMonth()+1 > 9 ? date.getMonth()+1 :`0${date.getMonth()+1}`
        let day = date.getDate() > 9 ? date.getDate() :`0${date.getDate()}`
        date = `${year}-${month}-${day}`
    }
    console.log(date)
    let result = cards;

    result = cards.filter(card => card.date == date);

    return res.status(200).json(result);
}

const createCard = (req, res) => {
    const { question, answer, tags} = req.body;
    
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1 > 9 ? date.getMonth()+1 :`0${date.getMonth()+1}`
    let day = date.getDate() > 9 ? date.getDate() :`0${date.getDate()}`

    date = `${year}-${month}-${day}`
    if (!question || !answer) {
        return res.status(400).json({ message: 'Bad request' });
    }

    try {
        const newCard = new Card(uuidv4(), question, answer, Category.FIRST, tags, date || []);
        cards.push(newCard);
        return res.status(201).json(newCard);
    } catch (error) {
        return res.status(400).json({ message: 'Bad request' });
    }
}

const updateCard =(req,res) => {
    const { cardId } = req.params;
    const { isValid } = req.body;

    if (typeof isValid !== 'boolean') {
        return res.status(400).json({ message: 'Bad request' });
    }

    const card = cards.find(card => card.id === cardId);

    if (!card) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    if (isValid) {
        const categories = Object.keys(Category);
        const currentCategoryIndex = categories.indexOf(card.category);
        const newCategory = categories[currentCategoryIndex + 1] || Category.DONE;
        const newDate = newCategory != "DONE" ? addDaysToDate(card.date, intervals[newCategory]) : card.date
        card.date = newDate
        card.category = newCategory;


    } else {
        card.category = Category.FIRST;
        card.date = addDaysToDate(card.date, intervals["FIRST"])

    }

    return res.status(204).json({ message: 'Answer has been taken into account' });
}

module.exports = {
    createCard,
    updateCard,
    getAll,
    getQuizz,
};

function addDaysToDate(dateBefore, daysToAdd) {

    const date = new Date(dateBefore);

    date.setDate(date.getDate() + daysToAdd);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}