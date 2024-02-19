class CardRepositoryInMemory {
    constructor() {
        this.cards = [];
    }

    add(card) {
        this.cards.push(card);
    }

    findById(cardId) {
        return this.cards.find(card => card.id === cardId);
    }

    update(updatedCard) {
        const index = this.cards.findIndex(card => card.id === updatedCard.id);
        if (index === -1) {
            throw new Error('Card not found');
        }
        this.cards[index] = updatedCard;
    }

    findAll() {
        return this.cards;
    }
}

module.exports = CardRepositoryInMemory;
