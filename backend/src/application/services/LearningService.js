const Category = require('../../domain/value-objects/Category');

class LearningService {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }

    reviewCard(cardId, isCorrect) {
        const card = this.cardRepository.findById(cardId);
        if (!card) {
            throw new Error('Card not found');
        }
        if (isCorrect) {
            card.category = this.getNextCategory(card.category);
        } else {
            card.category = Category.FIRST;
        }
        this.cardRepository.update(card);
    }

    getNextCategory(currentCategory) {
        const categories = Object.values(Category);
        const currentIndex = categories.indexOf(currentCategory);
        return categories[currentIndex + 1] || Category.DONE;
    }

    getCardsForToday() {
        return this.cardRepository.findAll().filter(card => this.isDueForReview(card));
    }

    isDueForReview(card) {
        const lastReviewDate = card.lastReviewed || new Date();
        const daysSinceLastReview = (new Date() - lastReviewDate) / (1000 * 3600 * 24);
        const reviewInterval = this.getReviewInterval(card.category);
        return daysSinceLastReview >= reviewInterval;
    }

    getReviewInterval(category) {
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
        return intervals[category];
    }
}

module.exports = LearningService;
