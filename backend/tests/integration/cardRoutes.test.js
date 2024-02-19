const request = require('supertest');
const app = require('../../src/infrastructure/web/server');

describe('API routes for cards', () => {
    it('GET /cards should return all cards', async () => {
        const res = await request(app).get('/cards');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

});
