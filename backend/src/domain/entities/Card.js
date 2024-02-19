class Card {
    constructor(id, question, answer, category = 'FIRST', tags = []) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.tags = tags;
    }
}

module.exports = Card;
