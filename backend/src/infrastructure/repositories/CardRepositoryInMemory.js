class CardRepositoryInMemory {
    constructor() {
        this.cards = [];
    }

    add(card) {
        this.cards.push(card);
    }

}

module.exports = CardRepositoryInMemory;
