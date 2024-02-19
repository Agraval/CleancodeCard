class Card {
    constructor(id, question, answer, category = 'FIRST', tags = [], date) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.tags = tags;
        this.date = date;
    }
}

module.exports = Card;
