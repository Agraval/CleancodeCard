const request = require('supertest');
const app = require('../../src/infrastructure/web/server');

describe('Server', () => {
    it('should respond to GET /api/cards', async () => {
        const response = await request(app).get('/api/cards');
        expect(response.statusCode).toBe(200);
    });

});
