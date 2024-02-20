const { createCard, updateCard, getAll, getQuizz } = require('../../src/infrastructure/web/controllers/cardController'); // Assure-toi d'avoir le bon chemin vers ton fichier de route
const Card = require('../../src/domain/entities/Card');
const Category = require('../../src/domain/value-objects/Category');

let cards = [
    new Card('1', 'Question 1', 'Answer 1', Category.FIRST, ['tag1', 'tag2'], '2024-02-19'),
    new Card('2', 'Question 2', 'Answer 2', Category.FIRST, ['tag3', 'tag4'], '2024-02-18')
];

describe('CRUD Operations for Cards', () => {
    describe('createCard', () => {
        it('devrait créer une nouvelle carte avec succès', () => {
            const req = {
                body: {
                    question: 'New Question',
                    answer: 'New Answer',
                    tags: ['newTag'],
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            createCard(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('updateCard', () => {
        it('devrait renvoyer une erreur 400 si isValid n\'est pas un boolean', () => {
            const req = {
                params: { cardId: '1' },
                body: { isValid: 'toto' } // Valeur non booléenne
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            updateCard(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Bad request' });
        });
    
        it('devrait renvoyer une erreur 404 si la carte n\'existe pas', () => {
            const req = {
                params: { cardId: '3' }, // ID inexistant
                body: { isValid: true }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            updateCard(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Card not found.' });
        });
    });

    describe('getQuizz', () => {
        it('devrait renvoyer les cartes pour la date spécifiée', () => {
            const req = {
                body: { date: '2024-02-18' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            getQuizz(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
