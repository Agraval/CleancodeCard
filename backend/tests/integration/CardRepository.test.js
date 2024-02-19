const CardRepositoryInMemory = require('../../src/infrastructure/repositories/CardRepositoryInMemory');
const Card = require('../../src/domain/entities/Card');

describe('CardRepository InMemory', () => {
    it('should store a card', () => {
        const cardRepository = new CardRepositoryInMemory();
        const card = new Card(1, 'What is DDD?', 'Domain-Driven Design');
        cardRepository.add(card);
        expect(cardRepository.cards).toContain(card);
    });

});
