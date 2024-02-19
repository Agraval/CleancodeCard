const { createCard, updateCard, getAll, getQuizz } = require('../../src/infrastructure/web/controllers/cardController'); // Assure-toi d'avoir le bon chemin vers ton fichier de route
const Card = require('../../src/domain/entities/Card');
const Category = require('../../src/domain/value-objects/Category');

let cards = [
    new Card('1', 'Question 1', 'Answer 1', Category.FIRST, ['tag1', 'tag2'], '2024-02-19'),
    new Card('2', 'Question 2', 'Answer 2', Category.FIRST, ['tag3', 'tag4'], '2024-02-18')
];

describe('CRUD Operations for Cards', () => {
    // describe('createCard', () => {
    //     it('devrait créer une nouvelle carte avec succès', () => {
    //         const req = {
    //             body: {
    //                 question: 'New Question',
    //                 answer: 'New Answer',
    //                 tags: ['newTag'],
    //                 date: '2024-02-19'
    //             }
    //         };
    //         const res = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn()
    //         };
    //         createCard(req, res);
    //         expect(res.status).toHaveBeenCalledWith(201);
    //         expect(res.json).toHaveBeenCalled();
    //         // Ajoute ici des assertions pour vérifier que la carte créée est correcte
    //     });
    // });

    // describe('updateCard', () => {
    //     it('devrait mettre à jour l\'état de validation de la carte avec succès', () => {
    //         const req = {
    //             params: { cardId: '1' },
    //             body: { isValid: true }
    //         };
    //         const res = {
    //             status: jest.fn().mockReturnThis(),
    //             end: jest.fn()
    //         };
    //         updateCard(req, res);
    //         expect(res.status).toHaveBeenCalledWith(204);
    //         // Vérifie ici que la carte a bien été mise à jour avec le nouvel état de validation
    //     });
    // });

    // describe('getAll', () => {
    //     it('devrait renvoyer toutes les cartes', () => {
    //         const req = {};
    //         const res = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn()
    //         };
    //         getAll(req, res);
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(cards);
    //         // Vérifie ici que toutes les cartes sont renvoyées
    //     });
    // });

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
            // Vérifie ici que seules les cartes pour la date spécifiée sont renvoyées
        });
    });
});
