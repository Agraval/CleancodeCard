const Card = require('../../src/domain/entities/Card');

describe('Card Entity', () => {
    it('should create a card with default category', () => {
        const card = new Card(1, 'What is TDD?', 'Test-Driven Development');
        expect(card.category).toEqual('FIRST');
    });

    // More tests...
});
