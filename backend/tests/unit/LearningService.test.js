const LearningService = require('../../src/application/services/LearningService');
const CardRepositoryInMemory = require('../../src/infrastructure/repositories/CardRepositoryInMemory');
const Card = require('../../src/domain/entities/Card');
const Category = require('../../src/domain/value-objects/Category');

describe('LearningService', () => {
    let learningService, cardRepository, card;

    beforeEach(() => {
        cardRepository = new CardRepositoryInMemory();
        learningService = new LearningService(cardRepository);
        card = new Card('1', 'What is TDD?', 'Test-Driven Development');
        cardRepository.add(card);
    });

    it('should advance card to next category if answered correctly', () => {
        learningService.reviewCard(card.id, true);
        const updatedCard = cardRepository.findById(card.id);
        expect(updatedCard.category).toBe(Category.SECOND);
    });

    it('should reset card to FIRST category if answered incorrectly', () => {
        card.category = Category.SECOND;
        learningService.reviewCard(card.id, false);
        const updatedCard = cardRepository.findById(card.id);
        expect(updatedCard.category).toBe(Category.FIRST);
    });

    it('should set card to DONE when it passes the last category', () => {
        card.category = Category.SEVENTH;
        learningService.reviewCard(card.id, true);
        const updatedCard = cardRepository.findById(card.id);
        expect(updatedCard.category).toBe(Category.DONE);
    });

    it('should identify cards due for review', () => {
        const pastDate = new Date(new Date() - (2 * 24 * 60 * 60 * 1000)); // 2 days ago
        card.lastReviewed = pastDate;
        card.category = Category.SECOND;
        const dueCards = learningService.getCardsForToday();
        expect(dueCards).toContain(card);
    });

    it('should not return cards not due for review', () => {
        card.lastReviewed = new Date();
        card.category = Category.SECOND;
        const dueCards = learningService.getCardsForToday();
        expect(dueCards).not.toContain(card);
    });
});
